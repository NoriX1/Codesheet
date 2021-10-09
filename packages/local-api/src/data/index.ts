import { Cell } from '@codesheet/client/src/state';

export const startupContent: Cell[] = [
  {
    content:
      '# Codesheet\n\nThis is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using [Markdown language](https://www.markdownguide.org/basic-syntax/).\n\n- Click any text cell (**including this one**) to edit it; (You can write any notes or docs using text cells.)\n- Import any libraries in code cells using usual syntax. e.g. `import React from \'react\';` (React included into editor out of box);\n- The code in each code editor is all joined together into one file. If you define a variable in the upper cell, you can refer to it in any following cell!\n- You can show any React component, string, number, or anything else by calling a built-in `show()` function;\n- Format code via prettier using the "Format" button in the top right corner of editor;\n- Add new cells by hovering on the divider between each cell;\n- Re-order or delete cells using the buttons on the top right;\n\n \nAll of your changes get automatically saved to the file you opened Codesheet with. So if you ran `npx codesheet serve filename.js`, all of the text and code you write will be saved to the `filename.js` file.\n\n\nAlso you can change port where app will be run, using --port or -p syntax. e.g. `npx codesheet serve -p 8000 filename.js `',
    type: 'text',
    id: 'meu1u',
  },
  {
    content:
      "import { useState } from 'react';\r\n\r\nconst Counter = () => {\r\n  const [count, setCount] = useState(0);\r\n  return (\r\n    <div>\r\n      <button onClick={() => setCount(count + 1)}>Click</button>\r\n      <h3>Count: {count}</h3>\r\n    </div>\r\n  );\r\n};\r\n\r\n// Display any variable or React Component by calling 'show()'\r\nshow(<Counter />);",
    type: 'code',
    id: '1ktka',
  },
  {
    content:
      'const App = () => {\r\n  return (\r\n    <div>\r\n      <h3>App Says Hi!</h3>\r\n      <i>Counter component will be rendered below...</i>\r\n      <hr />\r\n      {/* \r\n        Counter was declared in an earlier cell - \r\n        we can reference it here! \r\n      */}\r\n      <Counter />\r\n    </div>\r\n  );\r\n};\r\n\r\nshow(<App/>);',
    type: 'code',
    id: '93iwh',
  },
];
