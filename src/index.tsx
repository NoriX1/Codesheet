import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  const [input, setInput] = useState('');
  const ref = useRef<any>();
  const iframeRef = useRef<any>();

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    iframeRef.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    iframeRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      '*'
    );
  };

  const html = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            }catch(err){
              const root = document.querySelector('#root');
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false)
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <CodeEditor initialValue="" onChange={(value) => setInput(value)} />
      <textarea value={input} onChange={(e) => setInput(e.target.value)} />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        ref={iframeRef}
        srcDoc={html}
        title="frame"
        sandbox="allow-scripts"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
