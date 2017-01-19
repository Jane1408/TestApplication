@echo off

pushd %~dp0out
rem Generate script.js
call ../../../scripts/build_debug.bat ^
	../../../ ^
	--root=. ^
	--input=../main.js ^
	--output_file=script.js

popd