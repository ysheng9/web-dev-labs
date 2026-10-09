// Ye Sheng — Lab 8

// ===== Lab 7 Part 2: Variables, data types, operators, template literals =====
const name = "Ada";
let labsCompleted = 6;
let isEnrolled = false;
labsCompleted = labsCompleted + 1;
console.log(`${name} has completed ${labsCompleted} labs.`);

// ===== Lab 8 Part 1 & 3 & 5: Like counter (Graduate Extension: closure version) =====
const likeBtn = document.querySelector("#like-btn");
const likeCount = document.querySelector("#like-count");
const likeMessage = document.querySelector("#like-message");

// Part 3: update display and reward message
function updateLikeDisplay(count) {
  if (likeCount) {
    likeCount.textContent = `${count} likes`;
  }

  if (likeMessage) {
    if (count >= 10) {
      likeMessage.textContent = "Wow, thanks for all the likes!";
    } else if (count >= 5) {
      likeMessage.textContent = "Glad you like it!";
    } else {
      likeMessage.textContent = "";
    }
  }
}

// Part 5 / Graduate: closure-based counter — likes is private
function createLikeCounter() {
  let likes = 0; // private — not reachable from outside

  return {
    increment() {
      likes = likes + 1;
      updateLikeDisplay(likes);
    },
    getLikes() {
      return likes;
    }
  };
}

const counter = createLikeCounter();

// Initialize display to 0 likes, keeps UI in sync
updateLikeDisplay(counter.getLikes());

// Named function for the click handler (Part 1: split logic into named functions)
function handleLikeClick() {
  counter.increment();
}

// Part 4: defensive check for like button
if (likeBtn) {
  likeBtn.addEventListener("click", handleLikeClick);
} else {
  console.warn("like-btn not found on this page");
}

// ===== Lab 8 Part 2: Arrays and Loops =====
const goals = [
  "Learn responsive web design",
  "Master JavaScript DOM manipulation",
  "Understand CSS Flexbox and Grid",
  "Git" // fourth goal added in one line
];

const goalsList = document.querySelector("#goals-list");

if (goalsList) {
  goals.forEach(function (goal) {
    const item = document.createElement("li");
    item.textContent = goal;
    goalsList.appendChild(item);
  });
} else {
  console.warn("goals-list not found on this page");
}

// ===== Lab 7 Part 4 / Lab 8: Dark mode toggle =====
const themeBtn = document.querySelector("#theme-btn");

if (themeBtn) {
  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
  });
} else {
  console.warn("theme-btn not found on this page");
}