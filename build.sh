# Build new version of Js-Ext, build new version of Js-Ext with new version of Js-Ext, build and run tests, after apply new version
build (){
	node "build/js-ext.js" "src/js-ext.jsx" || exit 11
	echo [Js-Ext has been builded by previous version]

	node "build/js-ext-new.js" "src/js-ext.jsx" || exit 12
	echo [Js-Ext has been builded by new version]

	node "build/js-ext-new.js" "tests/tests.jsx" && node "tests/temp/tests.js" || exit 13
	echo [Tests passed]

	node "build/js-ext-new.js" --keep-order "tests/tests-ko.jsx" && node "tests/temp/tests-ko.js" || exit 13
	echo [Tests with --keep-order passed]

	node "build/js-ext-new.js" --keep-order "tests/tests-new.jsx" && node "tests/temp/tests-new.js" || exit 14
	echo [New tests passed]

	mv "build/js-ext-new.js" "build/js-ext.js" || exit 15
	echo [New version applied]
}

# Build new version of Js-Ext, build and run "current.jsx"
current (){
	node "build/js-ext.js" "src/js-ext.jsx" || exit 21
	echo [Js-Ext has been builded]

	node "build/js-ext-new.js" "tests/current.jsx" && node "$0/../tests/temp/current.js" || exit 22
	echo [Success]
}

cd `dirname $0` || exit 1
build