<?php

if (empty($usage)) {
	$usage = "Usage: php {$argv[0]} <INTEGER>";
}

if(!checkArgs($argv)) {
	echo "$usage\n";
	exit(1);
}

$dividend = get_numeric($argv[1]);

$factors = findFactors($dividend);
echo '[' . join(', ', $factors) . "]\n";



function checkArgs($argv) {
	if (count($argv) < 2) {
		return false;
	}

	$argv1 = trim($argv[1]);
	
	return is_int(get_numeric($argv1));
}

function get_numeric($val) {
	if (is_numeric($val)) {
		return $val + 0;
	}
	
	return "NaN";
}

function findFactors($dividend) {
	if ($dividend == 0) {
		return array();
	}
	
	$firstFactor = 1;
	if ($dividend < 0) {
		$dividend = -$dividend;
		$firstFactor = -1;
	}
	$factors = array($firstFactor);
	
	for ($i=2; $i<=$dividend; $i++) {
		if ($dividend%$i === 0) {
			$factors[] = $i;
		}
	}
	
	return $factors;
}
