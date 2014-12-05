#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
	char *usageHead, *usageBody, *usageTail, *usageMsg;
	int i, number, *factors, factorsLen, firstFactor;
	
	usageHead = "Usage:";
	usageBody = argv[0];
	usageTail = "<INTEGER>";
	firstFactor = 1;
	
	if (argc < 2) {
		printf("%s %s %s\n", usageHead, usageBody, usageTail);
		return 1;
	}
	
	number = atoi(argv[1]);
	
	if (number == 0) {
		printf("%d\n", 0);
		return 1;
	}
	
	if (number < 0) {
		number = -number;
		firstFactor = -1;
	}

	factorsLen = 1;
	factors = (int *) malloc(factorsLen * sizeof(int));
	factors[0] = firstFactor;
	
	for (i=2; i<=number; i++) {
		if (number%i == 0) {
			factorsLen++;
			factors = (int *) realloc(factors, factorsLen * sizeof(int));
			factors[factorsLen-1] = i;
		}
	}
	
	printf("[");
	for (i=0; i<factorsLen; i++) {
		printf("%d", factors[i]);
		if (i < factorsLen-1) {
			printf(", ", factors[i]);
		} else {
			printf("]\n");
		}
	}
	
	free(factors);
	
	return 0;
}
