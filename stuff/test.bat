@echo off
cls
cmd /C js-ext.cmd src\js-ext.jsx -e -o build\js-ext.temp.js > nul || exit /b
:: node build\js-ext.temp.js stuff\test-native.jsx -l 5617279 || exit /b
:: node build\js-ext.temp.js stuff\test-lambda.jsx -l 24459 || exit /b
:: node build\js-ext.temp.js stuff\test-strings.jsx -l 827 || exit /b
:: node build\js-ext.temp.js stuff\test-arguments.jsx -l 6505 || exit /b
:: node build\js-ext.temp.js stuff\test-for-in-loops.jsx -l 26772 || exit /b
:: node build\js-ext.temp.js stuff\test-for-in-array-loops.jsx -l 16934 || exit /b
:: node build\js-ext.temp.js stuff\test-try.jsx -l 13411 || exit /b
:: node build\js-ext.temp.js stuff\test-commafree.jsx -l 9476 || exit /b
node build\js-ext.temp.js stuff\imports\current.jsx