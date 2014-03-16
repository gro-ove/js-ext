@echo off
cmd /C node "%~dp0\old\js-ext.js" "%~dp0\src\js-ext.jsx" -e -o "%~dp0\build\js-ext.js" > nul || exit /b
node "%~dp0\build\js-ext.js" "%~dp0\tests\current.jsx" && node "%~dp0\tests\current.js" && echo [Success]
