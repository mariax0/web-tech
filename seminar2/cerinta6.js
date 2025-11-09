const sampleString = "the quick brown fox jumps over the lazy dog";

const getLetterFrequencies = (text) => {
  const result = {};
  let totalLetters = 0;

  for (let char of text) {
    if (char !== " ") {
      if (char in result) {
        result[char]++;
      } else {
        result[char] = 1;
      }
      totalLetters++;
    }
  }

  for (let letter in result) {
    result[letter] = Number((result[letter] / totalLetters).toFixed(3));
  }

  return result;
};

console.log(getLetterFrequencies(sampleString));
