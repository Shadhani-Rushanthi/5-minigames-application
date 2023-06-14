const cities = [
  { name: "City A", distance: {} },
  { name: "City B", distance: {} },
  { name: "City C", distance: {} },
  { name: "City D", distance: {} },
  { name: "City E", distance: {} }
];

// Add connections and distances between cities
cities[0].distance = { 1: getRandomDistance(), 2: getRandomDistance(), 3: getRandomDistance() };
cities[1].distance = { 0: cities[0].distance[1], 2: getRandomDistance() };
cities[2].distance = { 0: cities[0].distance[2], 1: cities[1].distance[2], 3: getRandomDistance(), 4: getRandomDistance() };
cities[3].distance = { 0: cities[0].distance[3], 2: cities[2].distance[3], 4: getRandomDistance() };
cities[4].distance = { 2: cities[2].distance[4], 3: cities[3].distance[4] };

// Function to get a random distance between 5 and 50 kilometers
function getRandomDistance() {
  return Math.floor(Math.random() * (50 - 5 + 1) + 5);
}
  // Function to populate the city options in the HTML select element
  function populateCityOptions() {
    const selectElement = document.getElementById("start-city");
  
    // Generate a random index for the starting city
    const startCityIndex = Math.floor(Math.random() * cities.length);
  
    // Remove the previously created options
    selectElement.innerHTML = "";
  
    // Create a single option for the starting city
    const option = document.createElement("option");
    option.value = startCityIndex;
    option.text = cities[startCityIndex].name;
    selectElement.appendChild(option);
  }
  
  function resetAnswers() {
    var answerInputs = document.querySelectorAll('#cities input');
    for (var i = 0; i < answerInputs.length; i++) {
      answerInputs[i].value = '';
    }
  
    var resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = '';
  }

// Function to draw the graph on the canvas
function drawGraph() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
  
    const xMargin = 50;
    const yMargin = 50;
    const graphWidth = canvas.width - 2 * xMargin;
    const graphHeight = canvas.height - 2 * yMargin;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw city nodes
    const nodeRadius = 15; // Increase the node radius for larger circles
    const cityLabels = ["A", "B", "C", "D", "E"];
    const startCityIndex = parseInt(document.getElementById("start-city").value);
  
    for (let i = 0; i < cities.length; i++) {
      const xPos = xMargin + Math.random() * graphWidth;
      const yPos = yMargin + Math.random() * graphHeight;
      cities[i].x = xPos;
      cities[i].y = yPos;
  
      ctx.beginPath();
      ctx.arc(xPos, yPos, nodeRadius, 0, 2 * Math.PI);
      
      if (i === startCityIndex) {
        ctx.fillStyle = "green";
      } else {
        ctx.fillStyle = "blue";
      }
      
      ctx.fill();
      ctx.stroke();
  
      ctx.fillStyle = "white";
      ctx.fillText(cityLabels[i], xPos - 5, yPos + 4);
    }
  
    // Draw connections between cities and display distances
    ctx.strokeStyle = "black";
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
  
    for (let i = 0; i < cities.length; i++) {
      const fromCity = cities[i];
  
      for (const neighbor in fromCity.distance) {
        const toCity = cities[neighbor];
        const distance = fromCity.distance[neighbor];
  
        if (i < neighbor) { // Only draw connections once
          const angle = Math.atan2(toCity.y - fromCity.y, toCity.x - fromCity.x);
          const labelX = (fromCity.x + toCity.x) / 2 + Math.cos(angle) * 20;
          const labelY = (fromCity.y + toCity.y) / 2 + Math.sin(angle) * 20;
  
          ctx.beginPath();
          ctx.moveTo(fromCity.x, fromCity.y);
          ctx.lineTo(toCity.x, toCity.y);
          ctx.stroke();
  
          ctx.fillText(distance + " km", labelX, labelY);
        }
      }
  
      if (i === startCityIndex) {
        ctx.fillText("Start", fromCity.x - 20, fromCity.y - 20);
      }
    }
  }
  
  
  
  
  // Function to find the shortest path using Dijkstra's algorithm
  function findShortestPath(startCityIndex) {
    const distances = new Array(cities.length).fill(Number.MAX_VALUE);
    const visited = new Array(cities.length).fill(false);
    const parent = new Array(cities.length).fill(-1);
  
    distances[startCityIndex] = 0;
  
    for (let i = 0; i < cities.length - 1; i++) {
      const minDistanceIndex = findMinDistance(distances, visited);
      visited[minDistanceIndex] = true;
  
      for (const neighbor in cities[minDistanceIndex].distance) {
        const distance = cities[minDistanceIndex].distance[neighbor];
        const totalDistance = distances[minDistanceIndex] + distance;
  
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          parent[neighbor] = minDistanceIndex;
        }
      }
    }
  
    return { distances, parent };
  }
  
  // Function to find the index of the node with the minimum distance
  function findMinDistance(distances, visited) {
    let minDistance = Number.MAX_VALUE;
    let minDistanceIndex = -1;
  
    for (let i = 0; i < distances.length; i++) {
      if (visited[i] === false && distances[i] <= minDistance) {
        minDistance = distances[i];
        minDistanceIndex = i;
      }
    }
  
    return minDistanceIndex;
  }
  function startGameMenu() {
    var name = document.getElementById("name").value;
    if (name.trim() !== "") {
      document.getElementById("menu-container").style.display = "none";
      document.getElementById("game-container").style.display = "block";
      // Additional logic or code to start the game
    } else {
      alert("Please enter your name.");
    }
  }
// Function to start the game
function startGame() {
  const startCityIndex = document.getElementById("start-city").value;
  const startCity = cities[startCityIndex];

  // Display the question container
  const questionContainer = document.getElementById("question-container");
  questionContainer.style.display = "block";

  // Draw the graph on the canvas
  drawGraph();

  // Populate the cities in the question container
  const citiesContainer = document.getElementById("cities");
  citiesContainer.innerHTML = "";

  for (let i = 0; i < cities.length; i++) {
    if (i !== startCityIndex) {
      const city = cities[i];
      const cityDiv = document.createElement("div");
      cityDiv.innerHTML = `${city.name}: <input type="number" id="city-${i}" min="0" max="100" required>`;
      citiesContainer.appendChild(cityDiv);
    }
  }
  
// Hide the "Next Level" button
const nextLevelButton = document.getElementById("next-level-button");
nextLevelButton.style.display = "none";

nextLevelButton.addEventListener("click", startNextLevel);

}

// Automatically start the game when the page loads
window.onload = function() {
  populateCityOptions();
  startGame();
};

let totalPoints = 0; // Declare totalPoints outside the functions to maintain its value

function startNextLevel() {
  // Reset the game state
  const questionContainer = document.getElementById("question-container");
  questionContainer.style.display = "none"; // Hide the question container

  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = ""; // Clear the result container

  // Clear the user's input for the current level
  const citiesContainer = document.getElementById("cities");
  citiesContainer.innerHTML = "";

  // Reset the canvas
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Start the next level
  populateCityOptions();
  startGame();
}

// Function to check the answers
// Function to check the answers
function checkAnswers() {
  const startCityIndex = document.getElementById("start-city").value;
  const { distances, parent } = findShortestPath(parseInt(startCityIndex));

  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = "";

  let totalDistance = 0;
  let eachpoint = 0;
  let answers = [];

  for (let i = 0; i < cities.length; i++) {
    if (i !== parseInt(startCityIndex)) {
      const city = cities[i];
      const userAnswer = parseInt(document.getElementById(`city-${i}`).value);

      if (userAnswer === distances[i]) {
        resultContainer.innerHTML += `${city.name}: Correct!<br>`;
        eachpoint += 10;
        totalPoints += 10; // Increment totalPoints by 10 for each correct answer
      } else {
        resultContainer.innerHTML += `${city.name}: Incorrect! The correct distance is ${distances[i]} km.<br>`;
      }

      answers.push({ city: city.name, userAnswer });
      totalDistance += distances[i];
    }
  }

  const scoreContainer = document.getElementById("score-container");
  scoreContainer.innerHTML = `Total Points: ${totalPoints}`;
  const eachscoreContainer = document.getElementById("eachscore-Container");
  eachscoreContainer.innerHTML = `Round Points: ${eachpoint}`;

  // Display the "Next Level" button
  const nextLevelButton = document.getElementById("next-level-button");
  nextLevelButton.style.display = "inline-block";

  resultContainer.innerHTML += `Total distance: ${totalDistance} km.`;

  // Send the data to the server
  const username = document.getElementById("name").value;
  const data = {
    username: username,
    totalPoints: eachpoint,
    answers: answers
  };

  // Send the data to the server
  const xhr = new XMLHttpRequest();
  const url = "save_data.php";

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
    }
  };

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
}

  // Populate the city options when the page loads
  populateCityOptions();

  //back to main menu
document.getElementById("backButton").addEventListener('click',()=>{
  window.location.replace("../index");
})