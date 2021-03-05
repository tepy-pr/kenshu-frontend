const sass = require('node-sass');
const path = require('path');
const fs = require('fs');
const globImporter = require('node-sass-glob-importer');

const outFilePath = path.join(__dirname, '../dist/css/main.css');
const isDev = process.env.NODE_ENV === 'development';

// TODO: use PostCSS in Production
const isProd = process.env.NODE_ENV === 'production';

sass.render(
  {
    file: 'src/scss/main.scss',
    includePaths: ['src/scss'],
    outFile: outFilePath,
    importer: globImporter(),
  },
  function (error, result) {
    if (error && isDev) {
      console.error(error.status);
      console.error(error.column);
      console.error(error.message);
      console.error(error.line);
    } else {
      if (isDev) console.log(result);

      fs.writeFile(outFilePath, result.css, function (err) {
        if (err && isDev) {
          console.error(err);
        }
      });
    }
  }
);
