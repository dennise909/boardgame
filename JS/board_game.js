window.onload = function () {

  function startGame() {
    let startButton = document.createElement("a");
    startButton.id = "play-but"
    startButton.classList.add("center", "rotate-button")
    let spanButton = document.createElement("span")
    spanButton.id = "button-hover"
    spanButton.classList.add("rotate-button-face")
    let spanButton2 = document.createElement("span")
    spanButton2.id = "button-face-back"
    spanButton2.classList.add("rotate-button-face-back")
    document.getElementById("start-window").appendChild(startButton);
    document.getElementById("play-but").appendChild(spanButton);
    document.getElementById("play-but").appendChild(spanButton2);
    $("#button-hover").html("Play!");
    $("#button-face-back").html("Now!");
    $("#button-face-back").click(function () {
      document.getElementById("main").style.display = "none";
    });

  }
  beginningWindow = new modalWindow("start-window", "main");
  startGame();
  itemImage = document.createElement('img');
  itemImage.setAttribute('src', 'Imgs/pig.png');
  itemImage.id = "itemimg"
  itemImage.style.width = "50%"
  pig = new fightDesign(itemImage, "right", "120px", null, "75px", null, "#start-window")
  $("#itemimg").click(function () {
    if ($(this).hasClass('bounce-top')) {
      $('#itemimg').removeAttr("class", 'bounce-top');
    }
    else {
      $(this).addClass("bounce-top")
    }
  });

  //Creating the grid 
  let width = 10;
  let height = 10;
  let container = document.getElementById('container');

  window.map = new Array(width);

  for (var i = 0; i < 10; i++) {
    window.map[i] = new Array(height);
    for (var j = 0; j < 10; j++) {
      let elem = document.createElement('div');
      container.appendChild(elem);
      elem.className = 'myclass';
      elem.setAttribute('data-row', i);
      elem.setAttribute('data-col', j);
      elem.classList.add('Available');
      elem.position = { x: i, y: j };
      window.map[i][j] = elem;
    }
    let breaker = document.createElement('div');
    container.appendChild(breaker);
    breaker.className = 'clear';
  }

  //creates sprites as img 
  function createsImgItem(item) {
    let itemSprite = document.createElement('img');
    itemSprite.setAttribute('src', item.sprite);
    itemSprite.setAttribute('name', item.type);
    return itemSprite
  }


  //adds player to new position
  function appendItem(nameItem, element, type) {
    element.appendChild(nameItem.image);
    element.classList.remove('Available');
    element.classList.add('Taken');
    element.classList.add(type);
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
  function placePlayer(player, miny, maxy) {
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
    constructor(name, health, path, weapon) {
      this.type = name;
      this.health = health;
      this.sprite = path;
      this.inventory = weapon;
    }
  }

  class Weapon {
    constructor(type, damage, path) {
      this.type = type;
      this.damage = damage;
      this.sprite = path;
    }
  }
  // Creating classes of players
  startweapon = new Weapon("Default", 4, null);
  startweapon1 = new Weapon("Default", 4, null);
  user1 = new User("Zombie", 100, 'Imgs/zombie.png', startweapon);
  document.getElementById("nameplayerone").innerHTML = user1.type;
  document.getElementById("healthplayerone").innerHTML = user1.health;
  user2 = new User("Adventurer", 100, 'Imgs/adventurer_jump.png', startweapon1);
  document.getElementById("nameplayertwo").innerHTML = user2.type;
  document.getElementById("healthplayertwo").innerHTML = user2.health;
  weapon1 = new Weapon("Pig", 50, 'Imgs/pig.png');
  weapon2 = new Weapon("Horse", 30, 'Imgs/horse.png');
  weapon3 = new Weapon("Penguin", 10, 'Imgs/penguin.png');
  weapon4 = new Weapon("Dog", 5, 'Imgs/dog.png');
  document.getElementById("weapondamageplayerone").innerHTML = user1.inventory.damage;
  document.getElementById("weapondamageplayertwo").innerHTML = user2.inventory.damage;

  //adds 10 dimmcells over the grid 
  for (var f = 0; f < 10; f++) {
    var rand = getRandomBlock();
    rand.classList.add('dimmcell');
    rand.classList.remove('Available');
    rand.classList.add('Taken');
  }

  //places weapons and player
  function createsImgPositionWeapon(item) {
    item.image = createsImgItem(item);
    item.currentBlock = addWeapon(item.image);
  }

  function createsImgPositionPlayer(item, miny, maxy) {
    item.image = createsImgItem(item);
    item.currentBlock = placePlayer(item.image, miny, maxy);
  }

  createsImgPositionWeapon(weapon1);
  createsImgPositionWeapon(weapon2);
  createsImgPositionWeapon(weapon3);
  createsImgPositionWeapon(weapon4);

  createsImgPositionPlayer(user1, 0, 3);
  createsImgPositionPlayer(user2, 6, 9);


  function rayCheck(pos, stepX, stepY, steps) {
    var _neighbours = [];
    for (var step = 1; step <= steps; step++) {
      var newX = pos.x + step * stepX;
      var newY = pos.y + step * stepY;
      if ((newX >= 0 && newX < 10) && (newY >= 0 && newY < 10)) {
        var neighbour = window.map[newX][newY];
        if (neighbour.classList.contains('dimmcell') == false) {
          _neighbours.push(neighbour);
        } else {
          break;
        }
      }
    }
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
      neighbours.push(n)
    });
    neighbours2.forEach(n => {
      neighbours.push(n)
    });
    neighbours3.forEach(n => {
      neighbours.push(n)
    });
    neighbours4.forEach(n => {
      neighbours.push(n)
    });
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
    this.play = function () {
      this.sound.play();
    }
    this.stop = function () {
      this.sound.pause();
    }
  }

  //creates modal window for fight
  function modalWindow(id, div) {
    this.modal = document.createElement('div');
    this.modal.style.width = "100%";
    this.modal.style.height = "100%";
    this.modal.style.background = "black";
    this.modal.style.opacity = "0.8";
    this.modal.style.position = "fixed";
    this.modal.style.zIndex = "100";


    this.modalContent = document.createElement('div');
    this.modalContent.id = id
    this.modalContent.style.width = "400px";
    this.modalContent.style.height = "400px";
    this.modalContent.style.position = "fixed";
    this.modalContent.style.top = "50%";
    this.modalContent.style.bottom = "40%";
    this.modalContent.style.backgroundImage = "url('Imgs/background_fight.jpg')";
    this.modalContent.style.backgroundSize = "cover";
    this.modalContent.style.left = "50%";
    this.modalContent.style.zIndex = "100";
    this.modalContent.style.transform = "translate(-50%, -50%)";

    document.getElementById(div).appendChild(this.modal);
    document.getElementById(div).appendChild(this.modalContent);

  }

  function fightDesign(img, position, rightpx, leftpx, bottompx, toppx, window) {
    this.containerImage = document.createElement("div");
    this.containerImage.appendChild(img);
    this.containerImage.style.cssFloat = position;
    this.containerImage.style.position = "absolute";
    this.containerImage.style.bottom = bottompx;
    this.containerImage.style.top = toppx;
    this.containerImage.style.right = rightpx;
    this.containerImage.style.left = leftpx;
    $(window).append(this.containerImage);

  }



  function checkPlayersNeighbour(actPlayer) {
    let activePlay = actPlayer
    var players = $('div.Taken.highlight.Player').length;
    if (players > 0) {
      newFightWindow = new modalWindow("fightWindow", "main2");
      PlayerOne = new fightDesign(user1.image, "left", null, null, "75px", null, "#fightWindow");
      PlayerTwo = new fightDesign(user2.image, "right", "1px", null, "75px", null, "#fightWindow");
      CurrentWeaponPOne = new fightDesign(user1.inventory.image, "left", null, "50px", "75px", null, "#fightWindow");
      CurrentWeaponPTwo = new fightDesign(user2.inventory.image, "right", "50px", null, "75px", null, "#fightWindow");
      scorePlayerOne = document.createElement("div");
      scorePlayerOne.id = "score-play-one"
      scorePlayerOne.classList.add("topleft")
      document.getElementById("fightWindow").appendChild(scorePlayerOne);
      document.getElementById("score-play-one").innerHTML = ("P1 :" + user1.health);
      scorePlayerTwo = document.createElement("div");
      scorePlayerTwo.id = "score-play-two"
      scorePlayerTwo.classList.add("topright")
      document.getElementById("fightWindow").appendChild(scorePlayerTwo);
      document.getElementById("score-play-two").innerHTML = ("P2 :" + user2.health);
      fightModeOn(activePlay);
      //newSound = new sound('Sound/battle.mp3')
      //newSound.play();
    }
  }

  //
  function addWeaponToPlayer(position, player) {
    if (position.classList.contains('Weapon') === true) {
      if ($(position).children('img').attr('name') === weapon1.type) {
        player.inventory = weapon1;
        $('img[src*="Imgs/pig.png"]').remove();
      } else if ($(position).children('img').attr('name') === weapon2.type) {
        player.inventory = weapon2;
        $('img[src*="Imgs/horse.png"]').remove();
      } else if ($(position).children('img').attr('name') === weapon3.type) {
        player.inventory = weapon3;
        $('img[src*="Imgs/penguin.png"]').remove();
      } else {
        player.inventory = weapon4;
        $('img[src*="Imgs/dog.png"]').remove();
      }
      return true
    }
    return false
  }

  var currentPlayer = user1;

  function movePlayer(currentPlayer) {
    let pos = currentPlayer.currentBlock.position;
    neighbours = getNeigbours(pos);
    //checks if more than 2 players on neighbours to start fight
    checkPlayersNeighbour(currentPlayer);
    $('div.Available.highlight').click(function onHighlightClick(element) {
      $('div.Available.highlight').off('click');

      var currentPlayerPosition = $(currentPlayer)[0];
      // clear current position block's classes
      if (currentPlayerPosition.currentBlock.classList.contains('dimmcell') != true) {
        currentPlayerPosition.currentBlock.classList.remove('Taken');
        currentPlayerPosition.currentBlock.classList.remove('Player');
        currentPlayerPosition.currentBlock.classList.add('Available');
      };

      // clear highlight
      var neighbours = getNeigbours(currentPlayerPosition.currentBlock.position);
      neighbours.forEach(function (element) {
        element.classList.remove('highlight');
      });

      // if player managed to get a weapon and he already has one
      // then put his previous one at the currentPlayerPosition
      var previousWeapon = currentPlayer.inventory;
      previousPosition = currentPlayerPosition.currentBlock
      var didGetAWeapon = addWeaponToPlayer(this, currentPlayer);
      if (previousWeapon.type !== "Default" && didGetAWeapon === true) {
        previousPosition.appendChild(previousWeapon.image);
        previousPosition.classList.add('Weapon');
      }
      appendItem(currentPlayer, this, "Player");
      $("#weaponplayerone").html(user1.inventory.type);
      $("#weapondamageplayerone").html(user1.inventory.damage);
      $("#weaponplayertwo").html(user2.inventory.type);
      $("#weapondamageplayertwo").html(user2.inventory.damage);
      switchTurn();

      delete currentPlayerPosition;
    });
  }
  // changes turns between players
  function switchTurn() {
    if (currentPlayer == user1) {
      movePlayer(currentPlayer);
      $('#dashTwo').removeClass('active');
      $('#dashOne').addClass('active');
      //fightModeOn(currentPlayer);
      return currentPlayer = user2;

    } else {
      $('#dashOne').removeClass('active');
      movePlayer(currentPlayer);
      $('#dashTwo').addClass('active');
      //fightModeOn(currentPlayer);
      return currentPlayer = user1;
    }
  }

  switchTurn();


  function finishfight() {
    //just unattach events
    $("[name='Adventurer']").off('click');
    $("[name='Zombie']").off('click');
    restartGame()
  }

  function attackUser(attacker, defender) {
    let newHealth = defender.health - attacker.inventory.damage;
    if (newHealth <= 0)
      newHealth = 0;
    defender.health = newHealth;
    if (attacker === user1) {
      document.getElementById("score-play-two").innerHTML = ("P2 :" + defender.health);
    } else {
      document.getElementById("score-play-one").innerHTML = ("P1 :" + defender.health);
    }
    checkFight();
  }

  function checkFight() {
    if (user1.health <= 0) {
      winnerPlayTwo = document.createElement("div");
      winnerPlayTwo.id = "win-play-two"
      winnerPlayTwo.classList.add("topcenter")
      document.getElementById("fightWindow").appendChild(winnerPlayTwo);
      document.getElementById("win-play-two").innerHTML = ("Player two wins!!!!");
      console.log("Player two wins")
      finishfight();
    }
    else if (user2.health <= 0) {
      winnerPlayOne = document.createElement("div");
      winnerPlayOne.id = "win-play-one"
      winnerPlayOne.classList.add("topcenter")
      document.getElementById("fightWindow").appendChild(winnerPlayOne);
      document.getElementById("win-play-one").innerHTML = ("Player one wins!!!!");
      finishfight();
    } else {
      if (currentActPlayer === user1) {
        currentActPlayer = user2;
      } else {
        currentActPlayer = user1;
      }
      //currentActPlayer = currentActPlayer === user1 ? user2 : user1;
    }
  }
  function fightModeOn(activePlayer) {
    currentActPlayer = activePlayer
    $("[name='Adventurer']").click(function () {
      if (currentActPlayer === user1) {
        attackUser(user1, user2);
      }
    });

    $("[name='Zombie']").click(function () {
      if (currentActPlayer === user2) {
        attackUser(user2, user1);
      }
    });
  }

  function restartGame() {
    let endButton = document.createElement("a");
    endButton.id = "end-but"
    endButton.classList.add("center", "rotate-button")
    endButton.classList.add("slide-in-top")
    let restartButton = document.createElement("span")
    restartButton.id = "end-button-hover"
    restartButton.classList.add("rotate-button-face")
    let restartButton2 = document.createElement("span")
    restartButton2.id = "end-button-face-back"
    restartButton2.classList.add("rotate-button-face-back")
    document.getElementById("fightWindow").appendChild(endButton);
    document.getElementById("end-but").appendChild(restartButton);
    document.getElementById("end-but").appendChild(restartButton2);
    $("#end-button-hover").html("Try Again!");
    $("#end-button-face-back").html("Again!");
    $("#end-button-hover").click(function () {
      document.location.reload();
    })

  }



}



 










