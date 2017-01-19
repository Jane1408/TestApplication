rmdir /S /Q out

set ROOT=../../src/ispring
set PRESENTER_ROOT=%ROOT%/presenter
set UTILS_ROOT=%ROOT%/utils



call build_doc.bat ^
	%ROOT%/events ^
	%UTILS_ROOT%/assets ^
	%PRESENTER_ROOT%/player ^
	%PRESENTER_ROOT%/presentation
