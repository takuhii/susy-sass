'use strict';

const path = require('path');
const sass = require('sass');
const { runSass } = require('sass-true');

// Verify the Susy Sass output-comparison suite using sass-true's Mocha
// integration. sass-true compiles the entry stylesheet and compares each
// output() block against its paired expect() block.
//
// Note: runSass defaults to node-sass; we pass the Dart Sass implementation
// explicitly via trueOptions.sass.
const sassFile = path.join(__dirname, 'scss', 'test-output.scss');

runSass(
  {
    file: sassFile,
    includePaths: [
      path.join(__dirname, '..', 'sass'),
      path.join(__dirname, '..', 'node_modules'),
    ],
  },
  {
    sass,
    describe,
    it,
  }
);
