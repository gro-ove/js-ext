@echo off
cmd /C js-ext.cmd src\js-ext.jsx -e -o build\js-ext.temp.js
::node build\js-ext.temp.js stuff\test.jsx -l 4059767
node build\js-ext.temp.js stuff\current.jsx