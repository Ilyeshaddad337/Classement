const table = document.querySelector("table");
let students = [];
let realStudents = students;
const input = document.querySelector('input');
const select = document.querySelector('select');

async function getData() {
  const response = await fetch("Data/1cpiSections.csv");
  const data = await response.text();

  const rows = data.split("\n").slice(1);

  rows.forEach((e) => {
    students.push(e.split(","));
  });
  //now students has an array of students each student contain

}
//now i got the data student:[0-FamilyName,1-FirstName]
//now i'll get the notes of every module

async function getNotes(NameOfTheFile) {
  const response = await fetch(`Data/${NameOfTheFile}`);
  const data = await response.text();
  const rows = data.split("\n").slice(1);
  var col =[];
  rows.forEach((e) => {
    col.push(e.split(','));
  });
  for (let i = 0; i < students.length; i++) {
    var j =0;
    while (
      j < col.length - 1 &&
      students[i][0].concat(students[i][1]).toLowerCase() !=
        col[j][0].concat(col[j][1]).toLowerCase()
    ) {
      j++;
    };
    if ((students[i][0].concat(students[i][1])) == (col[j][0].concat(col[j][1]))) {
      students[i].push(col[j][2]);
    };
  };
}
/**
 * Sorts a HTML table.
 * 
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending
 */
function sortTableByColumnA(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  // Sort each row
  const sortedRows = rows.sort((a, b) => {
    const aColText = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const bColText = b
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();

    return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
  });
 
  // Remove all existing TRs from the table
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  // Re-add the newly sorted rows
  tBody.append(...sortedRows);

  // Remember how the column is currently sorted
  table
    .querySelectorAll("th")
    .forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-sort-asc", asc);
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-sort-desc", !asc);
}
//sort just the hesders with the class thA (which contains Alphabetical values)
document.querySelectorAll(".table-sortable .thA").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumnA(tableElement, headerIndex, !currentIsAscending);
    });
});

// sortin numeric values 
function sortTableByColumnN (table,column,asc=true) {
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));
  for (let i = 0; i < rows.length; i++) {
    if (
      isNaN(
        rows[i].querySelector(`td:nth-child(${column + 1})`).textContent.trim()
      )
    ) {
      rows[i].querySelector(`td:nth-child(${column + 1})`).textContent = 0;
    }
  }
  //now we have an array of the values in the specified column ,we sort it
  //compare the content but changing the row it self
  function sortAsc(arr) {
    for (let i = 1; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i; j++) {
         var aj = parseFloat(
           arr[j].querySelector(`td:nth-child(${column + 1})`).textContent
         );
         var aj1 = parseFloat(
           arr[j + 1].querySelector(`td:nth-child(${column + 1})`).textContent
         );
        if (aj <   aj1) {
          var x = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = x;
        }
      }
    }
  }

  function sortDsc(arr) {
    for (let i = 1; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i; j++) {
        var aj=parseFloat(arr[j].querySelector(`td:nth-child(${column + 1})`).textContent);
        var aj1=parseFloat(arr[j+1].querySelector(`td:nth-child(${column + 1})`).textContent);
        if (aj > aj1) {
          var x = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = x;
        }
      }
    }
  }

  if (asc) {
    sortAsc(rows);
  } else {
    sortDsc(rows);
  }
  
  // Remove all existing TRs from the table
  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  // Re-add the newly sorted rows
  tBody.append(...rows);

  // Remember how the column is currently sorted
  table
    .querySelectorAll("th")
    .forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-sort-asc", asc);
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-sort-desc", !asc);
}
//sort just the headers with the class thN (which contains numeric values)
document.querySelectorAll(".table-sortable .thN").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumnN(tableElement, headerIndex, !currentIsAscending);
    });
});
async function insertMoy(arr) {
  for (let j = 0; j < arr.length; j++) {
    var s = 0;
      s = s+ arr[j][16]*5;
      s = s+ arr[j][17]*5;
      s = s + arr[j][18] * 3;    
      s = s + arr[j][19] * 3;    
      s = s + arr[j][20] * 3;    
      s = s + arr[j][21]*2;
      s = s + arr[j][22]*2;
    
    var m= s/21;
    arr[j][15]=m;
  }
}

//inserting the elements
async function inserting(table) {
  await getData();
  await getNotes("Notes Algo.csv");
  await getNotes("Notes Analyse.csv");
  await getNotes("Notes Archi.csv");
  await getNotes("Notes Elec.csv");
  await getNotes("Notes Algèbre1.csv");
  await getNotes("Notes T.E.E.csv");
  await getNotes("Notes-BW.csv");
  //now i got the data student:[0-FamilyName,1-FirstName,2-grp,3-section,4-Algo,5-Analyse,6-Archi,7-Elec,8-Algebre,9-TEE,10-BW]

  for (let i = 0; i < students.length; i++) {
    realStudents[i].push(students[i][3]);
    realStudents[i].push(students[i][2]);
    realStudents[i].push("-");
    realStudents[i].push(
      students[i][0].toLowerCase() + " " + students[i][1].toLowerCase()
    );
    realStudents[i].push("-");
    realStudents[i].push(students[i][4]);
    realStudents[i].push(students[i][5]);
    realStudents[i].push(students[i][6]);
    realStudents[i].push(students[i][7]);
    realStudents[i].push(students[i][8]);
    realStudents[i].push(students[i][9]);
    realStudents[i].push(students[i][10]);
    realStudents[i].push("-");
  }
  //the avrage
  await insertMoy(realStudents);
  for (let i = 0; i < realStudents.length; i++) {
    if (isNaN(realStudents[i][15])) {
      realStudents[i][15] = 0;
    }
  }
  //now for rank
  for (let i = 1; i < realStudents.length; i++) {
    for (let j = 0; j < realStudents.length - i; j++) {
      if (realStudents[j][15] < realStudents[j + 1][15]) {
        var x = realStudents[j];
        realStudents[j] = realStudents[j + 1];
        realStudents[j + 1] = x;
      }
    }
  }
  //after sorting the array by average i get the index of every students
  for (let i = 0; i < realStudents.length; i++) {
    realStudents[i][13] = realStudents.indexOf(realStudents[i]) + 1;
  }
  var tBody = table.tBodies[0];
  for (let i = 0; i < realStudents.length; i++) {
    var tr = document.createElement("tr");
    for (let j = 0; j < 13; j++) {
      var td = document.createElement("td");
      td.textContent = realStudents[i].slice(11)[j];
      tr.appendChild(td);
    }

    tBody.append(tr);
  }
}
inserting(table);

//now for the search 
input.addEventListener('input',() => {
  const value = input.value.toLowerCase();
  var column = select.value;
  switch (column) {
    case "All":
      column = "do not choose";
      break;
    case "Sct":
      column = 0;
      break;
    case "Groupe":
      column = 1;
      break;
    case "#Rank":
      column = 2;
      break;
    case "Full Name":
      column = 3;
      break;
    case "Avrg":
      column = 4;
      break;
    case "Algo":
      column = 5;
      break;
    case "Analyse":
      column = 6;
      break;
    case "Archi":
      column = 7;
      break;
    case "Electricity":
      column = 8;
      break;
    case "Algebra":
      column = 9;
      break;
    case "T.E.E":
      column = 10;
      break;
    case "B&W":
      column = 11;
      break;
    case "Sys":
      column = 12;
      break;
  };
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));
  if (column == "do not choose") {
      rows.forEach((e) => {
      if (e.textContent.toLowerCase().match(value) === null) {
        e.classList.add('hide');
      }else {
        e.classList.remove('hide')
      }
    });
  } else {
     rows.forEach((e) => {
       if (
         e
           .querySelector(`td:nth-child(${column + 1})`)
           .textContent.toLowerCase()
           .match(value) === null
       ) {
         e.classList.add("hide");
       } else {
         e.classList.remove("hide");
       }
     });
  }
});
input.addEventListener('focus',()=>{
  select.style.display = "inline-block";
  select.style.opacity= 1;
  input.style.width = '18rem';

});
