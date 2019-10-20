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


  //creates sprites as img 
  function placeItem(item) {
    var itemSprite = document.createElement('img');
    itemSprite.setAttribute('src', item.sprite);
    itemSprite.setAttribute('name', item.type);
    return itemSprite
    //weapon.sprite should be just a path to the sprite png

    //element.weapon = weapon;

    //when player is taking the weapon:
    //-remove img
    //-remove reference to weapon object
    //-add weapon object to player inventory
  }


    //adds player to new position
  function appendItem(nameItem, element) {
    element.appendChild(nameItem.image);
    element.classList.remove('Available');
    element.classList.add('Taken');
    element.classList.add('Player');
    nameItem.currentBlock = element;
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
  //adds weapons randomly
  function addWeapon(weapon) {
    var rand = getRandomBlock();
    weapon.currentBlock = rand;
    rand.appendChild(weapon);
    //rand.classList.remove('Available');
    //rand.classList.add('Taken');
    rand.classList.add('Weapon');
    return weapon.currentBlock;
  }
 //places players in random cells 
  function placePlayer(player,miny,maxy){
  var rand = getRandomBlock(minX = 0, maxX = 9, minY = miny, maxY = maxy);
  rand.appendChild(player);
  player.currentBlock = rand;
  rand.classList.remove('Available');
  rand.classList.add('Taken');
  rand.classList.add("Player");
  return player.currentBlock;
  }

  // Classes for player and weapon
  class User {
    constructor(name, health,path,weapon) {
      this.type = name;
      this.health = health;
      this.sprite = path;
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
  startweapon = new Weapon ("Default", 4, null);
  startweapon1 = new Weapon ("Default", 4, null);
  user1 = new User("Zombie", 100,'Imgs/zombie.png',startweapon);
  document.getElementById("nameplayerone").innerHTML = user1.type;
  document.getElementById("healthplayerone").innerHTML = user1.health;
  user2 = new User("Adventurer", 100,'Imgs/adventurer_jump.png',startweapon1);
  document.getElementById("nameplayertwo").innerHTML = user2.type;
  document.getElementById("healthplayertwo").innerHTML = user2.health;
  weapon1 = new Weapon("Pig", 50,'Imgs/pig.png');
  weapon2 = new Weapon("Horse", 30,'Imgs/horse.png');
  weapon3 = new Weapon("Penguin", 10, 'Imgs/penguin.png');
  weapon4 = new Weapon("Dog", 5,'Imgs/dog.png');

  //adds 10 dimmcells over the grid 
  for (var f = 0; f < 10; f++) {
    var rand = getRandomBlock();
    rand.classList.add('dimmcell');
    rand.classList.remove('Available');
    rand.classList.add('Taken');
  }

  //places weapons and player
  function createsImgPositionWeapon (item){
    item.image = placeItem(item);
    item.currentBlock = addWeapon(item.image);
  }

  function createsImgPositionPlayer (item,miny,maxy){
    item.image = placeItem(item);
    item.currentBlock = placePlayer(item.image,miny,maxy);
  }

  createsImgPositionWeapon(weapon1);
  createsImgPositionWeapon(weapon2);
  createsImgPositionWeapon(weapon3);
  createsImgPositionWeapon(weapon4);
  
  createsImgPositionPlayer(user1,0,3);
  createsImgPositionPlayer(user2,6,9);


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

  //creates modal window for fight
  function fightWindow() {
    var modal = document.createElement('div');
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.background = "black";
    modal.style.opacity = "0.6";
    modal.style.position = "fixed";
    modal.style.zIndex = "10";


    var modalContent = document.createElement('div');
    modalContent.style.width = "400px";
    modalContent.style.height = "400px";
    modalContent.style.position = "fixed";
    modalContent.style.top = "40%";
    modalContent.style.bottom = "40%";
    modalContent.style.background = "#F1CAD8";
    modalContent.style.left = "40%";
    modalContent.style.zIndex = "100";
   
    document.getElementById("main").appendChild(modal);
    document.getElementById("main").appendChild(modalContent);
    newSound = new sound('Sound/battle.mp3')
    //newSound.play();
  }


  function fightModeOn() {
      var players = $('div.Taken.highlight.Player').length;
      if (players >= 2) {
          fightWindow();
        }
      }

  //
  function checksWeapon(position,player){
    if (position.classList.contains('Weapon') === true ) {
       if ($(position).children('img').attr('name')== "Pig"){
        player.inventory = weapon1;
      $('img[src*="Imgs/pig.png"]').remove();
      } else if ($(position).children('img').attr('name')== "Horse"){
        player.inventory = weapon2;
      $('img[src*="Imgs/horse.png"]').remove();
      } else if ($(position).children('img').attr('name')== "Penguin"){
        player.inventory = weapon3;
      $('img[src*="Imgs/penguin.png"]').remove();
      }else {
        player.inventory = weapon4;
      $('img[src*="Imgs/dog.png"]').remove();
      }
    }
  }
  var currentPlayer = user1;

  function movePlayer(currentPlayer) {
    let pos = currentPlayer.currentBlock.position;
        neighbours = getNeigbours(pos);
    //checks if more than 2 players on neighbours to start fight
    fightModeOn();
    // move player to highlight cell
    $('div.Available.highlight').click(function onHighlightClick(element) {
      $('div.Available.highlight').off('click');
      var currentPlayerPosition = $(currentPlayer)[0];
      var neighbours = getNeigbours(currentPlayerPosition.currentBlock.position);
          neighbours.forEach(function (element) {
        element.classList.remove('highlight');
        if (element.classList.contains('dimmcell') != true){
          //checksWeapon(element);
          element.classList.remove('Taken');
          element.classList.remove('Player');
          element.classList.add('Available');
        };
      });
      delete currentPlayerPosition;
      checksWeapon(this,currentPlayer);
      //console.log($(this).children('img').attr('name'));
      appendItem(currentPlayer, this);
      //checksWeapon(this);
      $("#weaponplayerone").html(user1.inventory.type);
      $("#weaponplayertwo").html(user2.inventory.type);
      //document.getElementById("weaponplayertwo").innerHTML = user2.inventory.type;
      switchTurn();
      // change player
      // remove event from current
      // add event to new
    });
    //});
  }
  // changes turns between players
  
  function switchTurn() {
    if (currentPlayer == user1) {
      movePlayer(currentPlayer);
      $('#dashTwo').removeClass('active');
      $('#dashOne').addClass('active');
      
      return currentPlayer = user2;

    } else {
      $('#dashOne').removeClass('active');
      movePlayer(currentPlayer);
      $('#dashTwo').addClass('active');
      return currentPlayer = user1;
    }
  }

  switchTurn();


  






}


