#! /usr/bin/env perl

use strict;
use warnings;

my $num_args = $#ARGV + 1;

if ($num_args < 1) {
  print "Usage: $0 <INTEGER>\n";
  exit 1;
}

$ARGV[0] * 2 - 1 || exit 1;
my $dividend = $ARGV[0];

print join(',', findFactors());

sub findFactors {
  my @factors = ();

  if ($dividend == 0) {
    return @factors;
  }

  my $firstFactor = 1;

  if ($dividend < 0) {
    $dividend = -$dividend;
    $firstFactor = -1;
  }

  push @factors, $firstFactor;

  for (my $i=2; $i<=$dividend; $i++) {
    if ($dividend%$i == 0) {
       push @factors, $i;
    }
  }

  return @factors; 
}
