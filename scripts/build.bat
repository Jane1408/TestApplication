@echo off
%~dp0..\libs\closure\closure\bin\build\closurebuilder.py ^
	%* ^
	--root=%~dp0../src ^
	--root=%~dp0../libs/closure ^
	--output_mode=compiled ^
	--compiler_jar="%~dp0..\libs\closure\compiler.jar" ^
 	--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ^
	--compiler_flags="--jscomp_error=visibility" ^
	--compiler_flags="--jscomp_error=constantProperty" ^
	--compiler_flags="--jscomp_warning=extraRequire" ^
	--compiler_flags="--warning_level=VERBOSE" ^
	--compiler_flags="--js=%~dp0../libs/closure/closure/goog/deps.js" ^
	--compiler_flags="--generate_exports" ^
	--compiler_flags="--output_wrapper=(function(){%%output%%})();" ^
	--compiler_flags="--define='goog.DEBUG=false'"


rem 	--compiler_flags="--formatting=PRETTY_PRINT" ^
rem 	--compiler_flags="--compilation_level=ADVANCED_OPTIMIZATIONS" ^
rem 	--compiler_flags="--compilation_level=SIMPLE_OPTIMIZATIONS" ^
rem 	--compiler_flags="--compilation_level=WHITESPACE_ONLY" ^