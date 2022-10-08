var rows = +prompt("Enter rows here");
var cols = +prompt("Enter cols here");

createTable(rows, cols);

function createTable(rows, cols) {
  var j = 1;
  var output = "<table>";
  output += "<tr><th>X</th>";
  for (var j = 1; j <= cols; j++) {
    output += "<th>" + j + "</th>";
  }
  output += "</tr>";
  j = 1;
  for (i = 1; i <= rows; i++) {
    output += "<tr>";
    output += "<th>" + i + "</th>";

    while (j <= cols) {
      output += "<td>" + i * j + "</td>";

      j = j + 1;
    }
    output += "</tr>";
    j = 1;
  }
  output += "</table>";

  const parser = new DOMParser();
  const data = parser.parseFromString(output, "text/html");

  document.body = data.body;
}

let trs = document.querySelectorAll("tr");

const overDecendentsndSiblingsRow = (y) => {
  let rowIndex = y.target.parentElement.rowIndex;
  let cellIndex = y.target.cellIndex;

  trs[rowIndex].children[cellIndex].style.backgroundColor = "yellow";

  for (let i = rowIndex; i >= 0; i--) {
    if (i === rowIndex) {
      for (let j = cellIndex - 1; j >= 0; j--) {
        if (j === 0) {
          trs[i].children[j].style.backgroundColor = "yellow"; // color 0th cell on hovered row
          continue;
        }
        if (i !== 0) {
          trs[i].children[j].style.backgroundColor = "pink"; // color all cells on hovered row except 0th cell
        }
      }
    }

    if (i === 0) {
      trs[i].children[cellIndex].style.backgroundColor = "yellow"; // color specific cell on 0th row
      continue;
    }

    if (i !== rowIndex && cellIndex !== 0) {
      trs[i].children[cellIndex].style.backgroundColor = "pink"; // color specific cell of each row except hovered cell
    }
  }
};

const outDecendentsndSiblingsRow = (y) => {
  let rowIndex = y.target.parentElement.rowIndex;
  let cellIndex = y.target.cellIndex;

  for (let i = rowIndex; i >= 0; i--) {
    if (i === rowIndex) {
      for (let j = cellIndex - 1; j >= 0; j--) {
        if (j === 0) {
          trs[i].children[j].style.backgroundColor = "#E2F0C6";
          continue;
        }
        if (i !== 0) {
          trs[i].children[j].style.backgroundColor = "unset";
        }
      }
    }

    if (i === 0 || cellIndex === 0) {
      trs[i].children[cellIndex].style.backgroundColor = "#E2F0C6";
      continue;
    }

    trs[i].children[cellIndex].style.backgroundColor = "unset"; // unset color on specific column of each row except 0th
  }
};

trs.forEach((a) =>
  a.addEventListener("mouseover", overDecendentsndSiblingsRow, false)
);
trs.forEach((a) =>
  a.addEventListener("mouseout", outDecendentsndSiblingsRow, false)
);
