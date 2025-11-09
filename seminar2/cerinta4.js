function intercaleazaArrayuri(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    throw new Error("Array-urile trebuie sa aiba aceeasi lungime");
  }

  var rezultat = [];
  for (var i = 0; i < arr1.length; i++) {
    rezultat.push(arr1[i]);
    rezultat.push(arr2[i]);
  }
  return rezultat;
}

let a1 = ["a", "c", "e"];
let a2 = ["b", "d", "f"];
console.log(intercaleazaArrayuri(a1, a2).join(", "));

let b1 = [1];
let b2 = [2];
console.log(intercaleazaArrayuri(b1, b2).join(""));
