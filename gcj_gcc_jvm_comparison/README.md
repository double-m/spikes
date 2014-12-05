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
