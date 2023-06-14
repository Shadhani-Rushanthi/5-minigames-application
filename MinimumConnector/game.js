
function City(name) {
  this.name = name;
  this.connectors = [];
}

function Connector(city, distance) {
  this.city = city;
  this.distance = distance;
}

function GamePlayer(name) {
  this.name = name;
  this.answers = [];
}

function GameUI() {
  this.cities = [];
  this.startingCity = null;
  this.currentPlayer = null;
}

GameUI.prototype.initializeCities = function() {
  var cityNames = ["City A", "City B", "City C", "City D", "City E"];

  for (var i = 0; i < cityNames.length; i++) {
    var city = new City(cityNames[i]);
    this.cities.push(city);
  }

  for (var i = 0; i < this.cities.length; i++) {
    var city = this.cities[i];
    for (var j = 0; j < this.cities.length; j++) {
      if (i !== j) {
        var distance = getRandomDistance(10, 100);
        var connector = new Connector(this.cities[j], distance);
        city.connectors.push(connector);
      }
    }
  }
};

function getRandomDistance(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

GameUI.prototype.startMinimumConnectorsGame = function() {
  var randomIndex = Math.floor(Math.random() * this.cities.length);
  this.startingCity = this.cities[randomIndex];

    var distancesLabel = document.getElementById("distancesLabel");
  distancesLabel.textContent = "";

  for (var city of this.cities) {
    var cityLabel = document.createElement("div");
    cityLabel.classList.add("city");
    cityLabel.textContent = city.name;

    var connectorsLabel = document.createElement("div");
    connectorsLabel.classList.add("connectors");

    for (var connector of city.connectors) {
      var connectorLabel = document.createElement("span");
      connectorLabel.classList.add("connector");
      connectorLabel.textContent = connector.city.name + " (" + connector.distance + " km)";
      connectorsLabel.appendChild(connectorLabel);
    }

    distancesLabel.appendChild(cityLabel);
    distancesLabel.appendChild(connectorsLabel);
  }

  var startingCityLabel = document.getElementById("startingCityLabel");
  startingCityLabel.textContent = "Starting City: " + this.startingCity.name;

  var playerNameInput = document.getElementById("playerName");
  var startButton = document.getElementById("startButton");
  var answerContainer = document.getElementById("answerContainer");
  var answerLabel = document.getElementById("answerLabel");
  var connectorFieldsContainer = document.getElementById("connectorFields");
  var submitButton = document.getElementById("submitButton");

  startButton.addEventListener("click", () => {
    var playerName = playerNameInput.value.trim();
    if (playerName === "") {
      alert("Please enter a player name.");
      return;
    }

    this.currentPlayer = new GamePlayer(playerName);
    playerNameInput.disabled = true;
    startButton.disabled = true;

    answerLabel.textContent = "Provide the minimum connectors & distances to connect all cities from " +
      this.startingCity.name + ":";

    for (var city of this.cities) {
      if (city !== this.startingCity) {
        var connectorField = document.createElement("input");
        connectorField.type = "text";
        connectorField.placeholder = "Distance to " + city.name;
        connectorFieldsContainer.appendChild(connectorField);
      }
    }

    answerContainer.style.display = "block";
  });

  submitButton.addEventListener("click", () => {
    var connectorFields = connectorFieldsContainer.getElementsByTagName("input");
  
    if (this.areFieldsEmpty(connectorFields)) {
      alert("Please provide all connector distances.");
      return;
    }
  
    var answers = {};
    var index = 0;
    for (var city of this.cities) {
      if (city !== this.startingCity) {
        var distance = parseInt(connectorFields[index].value.trim());
        answers[city.name] = distance;
        index++;
      }
    }
  
    var isValidAnswer = this.validateMinimumConnectorsAnswer(answers);
  
    if (isValidAnswer) {
      this.currentPlayer.answers.push(answers);
      // Save player information to the database using PHP
      savePlayerInformation(this.currentPlayer.name, answers);
      alert("Congratulations! Your answer is correct.");
      this.resetGame();
    } else {
      savePlayerInformation(this.currentPlayer.name, answers);
      alert("Sorry, your answer is incorrect. The correct distances are being filled.");
      this.fillCorrectDistances(answers);
    }
  });
  

};

GameUI.prototype.areFieldsEmpty = function (fields) {
  for (var field of fields) {
    if (field.value.trim() === "") {
      return true;
    }
  }
  return false;
};


GameUI.prototype.validateMinimumConnectorsAnswer = function(answers) {
  if (Object.keys(answers).length !== this.cities.length - 1) {
    return false;
  }

  var visitedCities = new Set();
  visitedCities.add(this.startingCity);

  var minHeap = new PriorityQueue(function(a, b) {
    return a.distance - b.distance;
  });

  var totalDistance = 0;

  try {
    while (visitedCities.size < this.cities.length - 1) {
      for (var visitedCity of visitedCities) {
        for (var connector of visitedCity.connectors) {
          if (!visitedCities.has(connector.city)) {
            minHeap.enqueue(connector);
          }
        }
      }

      var minConnector = null;
      while (!minHeap.isEmpty()) {
        minConnector = minHeap.dequeue();
        if (!visitedCities.has(minConnector.city)) {
          break;
        }
      }

      if (!minConnector) {
        throw new Error('No valid connector found');
      }

      visitedCities.add(minConnector.city);
      totalDistance += minConnector.distance;
    }

    if (visitedCities.size !== this.cities.length - 1) {
      throw new Error('Not all cities are reachable from the starting city');
    }
  } catch (error) {
    return false;
  }

  var answerTotalDistance = this.getAnswerTotalDistance(answers);

  return Math.abs(totalDistance - answerTotalDistance) < 1e-9;
};


GameUI.prototype.getAnswerTotalDistance = function(answers) {
  var totalDistance = 0;
  for (var city of this.cities) {
    if (city !== this.startingCity && answers.hasOwnProperty(city.name)) {
      totalDistance += answers[city.name];
    }
  }
  return totalDistance;
};


GameUI.prototype.getCityDistances = function() {
   var distances = {};
  for (var city of this.cities) {
    distances[city.name] = {};
    for (var connector of city.connectors) {
      distances[city.name][connector.city.name] = connector.distance;
    }
  }
  return distances;

};

GameUI.prototype.resetGame = function() {
   var playerNameInput = document.getElementById("playerName");
  var startButton = document.getElementById("startButton");
  var answerContainer = document.getElementById("answerContainer");
  var connectorFieldsContainer = document.getElementById("connectorFields");

  playerNameInput.value = "";
  playerNameInput.disabled = false;
  startButton.disabled = false;
  answerContainer.style.display = "none";
  connectorFieldsContainer.innerHTML = "";

};

GameUI.prototype.fillCorrectDistances = function(userAnswers) {
    var connectorFieldsContainer = document.getElementById("connectorFields");
  var connectorFields = connectorFieldsContainer.getElementsByTagName("input");
  
  var index = 0;
  for (var city of this.cities) {
    if (city !== this.startingCity) {
      var distance = this.getDistanceToCity(city);
      if (distance !== null) {
        connectorFields[index].value = distance;
        if (userAnswers.hasOwnProperty(city.name) && userAnswers[city.name] !== distance) {
          connectorFields[index].classList.add("incorrect-answer");
        }
      }
      index++;
    }
  }

};

GameUI.prototype.getDistanceToCity = function(city) {
   for (var connector of this.startingCity.connectors) {
    if (connector.city === city) {
      return connector.distance;
    }
  }
  return null;

};

function savePlayerInformation(playerName, answers) {
  var xhr = new XMLHttpRequest();
  var url = "save_player.php"; 

  // Construct the data to be sent
  var data = new FormData();
  data.append('playerName', playerName);
  data.append('answers', JSON.stringify(answers));

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Success, do something if needed
      } else {
        // Error occurred, handle it if needed
      }
    }
  };

  // Send the AJAX request
  xhr.open("POST", url, true);
  xhr.send(data);
}


// Usage:
var gameUI = new GameUI();
gameUI.initializeCities();
gameUI.startMinimumConnectorsGame();


//back to main menu
document.getElementById("backButton").addEventListener('click',()=>{
  window.location.replace("../Home/../index");
})