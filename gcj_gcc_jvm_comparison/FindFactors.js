var usage = "Usage: node " + process.argv[1] + " <INTEGER>"
  , dividend
  , factors;

if (!checkArgs()) {
  console.log(usage);
  process.exit(1);
}

dividend = process.argv[2]/1;

factors = findFactors(dividend);

console.log("[" + factors.join(', ') + "]");

function findFactors(dividend) {
  var firstFactor = 1
    , factors = Array();
  
  if (dividend === 0) {
    return Array();
  }
  
  if (dividend < 0) {
    dividend = -dividend;
    firstFactor = -1;
  }
  
  factors.push(firstFactor);
  
  for (var i=2; i<=dividend; i++) {
    if (dividend % i === 0) {
      factors.push(i);
    }
  }
  
  return factors;
}

function checkArgs() {
  var argv2;
  
  if (process.argv.length < 3) {
    return false;
  }
  
  argv2 = process.argv[2];
  
  if (isNaN(argv2)) {
    return false;
  }
  
  if (!isFinite(argv2)) {
    return false;
  }

  if (Math.floor(argv2) !== argv2/1) {
    return false;
  }
  
  return true;
}

