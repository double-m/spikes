<?php

$fromHttp = true;
$argv[0] = 'FindFactors.php';

$usage = 'Usage: http://server/path/to/FindFactorsHttp.php?integer=INTEGER';

if (empty($_GET['integer'])) {
	echo $usage;
	exit(1);
}
$argv[1] = $_GET['integer'];

$start = mktime();
require 'FindFactors.php';
$time = mktime() - $start;

echo "\ntotal time: {$time} sec\n";

