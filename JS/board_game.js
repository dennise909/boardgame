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
  playerOne = createWeapons('zombie', 'Imgs/zombie.png');
  playerTwo = createWeapons('adventurer', 'Imgs/adventurer_jump.png');

  //creates sprites as img 
  function createWeapons(nameAnimal1, sourcePath) {
    var nameAnimal = document.createElement('img');
    nameAnimal.setAttribute('src', sourcePath);
    nameAnimal.setAttribute('name', nameAnimal1);
    return nameAnimal
  }

  function placeWeapon(weapon) {
    var weaponSprite = document.createElement('img');
    weaponSprite.setAttribute('src', weapon.sprite);
    return weaponSprite
    //weapon.sprite should be just a path to the sprite png

    //element.weapon = weapon;

    //when player is taking the weapon:
    //-remove img
    //-remove reference to weapon object
    //-add weapon object to player inventory
  }


    //gets position of the player
  function appendItem(nameItem, element) {
    element.appendChild(nameItem);
    element.classList.remove('Available');
    element.classList.add('Taken');
    element.classList.add('Player');
    nameItem.currentBlock = element;
  }

  //adds weapons randomly
  function addWeapon(weapon) {
    var rand = getRandomBlock();
    weapon.currentBlock = rand;
    rand.appendChild(weapon);
    //rand.classList.remove('Available');
    //rand.classList.add('Taken');
    rand.classList.add('Weapon');
    return weapon.currentBlock
  }

  //gets random block on the grid
  function getRandomBlock(minX = 0, maxX = 9, minY = 0, maxY = 9) {
    var rand = null;
    do {
      var x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      var y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
      rand = window.map[x][y];
    } while (rand.classList.contains('Available') == false);
    return rand;
  }

 //places players in random cells 
  function placePlayer(player,minx,maxx,miny,maxy){
  var rand = getRandomBlock(minX = minx, maxX = maxx, minY = miny, maxY = maxy);
  rand.appendChild(player);
  player.currentBlock = rand;
  rand.classList.remove('Available');
  rand.classList.add('Taken');
  rand.classList.add("Player");
  }

  // Classes for player and weapon
  class User {
    constructor(name, health,path,weapon) {
      this.name = name;
      this.health = health;
      this.sprite = path;
      this.image = placeWeapon(this);
      this.inventory = weapon;
    }
  }

  class Weapon {
    constructor(type, damage,path) {
      this.type = type;
      this.damage = damage;
      this.sprite = path;
    }
}
// Creating classes of players
  startweapon = new Weapon ("default", 4, null);
  user1 = new User("Zombie", 100,'Imgs/zombie.png',startweapon);
  document.getElementById("nameplayerone").innerHTML = user1.name;
  document.getElementById("healthplayerone").innerHTML = user1.health;
  user2 = new User("Adventurer", 100,'Imgs/adventurer_jump.png',startweapon);
  document.getElementById("nameplayertwo").innerHTML = user2.name;
  document.getElementById("healthplayertwo").innerHTML = user2.health;
  weapon1 = new Weapon("pig", 50,'Imgs/pig.png');
  weapon2 = new Weapon("horse", 30,'Imgs/horse.png');
  weapon3 = new Weapon("penguin", 10, 'Imgs/penguin.png');
  weapon4 = new Weapon("dog", 5,'Imgs/dog.png');

  //adds 10 dimmcells over the grid 
  for (var f = 0; f < 10; f++) {
    var rand = getRandomBlock();
    rand.classList.add('dimmcell');
    rand.classList.remove('Available');
    rand.classList.add('Taken');
  }

  //places weapons and player

  function createsImgPosition (weapon){
    weapon.image = placeWeapon(weapon);
    weapon.currentBlock = addWeapon(weapon.image);
  }

  createsImgPosition(weapon1);
  createsImgPosition(weapon2);
  createsImgPosition(weapon3);
  createsImgPosition(weapon4);
  
  placePlayer(user1.image,0,9,0,3);
  placePlayer(user2.image,0,9,6,9);


  function rayCheck(pos, stepX, stepY, steps) {
    var _neighbours = [];
    for (var step = 1; step <= steps; step++) {
      var newX = pos.x + step * stepX;
      var newY = pos.y + step * stepY;
      if ((newX >= 0 && newX < 10) && (newY >= 0 && newY < 10)){
        var neighbour = window.map[newX][newY];
        if (neighbour.classList.contains('dimmcell') == false) {
        _neighbours.push(neighbour);
      }else {
        break;
      }    
    }}
   return _neighbours;
  }
  
  //gets neighbors from position and highlights
  function getNeigbours(pos) {
      var neighbours = [];
      var maxSteps = 3;
      // join results from all 4 rays and that's all
         neighbours1 = rayCheck(pos, 1, 0, maxSteps); // right
         neighbours2 = rayCheck(pos, -1, 0, maxSteps);
         neighbours3 = rayCheck(pos, 0, 1, maxSteps);
         neighbours4 = rayCheck(pos, 0, -1, maxSteps);
        neighbours1.forEach(n => {
        neighbours.push(n)});
        neighbours2.forEach(n => {
        neighbours.push(n)});
        neighbours3.forEach(n => {
        neighbours.push(n)});
        neighbours4.forEach(n => {
        neighbours.push(n)}); 
        neighbours.forEach(function (element) {
        element.classList.add('highlight');
        });  
    return neighbours;
  }

  // Fighting mode 
  //Creates new window for the fight

  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

  function fightWindow() {
    var myWindow = window.open("", "MsgWindow", "width=200,height=100");
    myWindow.document.write("We will fight here");
    newSound = new sound('Sound/battle.mp3')
    newSound.play();
    //window.onbeforeunload = newSound.stop();
  }


  function fightModeOn() {
      var players = $('div.Taken.highlight.Player').length;
      if (players >= 2) {
          fightWindow();
        }
      }

  var currentPlayer = user1.image;

  function movePlayer(currentPlayer) {
    let pos = currentPlayer.currentBlock.position;
        neighbours = getNeigbours(pos);
    //checks if more than 2 players on neighbours to start fight
    fightModeOn();
    // move player to highlight cell
    $('div.Available.highlight').click(function onHighlightClick(element) {
      $('div.Available.highlight').off('click');
      //if (element.classList.contains('Weapon') == true ){
        //currentPlayer.inventory = weapon1;
      //}
      var currentPlayerPosition = $(currentPlayer)[0];
      var neighbours = getNeigbours(currentPlayerPosition.currentBlock.position);
          neighbours.forEach(function (element) {
        
        element.classList.remove('highlight');
        if (element.classList.contains('Weapon') == true ){
          currentPlayer.inventory = weapon1;
        }
        if (element.classList.contains('dimmcell') != true){
          element.classList.remove('Taken');
          element.classList.remove('Player');
          element.classList.add('Available');
        };
      });
      currentPlayerPosition.remove();
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
    if (currentPlayer == user1.image) {
      movePlayer(currentPlayer);
      $('#dashTwo').removeClass('active');
      $('#dashOne').addClass('active');
      return currentPlayer = user2.image;

    } else {
      $('#dashOne').removeClass('active');
      movePlayer(currentPlayer);
      $('#dashTwo').addClass('active');
      return currentPlayer = user1.image;
    }
  }

  switchTurn();


  






}


