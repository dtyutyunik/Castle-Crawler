const character = document.querySelector(".character");
const gameDesign = document.querySelector('.gameInner');
let gameWidth=gameDesign.style.width;
let gameHeight=gameDesign.style.height;
let clock; //clock is timekeeper interval
let gameover=true; //gameover is a variable that is used to stop eventlistener from working
let backgroundSong=new Audio("../music/background.mp3");   //background song
let deadSong=new Audio("../music/dead.mp3"); //song to be played when hurt
let floor=0;


//coordinates of elements used in game
let hero = {x: 0,y: 0, life:3};
let stairCase = [{x: 8 ,y: 8}];
let walls = [
  {x: 1,y: 1},
  {x: 1,y: 2},
  {x: 3,y: 1},
  {x: 4,y: 1},
  {x: 3,y: 2},
  {x: 4,y: 2},
  {x: 5,y: 2},
  {x: 6,y: 2},
  {x: 8,y: 2},
  {x: 0,y: 4},
  {x: 1,y: 6},
  {x: 1,y: 4},
  {x: 3,y: 6},
  {x: 3,y: 4},
  {x: 4,y: 5},
  {x: 6,y: 6},
  {x: 5,y: 4},
  {x: 5,y: 7},
  {x: 6,y: 4},
  {x: 6,y: 1},
  {x: 8,y: 6},
  {x: 8,y: 5},
  {x: 8,y: 4},
  {x: 0,y: 8},
  {x: 1,y: 8},
  {x: 2,y: 8},
  {x: 3,y: 8},
  {x: 4,y: 8},
  {x: 5,y: 8},
  {x: 6,y: 8},
  {x: 7,y: 8}];

let skeletons = [
  {x: 2, y: 3},
  {x: 2, y: 1},
  {x: 6, y: 0},
  {x: 7, y: 3},
  {x: 2, y: 6},
  {x: 7, y: 7}];

let dragon = [
  {x: 6, y: 5},
  {x: 2, y: 1},
  {x: 4, y: 1},
  {x: 6, y: 1}
];

const princess =[{x:5,y:0}];

//creates the board, based on width, height, color of background
function createBoard(height, width, color){
  //max size is 800 due to size of screen
  if(height>=900){
    gameHeight=900;
  }
  else{
    gameHeight= height;
  }
  if(width>=900){
    gameWidth=900;
  }
  else{
    gameWidth= width;
    }


  //these get reasigned to the dimesnions of the game
  gameDesign.style.width = gameWidth + "px";
  gameDesign.style.height = gameHeight + "px";
  gameDesign.style.background = color;
}

//send through name of array, object of the array in question and url image, size is the px image of the item
function placeObjects(name,item, srcImage,size){
let newItem=document.createElement('div');

  for(let i=0;i<item.length;i++){
        let n = document.createElement(`div`);
        n.setAttribute("class", `${name}${i}`); //sets the class attribute with the name
        n.setAttribute("style",
        `background-image: url(../images/${srcImage});
         max-width: ${size}px;
         background-size:contain;
         background-repeat:no-repeat;
         max-height:${size}px;
         width:${size}px;
         height:${size}px;
         position: absolute;
         left:${item[i].x*100+"px"};
         top:${item[i].y*100+"px"}`
       );

    gameDesign.append(n); //adds each element to the parent
  }
}

//loads level 1, places the objects and makes them move
function level1(){
  createBoard(1000,1000,"black");
  createHearts();
  placeObjects("hero", hero, "hero.gif",100);
  placeObjects("walls", walls, "wall.png",100);
  placeObjects("skeletons",skeletons,"skeleton.gif",100);
  placeObjects("stairCase",stairCase,"stair.png",100);
  skeleMove(".skeletons0","left","right",420);
  skelMoveShort(".skeletons1","up","down",500);
  skeleMove(".skeletons2","left","right",400);
  skeleMove(".skeletons3","up","down",380);
  skelMoveShort(".skeletons4","up","down",500);
  skelMoveShort(".skeletons5","left","right",380);

  backgroundSong.play();
  showPoints();
  setInterval(function(){
    touchSomething(skeletons,"skeletons");
    touchSomething(stairCase,"stairCase");
  },200);
  clock=setInterval(showTime,1000); //activates the countdown clock
  // movement=false;
}

function level2(){
  floor++;
  createBoard(1000,1000,"black");
  removeStuff("walls",walls);
  removeStuff("skeletons",skeletons);
  removeStuff("stairCase",stairCase);

  walls = [
    {x: 3,y: 0},
    {x: 5,y: 0},
    {x: 7,y: 0},
    {x: 1,y: 2},
    {x: 3,y: 2},
    {x: 5,y: 2},
    {x: 7,y: 2},
    {x: 8,y: 2},
    {x: 1,y: 3},
    {x: 3,y: 3},
    {x: 5,y: 3},
    {x: 8,y: 3},
    {x: 1,y: 4},
    {x: 3,y: 4},
    {x: 5,y: 4},
    {x: 7,y: 4},
    {x: 8,y: 4},
    {x: 8,y: 5},
    {x: 1,y: 6},
    {x: 3,y: 6},
    {x: 5,y: 6},
    {x: 7,y: 6},
    {x: 8,y: 6},
    {x: 1,y: 7},
    {x: 3,y: 7},
    {x: 5,y: 7},
    {x: 0,y: 8},
    {x: 1,y: 8},
    {x: 3,y: 8},
    {x: 4,y: 8},
    {x: 5,y: 8}];

  stairCase = [{x: 0 ,y: 0}];
  skeletons = [
    {x: 0, y: 5},
    {x: 2, y: 5},
    {x: 4, y: 5}];

  placeObjects("walls", walls, "wall.png",100);
  placeObjects("stairCase",stairCase,"stair.png",100);
  placeObjects("dragon",dragon,"drag.gif",100);
  placeObjects("skeleton",skeletons,"skeleton.gif",100);
  document.querySelector(".stairCase0").style.transform="scaleX(-1)";

//rotates the skeletons
  for(let i=0;i<skeletons.length;i++){
    document.querySelector(`.skeleton${i}`).style.transform="scaleX(-1)";
  }

  skelMoveShort(".dragon0","up","down",330);
  skelMoveShort(".dragon1","left","right",300);
  skelMoveShort(".dragon2","up","down",330);
  skelMoveShort(".dragon3","left","right",300);
  skelMoveShort(".skeleton0","up","down",270);
  skelMoveShort(".skeleton1","up","down",300);
  skelMoveShort(".skeleton2","up","down",330);

  setInterval(function(){
    touchSomething(skeletons,"skeleton");
    touchSomething(stairCase,"stairCase");
    touchSomething(dragon,"dragon");
  },200);

}


function finalLevel(){
  createBoard(1000,1000,"black");
  removeStuff("walls",walls);
  removeStuff("skeleton",skeletons);
  removeStuff("stairCase",stairCase);
  removeStuff("dragon",dragon);

  walls=[
  {x: 3,y: 6},
  {x: 2,y: 6},
  {x: 1,y: 6},
  {x: 7,y: 6},
  {x: 8,y: 6},
  {x: 4,y: 6},
  {x: 4,y: 5},
  {x: 4,y: 4},
  {x: 4,y: 3},
  {x: 4,y: 2},
  {x: 4,y: 1},
  {x: 4,y: 0},
  {x: 6,y: 6},
  {x: 6,y: 5},
  {x: 6,y: 4},
  {x: 6,y: 3},
  {x: 6,y: 2},
  {x: 6,y: 1},
  {x: 6,y: 0}];

  dragon = [
    {x: 5, y: 7},
    {x: 4, y: 8},
  ];

  placeObjects("walls", walls, "wall.png",100);
  placeObjects("princess",princess,"prin2.gif",100);
  placeObjects("dragons",dragon,"drag.gif",100);
  skelMoveShort(".dragons0","left","right",300);
  skelMoveShort(".dragons1","left","right",200);
  for(let i=0;i<dragon.length;i++){
    document.querySelector(`.dragons${i}`).style.transform="scaleX(-1)";
  }
  setInterval(function(){touchSomething(dragon,"dragons")},150);
}


//sets parameters of arena
const gameArena = (x,y) =>{
  if(x<0 || y<0 || x>=gameWidth/100 || y>=gameHeight/100){
    return false;
  }
    return true;
}

//checks to see if character can move to certain location
const canMoveTo = (x , y) => {
  if(!gameArena(x,y)){
    return false;
  }
  return true;
}


const moveHeroTo = (x, y) => {
  // Multiply the coordinates by 100 because each grid square is 100x100 pixels in size.
  character.style.top = (y * 100).toString() + 'px';
  character.style.left = (x * 100).toString() + 'px';
};



//eventlistner added to the document
document.addEventListener("keyup", keys=> {
  //gameOver will be turned to false, upon death or winning and hence eventlistner will be turned off
  if(gameover===true){
    if([37,38,39,40,65].includes(keys.keyCode)){
      keys.preventDefault();
    }
    //keys is the value that is passed through upon releasing key, and keyCode is the special terminology that is needed to make it work
    //which is used for browser support incase opened in firefox, otherwise we use keycode
    switch (keys.keyCode || keys.which) {
    case 37: moveLeft(hero); break;
    case 38: moveUp(hero); break;
    case 39: moveRight(hero); break;
    case 40: moveDown(hero); break;
    case 65: touchSomething(princess,"princess"); break;
    }
  }
});

function wallTouch(direction) {
  let wallX = 0;
  let wallY = 0;
  //the -1 and +1 are the same as the move function
  switch (direction) {
    case 'left': wallX = -1; break;
    case 'right': wallX = 1; break;
    case 'up': wallY = -1; break;
    case 'down': wallY = 1; break;
  }
  //some checks if any of the below values are true and returns true, if all false, then returns false which is the value of the array
  return walls.some(function(wall){
    //if hero x coordinate + direction number equivalency would equal to the location of the wall
    if (hero.x + wallX === wall.x && hero.y + wallY === wall.y) {
      return true;
    }
  });
}

//hero is the coordinates of the character
const moveUp = (item) => {
    if(canMoveTo(item.x,item.y-1)&&wallTouch('up') === false){
      item.y -= 1;
      moveHeroTo(item.x, item.y);
    }
};

const moveDown = (item) => {
  if (canMoveTo(item.x, item.y+1)&&wallTouch('down') === false){
    item.y += 1;
    moveHeroTo(item.x, item.y);
  }
};

const moveLeft = (item) => {
  character.style.transform="scaleX(-1)"; //this changes the direction the character appears to look
  if(canMoveTo(item.x-1,item.y)&&wallTouch('left') === false){
    item.x-=1;
    moveHeroTo(item.x,item.y);
  }


};

const moveRight = (item) => {
  character.style.transform="scaleX(1)";
  if(canMoveTo(item.x+1,item.y)&&wallTouch('right') === false){
    item.x+=1;
    moveHeroTo(item.x,item.y);
  }
};





function touchSomething(item,itemString){
  let charLeft=parseInt(character.style.left);
  let charRight=parseInt(charLeft)+100;
  let charTop=parseInt(character.style.top);
  let charBottom=charTop+100;

    for(let i=0;i<item.length;i++){
      if(item!==null){
        let itemLeft=parseInt(document.querySelector(`.${itemString}${i}`).style.left);
        let itemRight=itemLeft+100;
        let itemTop=parseInt(document.querySelector(`.${itemString}${i}`).style.top);
        let itemBottom=itemTop+100;

        //checks if the coordinates are exactly over eachother
        if(charLeft===itemLeft&&charTop===itemTop&&charRight===itemRight&&charBottom===itemBottom){
            if(itemString==="skeletons"|| itemString==="skeleton"){
                loseLife();
                backgroundSong.pause();
                deadSong.play();
                backgroundSong.play();
            }
            if(itemString==="dragon" || itemString==="dragons"){
              loseLife();
            }

            else if(itemString==="princess"){
                stopTheClock();
                setTimeout(
                function(){addToBoard("alive");},1000); //you win the game
                gameover=false; //removes event listener and freezes game in place
            }

            else if(itemString==="stairCase")
              {
                if(floor===0){
                  level2();
                }
                else if(floor===1){
                  finalLevel(); //calls the next level--in this case final level
                }

            }
      }
    }
  }
}

function moveDrag(element,direction){
    //error determent put in place making sure the dragon(s) can only move if the array is not 0
    if(dragon.length!==0){
      let drag=document.querySelector(element);
      posLeft = parseInt(drag.style.left);
      posTop = parseInt(drag.style.top);

      switch(direction){
        case "down": posTop += 100; break;
        case "up": posTop -= 100; break;
        case "right": posLeft += 100; break;
        case "left": posLeft -= 100; break;
      }
      drag.style.left = posLeft + 'px';
      drag.style.top = posTop + 'px';
    }
}

function moveSkel(element,direction){
//error determent put in place making sure the skeletons can only move if the array is not 0
if(skeletons.length!==0){
  let skel=document.querySelector(element);

  if(skel!==null){
    posLeft = parseInt(skel.style.left);
    posTop = parseInt(skel.style.top);

  switch(direction){
    case "down": posTop += 100; break;
    case "up": posTop -= 100; break;
    case "right": posLeft += 100; break;
    case "left": posLeft -= 100; break;
  }

    skel.style.left = posLeft + 'px';
    skel.style.top = posTop + 'px';
    }
  }

}

function skelMoveShort(enemy,direction1,direction2,time){

    if(skeletons.length!==0){
      setTimeout(function(){moveSkel(enemy,direction1)},time);
      setTimeout(function(){moveSkel(enemy,direction2)},time*2);
      setTimeout(function(){moveSkel(enemy,direction2)},time*3);
      setTimeout(function(){moveSkel(enemy,direction1)},time*4);

      setInterval(function()
      {
        setTimeout(function(){moveSkel(enemy,direction1)},time);
        setTimeout(function(){moveSkel(enemy,direction2)},time*2);
        setTimeout(function(){moveSkel(enemy,direction2)},time*3);
        setTimeout(function(){moveSkel(enemy,direction1)},time*4);
      },time*4);
    }
    else if(dragon.length!==0){
      setTimeout(function(){moveDrag(enemy,direction1)},time);
      setTimeout(function(){moveDrag(enemy,direction2)},time*2);
      setTimeout(function(){moveDrag(enemy,direction2)},time*3);
      setTimeout(function(){moveDrag(enemy,direction1)},time*4);

      setInterval(function()
      {
        setTimeout(function(){moveDrag(enemy,direction1)},time);
        setTimeout(function(){moveDrag(enemy,direction2)},time*2);
        setTimeout(function(){moveDrag(enemy,direction2)},time*3);
        setTimeout(function(){moveDrag(enemy,direction1)},time*4);
      },time*4);
    }

}

function skeleMove(enemy,direction1,direction2,time) {
    if(skeletons.length!=0){
    setTimeout(function(){moveSkel(enemy,direction1)},time);
    setTimeout(function(){moveSkel(enemy,direction1)},time*2);
    setTimeout(function(){moveSkel(enemy,direction2)},time*3);
    setTimeout(function(){moveSkel(enemy,direction2)},time*4);
    setTimeout(function(){moveSkel(enemy,direction2)},time*5);
    setTimeout(function(){moveSkel(enemy,direction2)},time*6);
    setTimeout(function(){moveSkel(enemy,direction1)},time*7);
    setTimeout(function(){moveSkel(enemy,direction1)},time*8);

    setInterval(function(){
      setTimeout(function(){moveSkel(enemy,direction1)},time);
      setTimeout(function(){moveSkel(enemy,direction1)},time*2);
      setTimeout(function(){moveSkel(enemy,direction2)},time*3);
      setTimeout(function(){moveSkel(enemy,direction2)},time*4);
      setTimeout(function(){moveSkel(enemy,direction2)},time*5);
      setTimeout(function(){moveSkel(enemy,direction2)},time*6);
      setTimeout(function(){moveSkel(enemy,direction1)},time*7);
      setTimeout(function(){moveSkel(enemy,direction1)},time*8);
      },time*8);
    }


}

//add life--not implemented
function addLife(){
  if(hero.life<3){
    hero.life++;
    displayHearts();
  }
}

//lose Life
function loseLife(){
  if(hero.life>=1){
    hero.life--;
    displayHearts();
  }
}

function createHearts(){

  let heartPlace=document.querySelector(".heartContainer");

  for(let i=0;i<3;i++){
      let n=document.createElement('div');
        n.setAttribute("class", `hearts${i}`);
        n.setAttribute("style",
          `background-image: url("../images/hearts-full.png");
          background-size:contain;
          flex:1;
          background-repeat:no-repeat;
          width: 100px;
          height:100px`
        );
      heartPlace.append(n);
    };
}



function displayHearts(){
  let heart0=document.querySelector('.hearts0').style.backgroundImage;
  let heart1=document.querySelector('.hearts1').style.backgroundImage;
  let heart2=document.querySelector('.hearts2').style.backgroundImage;

  if(hero.life===3){
    heart0="url('../images/hearts-full.png')";
    heart1="url('../images/hearts-full.png')";
    heart2="url('../images/hearts-full.png')";
  }
  if(hero.life===2){
    heart2="url('../images/hearts-empty.png')";
  }
  if(hero.life===1){
    heart1="url('../images/hearts-empty.png')";
  }
  if(hero.life===0){
    heart0="url('../images/hearts-empty.png')";
    stopTheClock();
    document.querySelector(".timeAlive").innerText="Game Over";
    document.querySelector(".timeAlive").style.color="red";
    document.querySelector(".timeAlive").style.fontSize="40px";
    setTimeout(function(){addToBoard("dead");},1000);
    gameover=false; //this stops eventlistner

  }
  document.querySelector('.hearts0').style.backgroundImage=heart0;
  document.querySelector('.hearts1').style.backgroundImage=heart1;
  document.querySelector('.hearts2').style.backgroundImage=heart2;

}

let timer=24;

function showTime(){
  let over60=Math.floor(timer/60);
  let rem60=Math.floor(timer%60);
  let display=document.querySelector(".timeAlive").innerText;

  if(timer<0){
    stopTheClock();
    display="Time's Up";
    document.querySelector(".timeAlive").style.color="red";
    document.querySelector(".timeAlive").style.fontSize="40px";
    setTimeout(function(){addToBoard("dead");},1000);
    gameover=false;
  }

  else if(timer<10){
    display=` 0:0${timer}`;
  }
  else if(timer<60){
    display=`0:${timer}`;
  }
  else if(timer>=60){
    if(rem60<10){
      display=`${over60}:0${rem60}`;
    }
    else{
    display=`${over60}:${rem60}`;
    }
  }
  timer--;
  document.querySelector(".timeAlive").innerText=`${display}`;
}

function stopTheClock(){
  clearInterval(clock);
}


///////////////Local Storage for Score Kepper///////////////////////////////////

//helper function returns localstorage data or if that is null, then returns predetermined array
function getScores(){
  return JSON.parse(localStorage.getItem('scores'))||[
    {name: "Dima", time: 7, status: "Won"},
    {name: "Kevin",time: 12, status: "Dead"},
    {name: "Sam", time: 3, status: "Dead"}
  ];
}


function addToBoard(howIdo){

  let updateScore=getScores();
  let whoMe=prompt("What is your name for the record books?");
  updateScore.push({name: whoMe, time: timer, status:howIdo}); //pushes array of objects
  localStorage.setItem('scores', JSON.stringify(updateScore)); //sets the above array of objects into localstorage
  showPoints();
  alert("The game will reload in 2 seconds");
  setTimeout(reloadPage,2000);
}


function showPoints(){
  let updateScore=getScores();
  let infoShame="";
  let infoFame="";

  for(let i=0;i<updateScore.length;i++){
      if(updateScore[i].status==="dead"){
          infoShame+=`<li>Name: ${updateScore[i].name}, Time: ${updateScore[i].time}, Status: ${updateScore[i].status}</li>`;
      }
      else if(updateScore[i].status==="alive"){
        infoFame+=`<li>Name: ${updateScore[i].name}, Time: ${updateScore[i].time}, Status: ${updateScore[i].status}` +`</li>`;
      }
    }
      document.querySelector('.fame').innerHTML= infoFame;
      document.querySelector('.shame').innerHTML= infoShame;
  }



function removeStuff(name,item){
  //removes elements from the dom
  for(let i=item.length-1;i>=0;i--){
    document.querySelector(`.${name}${i}`).remove();
  }
//sets the array of objects to a empty array
  if(item===walls){
    walls = [];
  }
  if(item===skeletons){
    skeletons = [];
  }
  if(item===dragon){
    dragon = [];
  }
  if(item===princess){
    princess=[];
  }
  if(item===stairCase){
    stairCase=[];
  }
}

//reloads the page back from beginning
function reloadPage(){
  window.location.reload();
}


//Landing Page portion of index.html
function startGame(){
  document.querySelector(".loadingScreenOutter").style.display="none";
  level1();
}

function controls(){
  document.querySelector(".controls1").style.display="block";
}

function controlsExit(){
  document.querySelector(".controls1").style.display="none";
}

function story(){
  document.querySelector(".story1").style.display="block";
}

function storyExit(){
  document.querySelector(".story1").style.display="none";
}
