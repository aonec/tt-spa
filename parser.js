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
      // Remove "domain.", "createDomain," and "import { createDomain } from 'effector';" from contents
      contents = contents.replace(/domain\./g, '').replace(/createDomain/g, '').replace(/import { createDomain } from 'effector';/g, '');
      // Check if "createDomain" was removed
      if (contents.indexOf('createDomain') === -1) {
        // Add "import { createEffect, createEvent, createStore } from 'effector';" to contents
        contents = "import { createEffect, createEvent, createStore } from 'effector';\n" + contents;
        console.log(`Added import statement to file: ${filePath}`);
      }
      // Write updated contents back to file
      fs.writeFileSync(filePath, contents);
      console.log(`Removed "domain.", "createDomain," and "import { createDomain } from 'effector';" from file: ${filePath}`);
    } else if (stats.isDirectory()) {
      // Recursively call function on directory
      traverseDirectory(filePath);
    }
  }
}

// Call the function with the path to your project directory
traverseDirectory('src');
