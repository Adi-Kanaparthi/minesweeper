var n = 8;
var bombCount = 10;
var bombs;
var flags;
var flagCount;

function easyMode() {
  n = 8;
  bombCount = 8;
  initialize(n, bombCount);
}

function mediumMode() {
  n = 14;
  bombCount = 25;
  initialize(n, bombCount);
}

function hardMode() {
  n = 20;
  bombCount = 60;
  initialize(n, bombCount);
}

function selectMode() {
  var mode = document.getElementById('mode').value;
  if (mode == "Easy") {
    easyMode();
  }
  else if (mode == "Medium") {
    mediumMode();
  }
  else if (mode == "Hard") {
    hardMode();
  }
}

function initialize(n, bombCount) {
  var table = document.getElementById("myTable");
  table.innerHTML = "";
  bombs = new Array(n).fill(0).map(() => new Array(n).fill(0));
  flags = new Array(n).fill(0).map(() => new Array(n).fill(0));
  for (var i = 0; i < n; i++) {
    var tableRow = document.createElement("tr");
    tableRow.setAttribute("id", i);
    for (var j = 0; j < n; j++) {
      var tableData = document.createElement("td");
      tableData.setAttribute("id", i + "." + j);
      tableData.innerHTML = '<button type="button" class="block" onclick="cellClicked(' + i + ',' + j + ')" oncontextmenu="cellRightClicked(' + i + ',' + j + '); return false;" id = "b' + i + '.' + j + '" ></button>';
      tableRow.appendChild(tableData);
    }
    myTable.appendChild(tableRow);

  }

  initializeBombs(bombs, n, n, bombCount);
  flagCount = getFlagCount();
  updateFlagCount(flagCount);
  //debugger
  show();
  reset();
  start();
}
function getFlagCount() {
  var flags = 0;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (bombs[i][j] == 1) {
        flags++;
      };
    };
  };
  return flags;
};

function updateFlagCount(flagCount) {
  var flagCounter = document.getElementById("flagCounter");
  flagCounter.innerHTML = flagCount;
}

function showNumber(row, column, number) {
  var cell = document.getElementById(row + "." + column);
  var wordForm;

  if (number == 1) {
    wordForm = "one";
  } else if (number == 2) {
    wordForm = "two";
  }
  else if (number == 3) {
    wordForm = "three";
  }
  else if (number == 4) {
    wordForm = "four";
  }
  else if (number == 5) {
    wordForm = "five";
  }
  else if (number == 6) {
    wordForm = "six";
  }
  else if (number == 7) {
    wordForm = "seven";
  }
  else if (number == 8) {
    wordForm = "eight";
  }

  if (number >= 1) {
    cell.innerHTML = "<div class = " + wordForm + ">" + number + "</div>";
  } else {
    cell.innerHTML = "<div class = 'zero' > </div>";
  };
};
function initializeBombs(bombs, rows, columns, bombCount) {
  //remember to exclude squares that already have bombs
  var bombRow;
  var bombColumn;
  console.log(bombs);
  for (var i = 0; i < bombCount; i++) {
    bombRow = Math.floor(Math.random() * n);
    bombColumn = Math.floor(Math.random() * n);
    bombs[bombRow][bombColumn] = 1;
    console.log(bombRow + " " + bombColumn + "\n");
    console.log(bombs);
  }
  console.log(bombs);
};

function cellClicked(row, column) {
  var i, j, k, l;
  //debugger
  if (flags[row][column] == 1) {
    return;
  };

  if (bombs[row][column] == 1) {
    stop();
    displayBombs(bombs, n, n);
    alert("You Lose!");
  }
  else {
    var bombCount = 0;

    for (i = row - 1; i <= row + 1 && i < n; i++) {
      if (i >= 0) {
        for (j = column - 1; j <= column + 1 && j < n; j++) {
          if (j >= 0) {
            if (bombs[i][j] == 1) {
              bombCount++;

            };
          };
        };
      };
    };
    showNumber(row, column, bombCount);
    bombs[row][column] = 2;

    if (bombCount == 0) {
      for (k = row - 1; k <= row + 1 && k < n; k++) {
        if (k >= 0) {
          for (l = column - 1; l <= column + 1 && l < n; l++) {
            if (l >= 0) {
              if (bombs[k][l] == 0)
                cellClicked(k, l);
            };
          };
        };
      };
    };
  };
  var gameStatus = isGameOver(bombs);
  if (gameStatus == true) {
    stop();
    alert("YOU WIN!!");

  };
};
function cellRightClicked(row, column) {
  debugger
  var button = document.getElementById("b" + row + '.' + column);
  if (flags[row][column] == 0) {//if there is not a flag already in the cell that was clicked then show a flag
    button.innerHTML = "<img class='flag' src='images/flag.webp'>";
    flags[row][column] = 1;
    flagCount--;
    updateFlagCount(flagCount);
  }
  else {//else remove the flag from that cell
    button.innerHTML = "";
    flags[row][column] = 0;
    flagCount++;
    updateFlagCount(flagCount);
  };

};

function isGameOver(grid) {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (grid[i][j] == 0) {
        return false;

      };
    };
  };
  return true;
};

function displayBombs(bombs, rows, columns) {
  console.log(bombs);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      if (bombs[i][j] == 1) {
        showBomb(i, j);
      };
    };
  };
}

function showBomb(row, column) {
  var bomb = document.getElementById(row + "." + column);
  bomb.innerHTML = "<img class='bomb' src='images/bomb.png'>";
};