#! /usr/bin/env python3.4

import sys

usage = 'Usage: python ' + str(sys.argv[0]) + ' <INTEGER>';

def checkArgs(argv):
	if len(argv) < 2:
		print ('is zero')
		return False
	argv1 = argv[1].strip()
	try:
		int(argv1)
		return True
	except ValueError:
		return False

def findFactors(dividend):
	if dividend == 0:
		return [0]
	firstFactor = 1
	if dividend < 0:
		firstFactor = -1
		dividend -= dividend
	factors = [firstFactor]
	for n in range(2, dividend+1):
		if dividend%n == 0:
			factors.append(n)
	return factors

if not checkArgs(sys.argv):
	print (usage)
	sys.exit(1)

dividend = int(sys.argv[1])

factors = findFactors(dividend);
print (factors)
