@echo off
::goto current


:: Build new version of Js-Ext, build new version of Js-Ext with new version of Js-Ext, build and run tests, after apply new version
:build

node "%~dp0\build\js-ext.js" "%~dp0\src\js-ext.jsx" || exit /b
echo [Js-Ext has been builded by previous version]

node "%~dp0\build\js-ext-new.js" "%~dp0\src\js-ext.jsx" || exit /b
echo [Js-Ext has been builded by new version]

node "%~dp0\build\js-ext-new.js" "%~dp0\tests\tests.jsx" && node "%~dp0\tests\temp\tests.js" || exit /b
echo [Tests passed]

copy /Y /B "%~dp0\build\js-ext-new.js" "%~dp0\build\js-ext.js" > nul
del "%~dp0\build\js-ext-new.js" > nul
echo [New version applied]

goto :eof


:: Build new version of Js-Ext, build and run "current.jsx"
:current

node "%~dp0\build\js-ext.js" "%~dp0\src\js-ext.jsx" || exit /b
echo [Js-Ext has been builded]

node "%~dp0\build\js-ext-new.js" "%~dp0\tests\current.jsx" && node "%~dp0\tests\temp\current.js" || exit /b
echo [Success]

goto :eof
