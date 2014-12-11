## JVM, GCJ, GCC performance

### Which performs better in finding all factors of an integer number?

Edit and execute `compare.sh` in a bash environment. If unchanged, it will:

-	generate
	- the Java byte code (with javac),
	- an ELF binary from the .java code (with gcj-4.9),
	- an ELF binary from the .class byte code (with gcj-4.9),
	- an ELF binary from the .c code (with gcc-4.9);
-	run some tests using as dividends
	- some powers of ten (one per OdM),
	- some numbers with a lot of factors (one per OdM),
	- some prime numbers (one per OdM);
-	output the results in CSV format.

Usage:

```
user@linuxbox$ ./compare.sh
```

Or:

```
user@linuxbox$ ./compare.sh --task=just_build
user@linuxbox$ ./compare.sh --task=just_run
```

### Results

In my Linux box, with this algorith and no further investigation, it seems that:
-	the compiled Java is better than JVM on small tasks e worst on big tasks;
-	it makes no significant difference compiling Java from the Java code or from the byte code;
-	the compiled C has always the best performaces, expecially for small tasks;
-	NodeJS is not bad (new - not in graph);
-	PHP CLI is embarassing (new - not in graph).

(Linux 3.16.0-4-amd64, OpenJDK 1.7, gcc-4.9, gcj-4.9, NodeJS v0.10.26, PHP 5.6.2-1 (cli))

![](https://raw.githubusercontent.com/double-m/spikes/master/gcj_gcc_jvm_comparison/histograms/comparison_using_numbers_with_a_lot_of_factors.png)
![](https://raw.githubusercontent.com/double-m/spikes/master/gcj_gcc_jvm_comparison/histograms/comparison_using_powers_of_ten.png)
![](https://raw.githubusercontent.com/double-m/spikes/master/gcj_gcc_jvm_comparison/histograms/comparison_using_prime_numbers.png)
![](https://raw.githubusercontent.com/double-m/spikes/master/gcj_gcc_jvm_comparison/histograms/comparison_php_sucks.png)

