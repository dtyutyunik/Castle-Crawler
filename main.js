const game = document.querySelector(".gameInner");
const skeleton = document.querySelector(".skeleton").style;
const character = document.querySelector(".character");
const gameDesign = document.querySelector('.gameInner');
let gameWidth=gameDesign.style.width;
let gameHeight=gameDesign.style.height;

let backgroundSong=new Audio("background.mp3");
let deadSong=new Audio("dead.mp3");
backgroundSong.play();
//Item creations via variable setting
const hero = {x: 0,y: 0, life: 3};

// let stairCase = [{x: parseInt(gameWidth/100)-1,y: parseInt(gameHeight/100)-1}];
let stairCase = [{x: 9  ,y: 7}];

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
  {x: 9,y: 2},
  {x: 0,y: 4},
  {x: 1,y: 6},
  {x: 1,y: 4},
  {x: 3,y: 6},
  {x: 3,y: 4},
  {x: 4,y: 5},
  {x: 6,y: 6},
  {x: 7,y: 7},
  {x: 5,y: 4},
  {x: 5,y: 7},
  {x: 6,y: 4},
  {x: 6,y: 1},
  {x: 8,y: 5},
  {x: 8,y: 4},
  {x: 9,y: 4},
  {x: 9,y: 1}
];

let skeletons = [
  {x: 2, y: 3},
  {x: 2, y: 1},
  {x: 7, y: 0},
  {x: 7, y: 3},
  {x: 2, y: 6},
  {x: 8, y: 6}
];


let heart=[{x:0,y:5}];


// function placeObjects(name,item, srcImage,size){
  // n.setAttribute("class", `${name}${i}`); //sets the class attribute with the name
  // placeObjects("walls", walls, "wall.png",100);




function createBoard(width, height, color){

  //max size is 800
  if(height>=800){
    gameHeight=800;
  }
  else{
    gameHeight= height;
  }

  gameWidth= width;
  //these get reasigned to the dimesnions of the game
  gameDesign.style.width = gameWidth + "px";
  gameDesign.style.height = gameHeight + "px";
  gameDesign.style.background = color;

}




//send through name of array, object of the array in question and url image, size is the px image of the item
function placeObjects(name,item, srcImage,size){

// console.log(srcImage);
let newItem=document.createElement('div');

  //this gets me the x and y cordinates of the items
  for(let i=0;i<item.length;i++){

    //this creates the elemnt of div
        let n = document.createElement(`div`);
        n.setAttribute("class", `${name}${i}`); //sets the class attribute with the name
        n.setAttribute("style",
        `background-image: url(${srcImage});
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

    game.append(n); //adds each element to the parent
  }
}

function level1(){
  createBoard(1000,1000,"black");
  placeObjects("walls", walls, "wall.png",100);
  placeObjects("skeletons",skeletons,"skeleton.gif",100);
  placeObjects("stairCase",stairCase,"stair.png",100);
  placeObjects("heart",heart,"hearts-full.png",50);
  skeleMove(".skeletons0","left","right",420);
  skelMoveShort(".skeletons1","up","down",500);
  skeleMove(".skeletons2","left","right",400);
  skeleMove(".skeletons3","up","down",380);
  skelMoveShort(".skeletons4","up","down",500);
  skelMoveShort(".skeletons5","left","right",380);

}

function finalLevel(){
  // createBoard(1000,1000,"black");
  // placeObjects("walls", walls, "wall.png",100);
  createBoard(1000,1000,"black");
  removeStuff("walls",walls);
  removeStuff("skeletons",skeletons);
  removeStuff("heart",heart);
  removeStuff("stairCase",stairCase);
  skeletons = [
    {x: 5, y: 7}];
placeObjects("skeletons",skeletons,"skeleton.gif",100);
    // skelMoveShort(".skeletons0","left","right",300);

  placeObjects("princess",princess,"prin2.gif",100);
walls=[
  {x: 3,y: 7},
  {x: 4,y: 6},
  {x: 4,y: 5},
  {x: 4,y: 4},
  {x: 4,y: 3},
  {x: 4,y: 2},
  {x: 4,y: 1},
  {x: 4,y: 0},
  {x: 7,y: 6},
  {x: 8,y: 6},
  {x: 9,y: 6},
  {x: 6,y: 6},
  {x: 6,y: 5},
  {x: 6,y: 4},
  {x: 6,y: 3},
  {x: 6,y: 2},
  {x: 6,y: 1},
  {x: 6,y: 0}
];
  placeObjects("walls", walls, "wall.png",100);
}

level1();
// finalLevel();

// placeObjects("walls", walls, "wall.png",100);
// placeObjects("skeletons",skeletons,"skeleton.gif",100);
// placeObjects("stairCase",stairCase,"stair.png",100);
// placeObjects("princess",princess,"prin2.gif",100);
// placeObjects("heart",heart,"hearts-full.png",50);


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
  // Multiply the coordinates by 100 because each grid square
  // is 100x100 pixels in size.
  character.style.top = (y * 100).toString() + 'px';
  character.style.left = (x * 100).toString() + 'px';
};



//eventlistener to the board
document.addEventListener("keyup", keys=> {
  //preventDefault stops the keys from doing their default property such as moving screen
    if([37,38,39,40,65].includes()){
      keys.preventDefault();
    }
    //keys is the value that is passed through upon releasing key, and keyCode is the special terminology that is needed to make it work
    //which is used for browser support incase opened in firefox, otherwise we use keycode
    switch (keys.keyCode || keys.which) {
    case 37: moveLeft(hero); break;
    case 38: moveUp(hero); break;
    case 39: moveRight(hero); break;
    case 40: moveDown(hero); break;
    case 65: touchSomething(princess,"princess");break;
  }
});


function wallTouch3(direction) {
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

    if(canMoveTo(item.x,item.y-1)&&wallTouch3('up') === false){
      item.y -= 1;
      moveHeroTo(item.x, item.y);
    }

};

const moveDown = (item) => {

  if (canMoveTo(item.x, item.y+1)&&wallTouch3('down') === false){
    item.y += 1;
    moveHeroTo(item.x, item.y);
  }

};

const moveLeft = (item) => {

  if(canMoveTo(item.x-1,item.y)&&wallTouch3('left') === false){
    item.x-=1;
    moveHeroTo(item.x,item.y);
  }

};

const moveRight = (item) => {
  if(canMoveTo(item.x+1,item.y)&&wallTouch3('right') === false){
    item.x+=1;
    moveHeroTo(item.x,item.y);
  }


};

const princess =[{x:5,y:0}];

function touchSomething(item,itemString){

  let charLeft=parseInt(character.style.left);
  let charRight=parseInt(charLeft)+100;
  let charTop=parseInt(character.style.top);
  let charBottom=charTop+100;


  for(let i=0;i<item.length;i++){

    let itemLeft=parseInt(document.querySelector(`.${itemString}${i}`).style.left);
    let itemRight=itemLeft+100;
    let itemTop=parseInt(document.querySelector(`.${itemString}${i}`).style.top);
    let itemBottom=itemTop+100;

      if(charLeft===itemLeft&&charTop===itemTop&&charRight===itemRight&&charBottom===itemBottom){

          if(itemString==="skeletons"){
              loseLife();
              backgroundSong.pause();
              deadSong.play();
              backgroundSong.play();
          }
          else if(itemString==="princess"){
              addToBoard("alive");
          }
          else if(itemString==="stairCase")
            {
              finalLevel();
            }
      }
  }
}


setInterval(function(){
  touchSomething(skeletons,"skeletons");
  touchSomething(stairCase,"stairCase");

},300);



function moveSkel(element,direction){

//this  needs to be put in as an error determent when removing skelletons
if(skeletons.length!==0){
  let skel=document.querySelector(element);

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
// else{
  // console.log("alal");
// }
}

function skelMoveShort(enemy,direction1,direction2,time){
  if(skeletons!==[]){
    setTimeout(function(){moveSkel(enemy,direction1)},time);
    setTimeout(function(){moveSkel(enemy,direction2)},time*2);
    setTimeout(function(){moveSkel(enemy,direction2)},time*3);
    setTimeout(function(){moveSkel(enemy,direction1)},time*4);
  }
  setInterval(function()
  {
    setTimeout(function(){moveSkel(enemy,direction1)},time);
    setTimeout(function(){moveSkel(enemy,direction2)},time*2);
    setTimeout(function(){moveSkel(enemy,direction2)},time*3);
    setTimeout(function(){moveSkel(enemy,direction1)},time*4);
  },time*4);
}

function skeleMove(enemy,direction1,direction2,time) {
console.log(skeletons);
  if(skeletons!==[]){
  //it moves the skeletion from beginning for 2 secs
  setTimeout(function(){moveSkel(enemy,direction1)},time);
  setTimeout(function(){moveSkel(enemy,direction1)},time*2);
  setTimeout(function(){moveSkel(enemy,direction2)},time*3);
  setTimeout(function(){moveSkel(enemy,direction2)},time*4);
  setTimeout(function(){moveSkel(enemy,direction2)},time*5);
  setTimeout(function(){moveSkel(enemy,direction2)},time*6);
  setTimeout(function(){moveSkel(enemy,direction1)},time*7);
  setTimeout(function(){moveSkel(enemy,direction1)},time*8);

  //now the skeleton moves forever in 2 second interloop
  setInterval(function()
  {
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
//we call the function so it activates right away
// skeleMove(".skeletons0","left","right");
// // skeleMove(".skeletons1","up","down");
// skeleMove(".skeletons2","left","right");
// skeleMove(".skeletons3","up","down");




//add life
function addLife(){
  if(hero.life<3){
    hero.life++;
    console.log("life+1");
    displayHearts();
  }
  else{console.log("you are at max life");}

}

//lose Life
function loseLife(){
  if(hero.life>=1){
    hero.life--;

    console.log("life-1");
    displayHearts();
  }
  else{console.log("you are dead");}
}

function createHearts(){

let heartPlace=document.querySelector(".heartContainer");
for(let i=0;i<3;i++){
  let n=document.createElement('div');
  n.setAttribute("class", `hearts${i}`);
  n.setAttribute("style",
  `background-image: url("hearts-full.png");
  background-size:contain;
  flex:1;
  background-repeat:no-repeat;
  width: 100px;
  height:100px`
  );
  heartPlace.append(n);

  };
}

createHearts();

function displayHearts(){
  let heart0=document.querySelector('.hearts0').style.backgroundImage;
  let heart1=document.querySelector('.hearts1').style.backgroundImage;
  let heart2=document.querySelector('.hearts2').style.backgroundImage;

  if(hero.life===3){
    heart0="url('hearts-full.png')";
    heart1="url('hearts-full.png')";
    heart2="url('hearts-full.png')";
  }
  if(hero.life===2){
    heart0="url('hearts-full.png')";
    heart1="url('hearts-full.png')";
    heart2="url('hearts-empty.png')";
  }
  if(hero.life===1){
    heart0="url('hearts-full.png')";
    heart1="url('hearts-empty.png')";
    heart2="url('hearts-empty.png')";
  }
  if(hero.life===0){
    heart0="url('hearts-empty.png')";
    heart1="url('hearts-empty.png')";
    heart2="url('hearts-empty.png')";

    addToBoard("dead");
  }
  document.querySelector('.hearts0').style.backgroundImage=heart0;
  document.querySelector('.hearts1').style.backgroundImage=heart1;
  document.querySelector('.hearts2').style.backgroundImage=heart2;

}



let i=15;

function showTime(){

  let over60=Math.floor(i/60);
  let rem60=Math.floor(i%60);

let display=document.querySelector(".timeAlive").innerText;

  if(i<0){
    display="Game Over";
    document.querySelector(".timeAlive").style.color="red";
    stopTheClock();
    addToBoard("dead");

  }

  else if(i<10){
    display=` 0:0${i}`;
  }
  else if(i<60){
    display=`0:${i}`;
  }
  else if(i>=60){
    if(rem60<10){
      display=`${over60}:0${rem60}`;
    }
    else{
    display=`${over60}:${rem60}`;
    }
  }

  i--;
  document.querySelector(".timeAlive").innerText=`${display}`;

}

let clock =  setInterval(showTime,1000);

function stopTheClock(){
  clearInterval(clock);
}




///////////////Local Storage for Score Kepper


window.localStorage;


var scoreKeep= [
  {name: "Dima", time: 48, status: "alive"},
  {name: "Kevin",time: 95, status: "dead"},
  {name: "Sam", time: 29, status: "alive"},
];


let printScore=JSON.parse(localStorage.getItem('scores'));

showPoints();

function addToBoard(howIdo){
  //if empty intialize with hardcoded scoreKeep
  let updateScore=JSON.parse(localStorage.getItem('scores'));
  if(updateScore===null){
    updateScore=scoreKeep;
  }

  let whoMe=prompt("what is your name?");
  updateScore.push({name: whoMe, time: i, status:howIdo});
  console.log(scoreKeep);
  localStorage.setItem('scores', JSON.stringify(updateScore));
  // localStorage.setItem('scores', JSON.stringify(scoreKeep));
  showPoints();
}




function showPoints(){
let updateScore=JSON.parse(localStorage.getItem('scores'));
// printScore=JSON.parse(localStorage.getItem('scores'));
let infoShame="";
let infoFame="";


  // for(let i=0;i<updateScore.length;i++){
for(let i=0;i<updateScore.length;i++){

    if(updateScore[i].status==="dead"){
        infoShame+=`<li>${updateScore[i].name} with time of: ${updateScore[i].time} seconds, status of ${updateScore[i].status}</li>`;
    }
    else if(updateScore[i].status==="alive"){
      infoFame+=`<li>`+`${updateScore[i].name} with time of: ${updateScore[i].time} seconds, status of ${updateScore[i].status}` +`</li>`;
    }
  }
    document.querySelector('.fame').innerHTML= infoFame;
    document.querySelector('.shame').innerHTML= infoShame;
}



function removeStuff(name,item){
  //makes the array 0
console.log(item.length-1);
  for(let i=item.length-1;i>=0;i--){
    document.querySelector(`.${name}${i}`).remove();
  }
//doesnt work for item
if(item===walls){
walls = [];
}

if(item===skeletons){
skeletons = [];
}

}
