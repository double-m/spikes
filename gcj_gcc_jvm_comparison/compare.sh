#!/bin/bash

# Usage: $0 [--task=just_build | --task=just_run ]

BUILD=yes;
RUN=yes;
NUMBERS_PowersOfTen="10 100 1000 10000 100000 1000000 10000000 100000000 1000000000";
NUMBERS_ALotOfFactors="12 120 1200 12120 121200 1212000 12121200 121212000 1212120000";
NUMBERS_Prime="7 71 701 7001 70001 700001 7000003 70000027 700000001";
SEPARATOR_HEADER=","
SEPARATOR_BODY=$SEPARATOR_HEADER
COMPILER_JAVA="javac"
COMPILER_GCJ="gcj-4.9"
COMPILER_GCC="gcc-4.9"

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

if test "$BUILD" == "yes"; then
	javac FindFactors.java
	$COMPILER_GCJ --main=FindFactors FindFactors.java -o FindFactorsGcjFromCode.elf
	$COMPILER_GCJ --main=FindFactors FindFactors.class -o FindFactorsGcjFromByteCode.elf
	$COMPILER_GCC FindFactors.c -o FindFactorsGcc.elf
fi

function compare_durations {
	echo -e "${1}${SEPARATOR_HEADER}Duration JVM${SEPARATOR_HEADER}Duration GCJ From Code${SEPARATOR_HEADER}Duration GCJ From Byte Code${SEPARATOR_HEADER}Duration GCC"
	shift

	for number in $@; do
		start=$(($(date +%s%N)/1000000))
		java FindFactors $number > /dev/null
		duration_java="$(($(($(date +%s%N)/1000000))-start))"

		start=$(($(date +%s%N)/1000000))
		./FindFactorsGcjFromCode.elf $number > /dev/null
		duration_gcj_from_byte_code="$(($(($(date +%s%N)/1000000))-start))"

		start=$(($(date +%s%N)/1000000))
		./FindFactorsGcjFromByteCode.elf $number > /dev/null
		duration_gcj_from_code="$(($(($(date +%s%N)/1000000))-start))"

		start=$(($(date +%s%N)/1000000))
		./FindFactorsGcc.elf $number > /dev/null
		duration_gcc="$(($(($(date +%s%N)/1000000))-start))"

		echo -e "${number}${SEPARATOR_BODY}${duration_java}${SEPARATOR_BODY}${duration_gcj_from_code}${SEPARATOR_BODY}${duration_gcj_from_byte_code}${SEPARATOR_BODY}${duration_gcc}"
	done
}

if test "$RUN" == "yes"; then
	for numbers in ${!NUMBERS_*}; do
		compare_durations ${numbers:8} ${!numbers}
	done
fi
