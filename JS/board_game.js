window.onload = function () {
  //Creating the grid 
  var width = 10;
  var height = 10;
  var container = document.getElementById('container');

  window.map = new Array(width);

  for (var i = 0; i < 10; i++) {
    window.map[i] = new Array(height);
    for (var j = 0; j < 10; j++) {
      var elem = document.createElement('div');
      container.appendChild(elem);
      elem.className = 'myclass';
      elem.setAttribute('data-row', i);
      elem.setAttribute('data-col', j);
      elem.classList.add('Available');
      elem.position = { x: i, y: j };
      window.map[i][j] = elem;
    }
    var breaker = document.createElement('div');
    container.appendChild(breaker);
    breaker.className = 'clear';
  }

  //Applying images to create weapons and players
  var weaponOne = createWeapons('horse', 'Imgs/horse.png');
  weaponTwo = createWeapons('pig', 'Imgs/pig.png');
  weaponTree = createWeapons('dog', 'Imgs/dog.png');
  weaponFour = createWeapons('penguin', 'Imgs/penguin.png');
  playerOne = createWeapons('zombie', 'Imgs/zombie.png');
  playerTwo = createWeapons('adventurer', 'Imgs/adventurer_jump.png');

  function createWeapons(nameAnimal1, sourcePath) {
    var nameAnimal = document.createElement('img');
    nameAnimal.setAttribute('src', sourcePath);
    nameAnimal.setAttribute('name', nameAnimal1);
    return nameAnimal
  }

  function appendItem(nameItem, element) {
    element.appendChild(nameItem);
    element.classList.remove('Available');
    element.classList.add('Taken');
    nameItem.currentBlock = element;
  }

  function Addweapon(weapon) {
    var rand = getRandomBlock();
    rand.appendChild(weapon);
    rand.classList.remove('Available');
    rand.classList.add('Taken');
    var rand = randomNumAvailable();
    rand.appendChild(weapon);
    rand.classList.remove('Available');
    rand.classList.add('Taken');
  }

  Addweapon(weaponOne);
  Addweapon(weaponTwo);
  Addweapon(weaponTree);
  Addweapon(weaponFour);

  function randomNumAvailable() {
    availableCells = $('div.Available');
    var random = Math.floor(Math.random() * availableCells.length);
    return availableCells[random];
  }

  //gets random position
  function getRandomBlock(minX = 0, maxX = 9, minY = 0, maxY = 9) {
    var rand = null;
    do {
      var x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      var y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
      rand = window.map[x][y];
    } while (rand.classList.contains('Available') == false);
    return rand;
  }

  //adds dimmcells 
  for (var f = 0; f < 10; f++) {
    var rand = getRandomBlock();
    rand.classList.add('dimmcell');
    rand.classList.remove('Available');
    rand.classList.add('Taken');
  }

  //places players in random cells 
  var rand = getRandomBlock(minX = 0, maxX = 9, minY = 0, maxY = 3);
  rand.appendChild(playerOne);
  playerOne.currentBlock = rand;
  rand.classList.remove('Available');
  rand.classList.add('Taken');

  var rand = getRandomBlock(minX = 0, maxX = 9, minY = 6, maxY = 9);
  rand.appendChild(playerTwo);
  playerTwo.currentBlock = rand;
  rand.classList.remove('Available');
  rand.classList.add('Taken');

  //gets neighbors from position
  function getNeigbours(pos) {
    var neighbours = [];
    var maxSteps = 3;
    for (var _x = -maxSteps; _x <= maxSteps; _x++) {
      if (pos.x + _x >= 0 && pos.x + _x < 10) {
        var neighbour = window.map[pos.x + _x][pos.y];
        neighbours.push(neighbour);
      }
    }
    for (var _y = -maxSteps; _y <= maxSteps; _y++) {
      if (pos.y + _y >= 0 && pos.y + _y < 10) {
        var neighbour = window.map[pos.x][pos.y + _y];
        neighbours.push(neighbour);
      }
    }
    return neighbours;
  }

  var currentPlayer = playerOne;

  function movePlayer(currentPlayer) {
    let pos = currentPlayer.currentBlock.position;
    var neighbours = getNeigbours(pos);
    neighbours.forEach(function (element) {
      element.classList.add('highlight');
    });
    // move player to highlight cell
    $('div.Available.highlight').click(function onHighlightClick() {
      $('div.Available.highlight').off('click');
      var currentPlayerPosition = $(currentPlayer)[0];
      var neighbours = getNeigbours(currentPlayerPosition.currentBlock.position);
      neighbours.forEach(function (element) {
        element.classList.remove('highlight');
        if (element.classList.contains('dimmcell') != true);
        element.classList.remove('Taken');
        element.classList.add('Available');
      });
      currentPlayerPosition.remove();
      //$('div.myclass').removeClass('highlight');
      appendItem(currentPlayer, this);
      switchTurn();
      // change player
      // remove event from current
      // add event to new
    });
    //});
  }

  // changes turns between players
  function switchTurn() {
    if (currentPlayer == playerOne) {
      movePlayer(currentPlayer);
      $('#dashTwo').removeClass('active');
      $('#dashOne').addClass('active');
      return currentPlayer = playerTwo;

    } else {
      $('#dashOne').removeClass('active');
      movePlayer(currentPlayer);
      $('#dashTwo').addClass('active');
      return currentPlayer = playerOne;
    }
  }

  switchTurn();
// Classes for player and weapon

class User {
  constructor(name,health) {
    this.name = name;
    this.health = health;
  }
}

class Weapon {
  constructor(type,damage) {
    this.type = type;
    this.damage = damage;
  }
}

user1 = new User ("zombie", 100);


// Classes for player and weapon

/* 
class User {
  constructor(name,health) {
    this.name = name;
    this.health = health;
  }
}

class Weapon {
  constructor(type,damage,nameWeapon) {
    this.type = type;
    this.damage = damage;
    this.sprite = Addweapon(nameWeapon);
  }
}

user1 = new User ("zombie", 100,);
user2 = new User ("adventurer",100);
weapon1 = new Weapon ("pig",50,weaponOne);
weapon2 = new Weapon ("horse",30,weaponTwo);
weapon3 = new Weapon ("penguin",10,weaponTree);
weapon4 = new Weapon ("dog",5,weaponFour);

// Fighting mode 

//Creates new window for the fight
function fightWindow() {
  var myWindow = window.open("", "MsgWindow", "width=200,height=100");
  myWindow.document.write("We will fight here");
}


function fightModeOn(){
  neighbours.forEach(function (element) {
    if (element.classList.contains('adventurer') == true) {
      fightWindow();
    }
  });
}
*/










}


