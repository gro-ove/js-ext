@echo off
cmd /C js-ext.cmd src\js-ext.jsx -e -o build\js-ext.temp.js || exit /b
node build\js-ext.temp.js stuff\test-native.jsx -l 4059818 || exit /b
node build\js-ext.temp.js stuff\test-lambda.jsx -l 17455 || exit /b
node build\js-ext.temp.js stuff\test-strings.jsx -l 627 || exit /b
node build\js-ext.temp.js stuff\test-arguments.jsx -l 5562 || exit /b
node build\js-ext.temp.js stuff\test-for-in-loops.jsx -l 19845 || exit /b
node build\js-ext.temp.js stuff\test-for-in-array-loops.jsx -l 13719 || exit /b
node build\js-ext.temp.js stuff\test-try.jsx -l 9875 || exit /b
:: node build\js-ext.temp.js stuff\test-commafree.jsx -l 9476 || exit /b
node build\js-ext.temp.js stuff\current.jsx