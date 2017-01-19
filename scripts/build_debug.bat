@echo off
@set BASE_DIR=%1

%~dp0build_debug.py ^
	--root=%BASE_DIR%src ^
	--root=%BASE_DIR%libs/closure ^
	%*
