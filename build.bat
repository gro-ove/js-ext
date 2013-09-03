@echo off
echo . Started
cmd /C js-ext.cmd "%~dp0\src\js-ext.jsx" -o "%~dp0\build\js-ext.js" && echo . Converted || echo . Converting failed
pegjs.cmd --cache < "%~dp0\src\js-ext.pegjs" | node -e "i='',q=String.fromCharCode(34),s=process.stdin;s.on('data',function(a){i+=a});s.on('end',function(){console.log('exports.parser='+i.replace ('return '+q+'Expected '+q+' + expectedHumanized','return '+q+'['+q+' + line + '+q+': '+q+' + column + '+q+'] '+q+' + '+q+'Expected '+q+' + expectedHumanized'))})" > "%~dp0\build\js-ext.parser" && echo . Parser builded || echo . Parser building failed
:: uglifyjs2 "%~dp0\build\js-ext.parser" -c -o "%~dp0\build\js-ext.parser"
:: echo . Parser minified
echo . Finished