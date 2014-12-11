set terminal png
set output "histogram.png"

set style fill solid 0.50 border 0
set style data histogram
set style histogram cluster gap 1

set title "Comparison between executables in different languages"

set key left Left reverse
set key font ",9"

set auto x
set xlabel "Dividends"
set xlabel font ",9"
set xtics font ",9"
set ytics font ",9"
#set xtics nomirror rotate by -45 scale 0

#set logscale y
set ylabel font ",9"
set ylabel "Execution time (ms)"

set datafile separator ","
set key autotitle columnhead
nc = "`awk -F, 'NR == 1 { print NF; exit }' results.csv`"

plot 'results.csv' using 2:xtic(1), for [i=3:nc] '' using i

