@echo off
goto script


:: Build "current.jsx" with new Js-Ext, which has builded by new Js-Ext, which has builded by old Js-Ext
:jsextjsext

cmd /C node "%~dp0\old\js-ext.js" "%~dp0\src\js-ext.jsx" -e -o "%~dp0\build\js-ext.js" > nul || exit /b
echo [Builded by old Js-Ext]

node "%~dp0\build\js-ext.js" "%~dp0\src\js-ext-new.jsx" || exit /b
echo [Builded by new Js-Ext]

node "%~dp0\build\js-ext.stable.js" "%~dp0\tests\current.jsx" && node "%~dp0\tests\current.js" || exit /b
echo [Success]

goto :eof


:: Build "current.jsx" with new Js-Ext, which has builded by old Js-Ext
:current

cmd /C node "%~dp0\old\js-ext.js" "%~dp0\src\js-ext.jsx" -e -o "%~dp0\build\js-ext.js" > nul || exit /b
echo [Builded]

node "%~dp0\build\js-ext.js" "%~dp0\tests\current.jsx" && node "%~dp0\tests\current.js" || exit /b
echo [Success]

goto :eof


:: Script
:script
goto jsextjsext
