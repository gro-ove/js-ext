@echo off
js-ext.cmd js-ext-new.jsx -o js-ext-new.js && echo Zero && node js-ext-new.js js-ext-new.jsx -o temp.js && echo One && node temp.js js-ext-new.jsx -o temp.js && echo Two && node temp.js js-ext-new.jsx -o temp.js && echo Three || echo Failed
del temp.js 2>1 1>nul