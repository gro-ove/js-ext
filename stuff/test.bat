@echo off
cmd /C js-ext.cmd src\js-ext.jsx -e -o build\js-ext.temp.js
node build\js-ext.temp.js stuff\test-native.jsx -l 4059767
node build\js-ext.temp.js stuff\test-lambda.jsx -l 17404
node build\js-ext.temp.js stuff\test-strings.jsx -l 576
node build\js-ext.temp.js stuff\test-arguments.jsx -l 4517
node build\js-ext.temp.js stuff\current.jsx