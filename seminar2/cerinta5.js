const fibonacci = (n) => {
  if (n < 0) {
    return null;
  }
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }

  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
};

if (process.argv.length <= 2) {
  console.log("parametri insuficienti");
} else {
  const ordin = parseInt(process.argv[2]);
  const rezultat = fibonacci(ordin);
  if (rezultat === null) {
    console.log("index invalid");
  } else {
    console.log(rezultat);
  }
}
