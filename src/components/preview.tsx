import './preview.css';
import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  errorMessage: string;
}

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
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML =
              '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          };
          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });
        
          window.addEventListener(
            'message',
            (event) => {
              try {
                eval(event.data);
              } catch (err) {
                handleError(err);
              }
            },
            false
          );
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, errorMessage }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcdoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 0);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        className="preview-iframe"
        ref={iframeRef}
        srcDoc={html}
        title="preview"
        sandbox="allow-scripts"
      />
      {errorMessage && <div className="preview-error">{errorMessage}</div>}
    </div>
  );
};

export default Preview;
