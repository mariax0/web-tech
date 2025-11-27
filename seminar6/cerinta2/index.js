document.querySelector("tbody tr:first-child").style.backgroundColor = "blue";
document.querySelector("tbody tr:last-child").style.backgroundColor = "green";

let middleOddRows = document.querySelectorAll(
  "tbody tr:nth-child(odd):not(:first-child):not(:last-child)"
);

for (let row of middleOddRows) {
  row.style.backgroundColor = "violet";
}
