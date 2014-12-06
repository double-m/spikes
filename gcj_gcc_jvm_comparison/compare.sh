#!/bin/bash

# Usage: $0 [--task=just_build | --task=just_run ]

BUILD=yes;
RUN=yes;

# comment blocks you don't want to execute

declare -A MYLANG_JVM;
MYLANG_JVM[title]="JVM"
MYLANG_JVM[build]="javac FindFactors.java"
MYLANG_JVM[run]="java FindFactors"

declare -A MYLANG_GCJFROMCODE;
MYLANG_GCJFROMCODE[title]="GCJ From Code"
MYLANG_GCJFROMCODE[build]="gcj-4.9 --main=FindFactors FindFactors.java -o FindFactorsGcjFromCode.elf"
MYLANG_GCJFROMCODE[run]="./FindFactorsGcjFromCode.elf"

declare -A MYLANG_GCJFROMBYTECODE;
MYLANG_GCJFROMBYTECODE[title]="GCJ From Byte Code"
MYLANG_GCJFROMBYTECODE[build]="javac FindFactors.java && gcj-4.9 --main=FindFactors FindFactors.class -o FindFactorsGcjFromByteCode.elf"
MYLANG_GCJFROMBYTECODE[run]="./FindFactorsGcjFromByteCode.elf"

declare -A MYLANG_GCC;
MYLANG_GCC[title]="GCC"
MYLANG_GCC[build]="gcc-4.9 FindFactors.c -o FindFactorsGcc.elf"
MYLANG_GCC[run]="./FindFactorsGcc.elf"

declare -A MYLANG_PHP;
MYLANG_PHP[title]="PHP"
MYLANG_PHP[run]="php FindFactors.php"

declare -A MYLANG_JS;
MYLANG_JS[title]="JS"
MYLANG_JS[run]="node FindFactors"

NUMBERS_PowersOfTen="10 100 1000 10000 100000 1000000 10000000 100000000 1000000000";
NUMBERS_ALotOfFactors="12 120 1200 12120 121200 1212000 12121200 121212000 1212120000";
NUMBERS_Prime="7 71 701 7001 70001 700001 7000003 70000027 700000001";

SEPARATOR_HEADER=","
SEPARATOR_BODY=$SEPARATOR_HEADER

#
# arguments
#

case $# in
	0) ;;
	*) arg1=$1;;
esac

if test "${arg1:0:7}" == "--task="; then
	task=${arg1:7}
	if test "$task" == "just_build"; then
		RUN=no
	elif test "$task" == "just_run"; then
		BUILD=no
	fi
fi

#
# functions
#

function generateHeader {
	typeOfNumber=$1

	echo -en "${typeOfNumber}"
	for mylang in ${!MYLANG_*}; do
		mylang_title_var=$mylang[title];
		mylang_title=${!mylang_title_var}
		[ "$mylang_title" != "" ] && echo -en "${SEPARATOR_HEADER}Duration ${mylang_title}"
	done
	echo
}

function compareDurations {
	typeOfNumber=$1
	shift

	generateHeader $typeOfNumber

	for number in $@; do
		echo -en "${number}"
		for mylang in ${!MYLANG_*}; do
			mylang_run_var=$mylang[run];
			mylang_run=${!mylang_run_var}
			if test "$mylang_run" != ""; then
				start=$(($(date +%s%N)/1000000))
				$mylang_run $number > /dev/null
				echo -en "${SEPARATOR_BODY}$(($(($(date +%s%N)/1000000))-start))"
			fi
		done
		echo
	done
}

#
# operations
#

if test "$BUILD" == "yes"; then
	for mylang in ${!MYLANG_*}; do
		mylang_build_var=$mylang[build];
		mylang_build=${!mylang_build_var}
		[ "$mylang_build" != "" ] && eval $mylang_build
	done
fi

if test "$RUN" == "yes"; then
	for numbers in ${!NUMBERS_*}; do
		compareDurations ${numbers:8} ${!numbers}
	done
fi

