const numarCaractereDiferite = (str1, str2) => {
  if (str1.length !== str2.length) {
    return -1;
  }

  let diferente = 0;

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      diferente++;
    }
  }

  return diferente;
};

console.log(numarCaractereDiferite("abc", "abc"));
console.log(numarCaractereDiferite("abc", "abd"));
console.log(numarCaractereDiferite("abc", "xyz"));
console.log(numarCaractereDiferite("abc", "ab"));
console.log(numarCaractereDiferite("hello", "heLLo"));
