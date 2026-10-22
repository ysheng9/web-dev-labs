// Ye Sheng — Lab 9

/* Lab9 test code
console.log("1. Starting");
setTimeout(function () {
  console.log("2. This runs later");
}, 1000);
console.log("3. This runs immediately");
*/

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

// ===== Lab 9 Part 2 & 3: Promise + async/await =====
function getGreetingAfterDelay() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve("Hello from the future!");
    }, 800);
  });
}

// Part 2 的 .then 写法，确认后可注释掉
// getGreetingAfterDelay().then(function (message) {
//   console.log(message);
// });

// Part 3：async/await 写法
async function showGreeting() {
  const message = await getGreetingAfterDelay();
  console.log(message);
}
showGreeting();

// ===== Lab 9 Part 4: Fetch a cat fact =====
const factBtn = document.querySelector("#fact-btn");
const factDisplay = document.querySelector("#fact-display");

async function loadFact() {
  if (!factDisplay) return;

  factDisplay.textContent = "Loading...";

  try {
    const response = await fetch("https://catfact.ninja/fact");

    if (!response.ok) {
      throw new Error("Server responded with an error");
    }

    const data = await response.json();
    factDisplay.textContent = data.fact;
  } catch (error) {
    factDisplay.textContent = "Couldn't load a fact right now. Try again.";
    console.error(error);
  }
}

if (factBtn) {
  factBtn.addEventListener("click", loadFact);
} else {
  console.warn("fact-btn not found on this page");
}

async function timeSequential() {
  const url = "https://catfact.ninja/fact";
  console.time("sequential");

  const a = await (await fetch(url)).json();
  const b = await (await fetch(url)).json();

  console.timeEnd("sequential");
  console.log("sequential results", a, b);
}

async function timeConcurrent() {
  const url = "https://catfact.ninja/fact";
  console.time("concurrent");

  const [respA, respB] = await Promise.all([fetch(url), fetch(url)]);
  const a = await respA.json();
  const b = await respB.json();

  console.timeEnd("concurrent");
  console.log("concurrent results", a, b);
}

async function runTimingTests() {
  await timeSequential();
  await timeConcurrent();
}