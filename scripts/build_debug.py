import os
import sys
import shutil
import optparse
import subprocess

def get_options_parser():
  parser = optparse.OptionParser('')

  parser.add_option('--root',
                    dest='roots',
                    default=[],
                    action='append')
  parser.add_option('--input',
                    dest='inputs',
                    default=[],
                    action='append')
  parser.add_option('--output_file',
                    dest='output_file',
                    default='')
  parser.add_option('--compiler_flags', default=[])
  return parser

def closure_base_path():
	return os.path.normpath(sys.path[0] + "/../libs/closure/closure")

def depswriter_path():
	return closure_base_path() + "/bin/build/depswriter.py"

def build(options):
    args = ["python", depswriter_path()]
    args.extend(["--root=" + x for x in options.roots if x == "."])
    args.extend(["--root_with_prefix=" + x + (" file:///" if x[1] == ':' else " ") + x for x in options.roots if x != "."])
    args.extend([x for x in options.inputs])

    return subprocess.check_output(args)

def closure_basejs_source():
	baseJsPath = closure_base_path() + "/goog/base.js"
	baseJsSource = open(baseJsPath).read()

	#fix checking for empty CLOSURE_BASE_PATH
	baseJsSource = baseJsSource.replace(
		"if (goog.global.CLOSURE_BASE_PATH) {",
		"if (goog.global.CLOSURE_BASE_PATH !== undefined) {")

	return baseJsSource

def prepare_source(source, requiringModules):
	#init closure global variables
	fixedSource = "window.CLOSURE_NO_DEPS = true;\n" + \
	              "window.CLOSURE_BASE_PATH = '';\n"

	#attach closure base.js	
	fixedSource += closure_basejs_source() + "\n" + source

	#add requiring modules
	for moduleName in requiringModules:
		fixedSource += "\ngoog.require('" + moduleName + "');\n"

	return fixedSource

def temp_file_name(fileName):
	return fileName + "__"

def create_temp_modules(inputs):
	modules = []

	for inputPath in inputs:
		moduleName = "__tmp.Module" + str(len(modules))
		modules.append(moduleName)

		shutil.copyfile(inputPath, temp_file_name(inputPath))

		file = open(inputPath, 'a')
		file.write(";\ngoog.provide('" + moduleName + "');\n")
		file.close()

	return modules

def rollback_temp_modules(inputs):
	for inputPath in inputs:
		tempPath = temp_file_name(inputPath)
		if os.path.exists(inputPath) and os.path.exists(tempPath):
			shutil.move(tempPath, inputPath)


def main():
	options, args = get_options_parser().parse_args()
	outFile = open(options.output_file, "w") if options.output_file else sys.stdout
		
	try:
		inputModules = create_temp_modules(options.inputs)
		source = build(options)

		outFile.write(prepare_source(source, inputModules))
		outFile.write("goog.define('goog.defineClass.SEAL_CLASS_INSTANCES', false);")
	finally:
		rollback_temp_modules(options.inputs)    
    
if __name__ == '__main__':
	main()