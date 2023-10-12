const fs = require('fs');
const path = require('path');

function traverseDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      // Read file contents
      let contents = fs.readFileSync(filePath, 'utf8');
      if (contents.indexOf('createDomain') !== -1) {

      contents = contents.split('\n').filter(line => !line.includes('domain = createDomain')).join('\n');

      contents = contents.replace(/domain\./g, '').replace(/createDomain\s*,?/g, '').replace(/import { createDomain } from 'effector';/g, '');
       
      contents = "import { createEffect, createEvent, createStore } from 'effector';\n" + contents;

      }
      fs.writeFileSync(filePath, contents);
    } else if (stats.isDirectory()) {
      traverseDirectory(filePath);
    }
  }
}

traverseDirectory('src');
