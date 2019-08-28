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
      elem.position = {x: i, y: j};
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
  playerTwo = createWeapons('zombie', 'Imgs/adventurer_jump.png');
  rand = randomNum();


  function randomNum() {
    var random = Math.floor(Math.random() * divs.length);
    return divs[random];
  }

  function createWeapons(nameAnimal, sourcePath) {
    var nameAnimal = document.createElement('img');
    nameAnimal.setAttribute('src', sourcePath);
    return nameAnimal
  }

  function appendWeapon(nameWeapon) {
    let rand = randomNum();
    rand.appendChild(nameWeapon);

  }
  function Addweapon(weapon) {
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


  //Adding dimmcells



  //var available = false;
  //while (!available) {
  //keep trying


  // i have a field which is available
   /*
  for (var f=0; f < 10; f++){  
    var rand = randomNum(); 
    if (rand.classList.contains('Available') == true){
    rand.classList.add('dimmcell'); 
    rand.classList.remove('Available');
    rand.classList.add('Taken');
    }else{
      var rand = randomNum();
        }
      }  

  //retry 
  /*
  function findAvailable(checkItem) {
    var result = null;
    var retry = 5;
    do (rand = randomNum())
    while(rand.classList.contains('Taken')== true)
      result = "Taken"
      
    return result;
  }

  var rand = findAvailable
  //add dimmcell
 

  for (var f=0; f < 10; f++){
    while (rand.classList.contains('Avalable')){
        var rand = randomNum();
        rand.classList.add('dimmcell');
        rand.classList.remove('Available');
        rand.classList.add('Taken') }};
    
  var g = 0;
  do {
    do{
      var rand = randomNum();
      rand.classList.add('dimmcell');
      rand.classList.remove('Available');
      rand.classList.add('Taken')}

    while(rand.classList.contains('Avalable'));
    g++;
  }
  while (g < 10);       
    */       

  /*
function getGrid() {
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var elem = window.map[i][j];
      if elem.hasCLass(avialable)
        grid[i][j] = 0;
      else
        grid[i][j] - 1;
    }


  //Adding weapons 
  do {
      var rand = randomNum();
      Addweapon(weaponOne);
      rand.classList.remove('Available');
      rand.classList.add('Taken');
    } while (rand.classList.contains('Available') == true)
*/

  Addweapon(weaponOne);
  Addweapon(weaponTwo);
  Addweapon(weaponTree);
  Addweapon(weaponFour);


  $('div.myclass').click(function () {
    let pos = this.position;
    console.log(pos);
    var neighbours = [];
    
    if (pos.x - 1 >= 0){
        var neighbour = window.map[pos.x - 1][pos.y];
        var neighbour1 = window.map[pos.x - 2][pos.y];
        var neighbour2 = window.map[pos.x - 3][pos.y];
        var neighbour3 = window.map[pos.x + 1][pos.y];
        var neighbour4 = window.map[pos.x + 2][pos.y];
        var neighbour5 = window.map[pos.x + 3][pos.y];
          neighbours.push(neighbour,neighbour1,neighbour2,neighbour3,neighbour4,neighbour5);
          neighbours.forEach(function(element) {
            element.classList.add('highlight');
         }); 
      }
    if (pos.y - 1 >= 0){
      var neighbour = window.map[pos.x][pos.y - 1];
      var   neighbour1 = window.map[pos.x][pos.y - 2];
      var   neighbour2 = window.map[pos.x][pos.y - 3];
      var   neighbour3 = window.map[pos.x][pos.y + 1];
      var   neighbour4 = window.map[pos.x][pos.y + 2];
      var   neighbour5 = window.map[pos.x][pos.y + 3];
         neighbours.push(neighbour,neighbour1,neighbour2,neighbour3,neighbour4,neighbour5);
         neighbours.forEach(function(element) {
          element.classList.add('highlight');
        });}

    if (pos.x + 1 < 10){
        var neighbour = window.map[pos.x - 1][pos.y];
        var neighbour1 = window.map[pos.x - 2][pos.y];
        var neighbour2 = window.map[pos.x - 3][pos.y];
        var neighbour3 = window.map[pos.x + 1][pos.y];
        var neighbour4 = window.map[pos.x + 2][pos.y];
        var neighbour5 = window.map[pos.x + 3][pos.y];
            neighbours.push(neighbour,neighbour1,neighbour2,neighbour3,neighbour4,neighbour5);
            neighbours.forEach(function(element) {
            element.classList.add('highlight');
          });}
        
    if (pos.y + 1 < 10){ 
    var neighbour = window.map[pos.x][pos.y - 1];
    var neighbour1 = window.map[pos.x][pos.y - 2];
    var neighbour2 = window.map[pos.x][pos.y - 3];
    var neighbour3 = window.map[pos.x][pos.y + 1];
    var neighbour4 = window.map[pos.x][pos.y + 2];
    var neighbour5 = window.map[pos.x][pos.y + 3];
        neighbours.push(neighbour,neighbour1,neighbour2,neighbour3,neighbour4,neighbour5);
        neighbours.forEach(function(element) {
          element.classList.add('highlight');
        });}
       
  });
/*
    $('div.myclass').click(function () {
    var $row = String($(this).data('row') + 1);
    $col = $(this).data('col');
    //$hola = $(this).data({'data-row':$row,'data-col':$col});
    $currentrow = $('div[data-row="' + $row + '"][data-col="' + $col + '"]');
    $currentrow.addClass('highlight');
    //console.log($currentrow);
  })

  

  //var $linea = $('div.myclass').eq(0).data('row')+1;
  //String($linea)

//places players randomlyon the board
var rand = randomNum();
    if (rand.classList.contains('Available') == true) {
      pos = rand.position;
      console.log(pos);
      if (pos.x < 10 && pos.y < 4){
      rand.appendChild(playerOne);
      rand.classList.remove('Available');
      rand.classList.add('Taken');}
      
    } else {
      divs[0].appendChild(playerOne);
      divs[0].classList.remove('Available');
      divs[0].classList.add('Taken');
    }

var rand = randomNum();
    if (rand.classList.contains('Available') == true) {
      pos = rand.position;
      console.log(pos);
      if (pos.x < 10 && pos.y > 6){
      rand.appendChild(playerTwo);
      rand.classList.remove('Available');
      rand.classList.add('Taken');}
      
    } else {
      divs[99].appendChild(playerTwo);
      divs[99].classList.remove('Available');
      divs[99].classList.add('Taken');
    }
}
*/


  //$('.my-class[data-id="' + dataId + '"][data-id-index="'+dataIdIndex+'"]')
  
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
 
   for (var f=0; f < 10; f++){
     var rand = randomNumAvailable(); 
    for (var l=0; l < $availableCells.length; l++){        
        rand.classList.add('dimmcell');
        rand.classList.remove('Available');
        rand.classList.add('Taken') 
      }
    }
      
    var rand = randomNumAvailable();
        pos = rand.position;
      //console.log(pos);
      if (pos.x < 10 && pos.y < 4){
      rand.appendChild(playerOne);
      rand.classList.remove('Available');
      rand.classList.add('Taken');}


      function randomNumSet(number) {
        var random = Math.floor(Math.random() * number) + 1
        return random
      }

      var availableCells = $('div.Available');
          newAvailable = [];
      for (var h=0; h < availableCells.length; h++){
        por = availableCells[h].position;
        if (por.x < 10 && por.y < 4){
          newAvailable.push(por);
      }
    }
    var random = Math.floor(Math.random() * newAvailable.length);
      newAvailable[random].classList.add('dimmcell');
      newAvailable[random].classList.remove('Available');
      newAvailable[random].classList.add('Taken'); 
 
  function getRandomBlock(minX=0, maxX=9, minY=0, maxY=9) {
    var rand = null;
    do {
      var x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
      var y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
      rand = window.map[x][y];
    } while (rand.classList.contains('Available') == false);
    return rand;
  }




    }
  
    
 
