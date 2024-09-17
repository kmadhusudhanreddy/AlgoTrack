let progress = document.getElementById("progress");

let arrCount = document.getElementById("arrCount");

//content and arraycontent
let content = document.querySelectorAll(".content");
let arrContent = document.querySelectorAll(".content1");

//these are related to ticksymbol
let statusClickList = document.querySelectorAll(".tick"); //return a NodeList
let rightMark = document.querySelectorAll("i");

//delete button
let deleteButton = document.querySelector(".delete");

//function for displaying on click on content
document.addEventListener("DOMContentLoaded", function () {
  // Select all .content elements
  const contents = document.querySelectorAll(".content");
  //for hover
  let isClicked = false;
  contents.forEach((content) => {
    content.addEventListener("click", function () {
      // Find the next sibling .content1 element
      let nextContent1 = content.nextElementSibling;

      //find total count
      let problemSolved = document.querySelectorAll("#arrCount");

      // Ensure we are only toggling the direct sibling .content1
      while (nextContent1 && !nextContent1.classList.contains("content1")) {
        nextContent1 = nextContent1.nextElementSibling;
      }

      if (nextContent1 && nextContent1.classList.contains("content1")) {
        // Toggle the display of the .content1 element
        if (
          nextContent1.style.display === "none" ||
          nextContent1.style.display === ""
        ) {
          nextContent1.style.display = "block";
          content.style.backgroundColor = "black";
          isClicked = true;
          changeColor();
        } else {
          nextContent1.style.display = "none";
          content.style.backgroundColor = "#4a4a4a";
          isClicked = false;
        }
      }
    });

    //add hover event listeners
    content.addEventListener("mouseover", function () {
      if (!isClicked) {
        content.style.backgroundColor = "black";
      }
    });

    content.addEventListener("mouseout", function () {
      if (!isClicked) {
        content.style.backgroundColor = "";
      }
    });
  });
});

// Change the color of difficulty level based on value
function changeColor() {
  let levelColor = document.querySelectorAll("#level");
  levelColor.forEach((elem) => {
    let levelText = elem.textContent.toLowerCase();
    if (levelText === "easy") {
      elem.style.color = "#008000 "; // Green for easy
    } else if (levelText === "medium") {
      elem.style.color = "#ffc40c"; // Yellow for medium
    } else {
      elem.style.color = "#ff4500"; // Red for hard
    }
  });
}

// If clicked on status increment the count in specific content and total
let totalCount = 0;
function statusClicked() {
  statusClickList.forEach((element, index) => {
    element.addEventListener("click", function () {
      let grandParent = element.closest(".content1").previousElementSibling;
      let spanAccount = grandParent.querySelector("#arrCount");
      let noOfProblems = parseInt(spanAccount.textContent);

      if (
        rightMark[index].style.display === "none" ||
        rightMark[index].style.display === ""
      ) {
        rightMark[index].style.display = "block";
        totalCount++;
        noOfProblems++;
        let levelType = element.parentElement.children[2].textContent;
        statsCheckIncrease(levelType);
      } else {
        rightMark[index].style.display = "none";
        totalCount--;
        noOfProblems--;
        let levelType = element.parentElement.children[2].textContent;
        statsCheckDecrease(levelType);
      }

      progress.textContent = totalCount;
      spanAccount.textContent = noOfProblems;
    });
  });
}
statusClicked();

// For adding stats
let easyProblems = document.getElementById("eas");
let medProblems = document.getElementById("med");
let hardProblems = document.getElementById("har");
let easyCount = 0;
let medCount = 0;
let hardCount = 0;

function statsCheckIncrease(levelType) {
  let levelText = levelType.toLowerCase();

  if (levelText === "easy") {
    easyCount++;
  } else if (levelText === "medium") {
    medCount++;
  } else {
    hardCount++;
  }
  easyProblems.textContent = easyCount;
  medProblems.textContent = medCount;
  hardProblems.textContent = hardCount;
}

// For removing stats
function statsCheckDecrease(levelType) {
  let levelText = levelType.toLowerCase();

  if (levelText === "easy") {
    easyCount--;
  } else if (levelText === "medium") {
    medCount--;
  } else {
    hardCount--;
  }
  easyProblems.textContent = easyCount;
  medProblems.textContent = medCount;
  hardProblems.textContent = hardCount;
}

// When clicked on delete button, delete all problems count
function clearAll() {
  deleteButton.addEventListener("click", function () {
    totalCount = 0;
    easyCount = 0;
    medCount = 0;
    hardCount = 0;
    progress.textContent = 0;
    easyProblems.textContent = 0;
    medProblems.textContent = 0;
    hardProblems.textContent = 0;
    let problemCount = document.querySelectorAll("#arrCount");
    problemCount.forEach((elem) => {
      elem.textContent = 0;
    });
    statusUnclick();
  });
}
clearAll();

// Uncheck all tick marks
function statusUnclick() {
  statusClickList.forEach((element, index) => {
    if (rightMark[index].style.display === "block") {
      rightMark[index].style.display = "none";
    }
  });
}
