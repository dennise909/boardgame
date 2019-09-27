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

  //getPathFindingMap()
  //{
  // goes through map and check classes. if no wrong classes = 0, if not 1
  // return map;
  //}

  //Applying images to create weapons and players
  var divs = document.querySelectorAll(".myclass");
  weaponOne = createWeapons('horse', 'Imgs/horse.png');
  weaponTwo = createWeapons('pig', 'Imgs/pig.png');
  weaponTree = createWeapons('dog', 'Imgs/dog.png');
  weaponFour = createWeapons('penguin', 'Imgs/penguin.png');
  playerOne = createWeapons('zombie', 'Imgs/zombie.png');
  playerTwo = createWeapons('adventurer', 'Imgs/adventurer_jump.png');
  rand = randomNum();


  function randomNum() {
    var random = Math.floor(Math.random() * divs.length);
    return divs[random];
  }

  function createWeapons(nameAnimal1, sourcePath) {
    var nameAnimal = document.createElement('img');
    nameAnimal.setAttribute('src', sourcePath);
    nameAnimal.setAttribute('name', nameAnimal1);
    return nameAnimal
  }

  function appendWeapon(nameWeapon, element) {
    element.appendChild(nameWeapon);
    element.classList.remove('Available');
    element.classList.add('Taken');
    nameWeapon.currentBlock = element;
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

  function Addweapon2(weapon) {
    var rand = randomNum();
    do {
      rand.appendChild(weapon);
      rand.classList.remove('Available');
      rand.classList.add('Taken');
    } while (rand.classList.contains('Available') == true);
  }


  Addweapon(weaponOne);
  Addweapon(weaponTwo);
  Addweapon(weaponTree);
  Addweapon(weaponFour);

  function randomNumAvailable() {
    $availableCells = $('div.Available');
    var random = Math.floor(Math.random() * $availableCells.length);
    return $availableCells[random];
  }
  /*
  var rand = randomNumAvailable();
    rand.appendChild(playerOne);
    rand.classList.remove('Available');
    rand.classList.add('Taken');*/
  function getRandomBlock(minX = 0, maxX = 9, minY = 0, maxY = 9) {
    var rand = null;
      do {
        var x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        var y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
        rand = window.map[x][y];
      } while (rand.classList.contains('Available') == false);
      return rand;
  }

  for (var f = 0; f < 10; f++) {
    var rand = getRandomBlock();
    rand.classList.add('dimmcell');
    rand.classList.remove('Available');
    rand.classList.add('Taken');
  }

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

  for (var f = 0; f < 10; f++) {
    var rand = getRandomBlock();
    rand.classList.add('dimmcell');
    rand.classList.remove('Available');
    rand.classList.add('Taken');
  }

  var availableCells = $('div.Available');
  newAvailable = [];
  for (var h = 0; h < availableCells.length; h++) {
    por = availableCells[h].position;
    if (por.x < 10 && por.y < 4) {
      newAvailable.push(por);
    }
  }

  function randomNumSet(number) {
    var random = Math.floor(Math.random() * number) + 1
    return random
  }

  var availableCells = $('div.Available');
  newAvailable = [];
  for (var h = 0; h < availableCells.length; h++) {
    por = availableCells[h].position;
    if (por.x < 10 && por.y < 4) {
      newAvailable.push(por);
    }
  }

  function getNeigbours(pos) {
    var neighbours = [];
    var maxSteps = 3;
    for (var _x = -maxSteps; _x < maxSteps; _x++) {
      if (pos.x + _x >= 0 && pos.x + _x < 10) {
        var neighbour = window.map[pos.x + _x][pos.y];
        neighbours.push(neighbour);
      }
    }   
    for (var _y = -maxSteps; _y < maxSteps; _y++) {
      if (pos.y + _y >= 0 && pos.y + _y < 10) {
        var neighbour = window.map[pos.x][pos.y + _y];
        neighbours.push(neighbour);
      }
    }
    return neighbours;
  }

  var currentPlayer = playerOne;
  
  $(currentPlayer).click(function () {
    let pos = this.currentBlock.position;
    var neighbours = getNeigbours(pos);
    neighbours.forEach(function (element) {
      element.classList.add('highlight');
    });
    // move player
    $('div.Available.highlight').click(function onHighlightClick() {
      $('div.Available.highlight').off('click');
      var currentPlayerPosition = $(currentPlayer)[0];
      var neighbours = getNeigbours(currentPlayerPosition.currentBlock.position);
      neighbours.forEach(function (element) {
        element.classList.remove('highlight');
      });
  
      currentPlayerPosition.remove();
      //$('div.myclass').removeClass('highlight');
      appendWeapon(currentPlayer, this);


      // change player
      // remove event from current
      // add event to new
    });
  });








}


