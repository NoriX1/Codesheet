# Codesheet
### Run this app using command:  `npx codesheet serve`

This is an interactive coding environment. You can write Javascript, see it executed, and write comprehensive documentation using [Markdown language](https://www.markdownguide.org/basic-syntax/).


- You can open and edit different files instead of default `codesheet.js`:  
`npx codesheet serve yourFileName.js` 
- You can define the port where app will be launched using --port or -p flags:  
`npx codesheet serve -p 8000`
  
  
- Click any text cell to edit it; (You can write any notes or docs using text cells.)
- Import any libraries in code cells using usual syntax. e.g. `import React from 'react';` (React included into editor out of box);
- The code in each code editor is all joined together into one file. If you define a variable in the upper cell, you can refer to it in any following cell!
- You can show any React component, string, number, or anything else by calling a built-in `show()` function;
- Format code via prettier using the "Format" button in the top right corner of editor;
- Add new cells by hovering on the divider between each cell;
- Re-order or delete cells using the buttons on the top right;


All of your changes get automatically saved to the file you opened Codesheet with. So if you ran `npx codesheet serve filename.js`, all of the text and code you write will be saved to the `filename.js` file.


