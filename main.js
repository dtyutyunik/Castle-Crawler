let game = document.querySelector(".gameInner");
let skeleton = document.querySelector(".skeleton").style;
let character = document.querySelector(".character");




const hero = {x: 0,y: 0, life: 3};

//these are obstacles so i can just push and remove them on every level
const walls = [
  {x: 1,y: 4},
  // {x: 1,y: 1},
  {x: 1,y: 1},
  {x: 0,y: 4},
  {x: 1,y: 2},
  {x: 1,y: 3},
  // {x: 2,y: 2},
  // {x: 2,y: 3},
  // {x: 3,y: 3},
  // {x: 3,y: 2},
  {x: 2,y: 3}
];


const gameDesign = document.querySelector('.gameInner');
let gameWidth=gameDesign.style.width;
let gameHeight=gameDesign.style.height;



function createBoard(width, height, color){

  //max size is 700
  if(height>700){
    gameHeight=700;
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
//
createBoard(1000,1000,"black");


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



const skeletons = [
  {x: 3, y: 4},
  {x: 2, y: 2},
  {x: 5, y: 5},
  // {x: 7, y: 7},
  {x: 6, y: 6}
];



const stairCase = [{x: parseInt(gameWidth/100)-1,y: parseInt(gameHeight/100)-1}];

//send through name of array, object of the array in question and url image
function placeObjects(name,item, srcImage){

// console.log(srcImage);
let newItem=document.createElement('div');


  //this gets me the x and y cordinates of the items
  for(let i=0;i<item.length;i++){

    //this creates the elemnt of div
        let n = document.createElement(`div`);
        // this sets the attribute of class ot that div to a name of box+index position
        // n.setAttribute("class", `${className}`+`${i}`); //sets the class attribute with the name
        n.setAttribute("class", `${name}${i}`); //sets the class attribute with the name
        // n.setAttribute("grid-area", `object${i}`); //asigns it to the grid spot for each
        n.setAttribute("style",
        `background-image: url(${srcImage});
         max-width: 100px;
         background-size:contain;
         background-repeat:no-repeat;
         max-height:100px;
         width:100px;
         height:100px;
         position: absolute;
         left:${item[i].x*100+"px"};
         top:${item[i].y*100+"px"}`
       );

      game.append(n); //adds each element to the parent


  }
}

placeObjects("walls", walls, "wall.png");
placeObjects("skeletons",skeletons,"skeleton.gif");
placeObjects("stairCase",stairCase,"stair.png");








//sets parameters of arena
const gameArena = (x,y) =>{

  if(x<0 || y<0 || x>=gameWidth/100 || y>=gameHeight/100){
    // console.log("outisde");
    return false;
  }
    return true;

}

//checks to see if character can move to certain location
const canMoveTo = (x , y) => {

  if(!gameArena(x,y)){
    // console.log("not in game arena");
    return false;
  }


  return true;
}

const moveTo = (item, x, y) => {
  // Multiply the coordinates by 100 because each grid square
  // is 100x100 pixels in size.
  console.log(item+"this is it");
  item.style.top = (y * 100).toString() + 'px';
  item.style.left = (x * 100).toString() + 'px';
};






const moveHeroTo = (x, y) => {
  // Multiply the coordinates by 100 because each grid square
  // is 100x100 pixels in size.
  character.style.top = (y * 100).toString() + 'px';
  character.style.left = (x * 100).toString() + 'px';
};



//eventlistener to the board
document.addEventListener("keyup", keys=> {
  // let x=keys.keyCode;
  // console.log(x);

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
    case 65: specialButton(hero);break;
  }
});

/////

//wall collision, if you are touching its borders means you collided with it
function wallTouch(){

  let charLeft=parseInt(character.style.left);
  let charRight=parseInt(charLeft)+100;
  let charTop=parseInt(character.style.top);
  let charBottom=charTop+100;

  // console.log(skeletons.length);
  for(let i=0;i<=walls.length;i++){
      // console.log(skeletons[i]);
      let wallLeft=parseInt(document.querySelector(`.walls${i}`).style.left);
      let wallRight=wallLeft+100;
      let wallTop=parseInt(document.querySelector(`.walls${i}`).style.top);
      let wallBottom=wallTop+100;

      //left--right collision
      if(charLeft===wallRight&&charTop===wallTop||charRight===wallLeft&&charTop===wallTop){
        console.log("walls touch left/right");
        return true;
      }
      //up--down collision
      if(charBottom===wallTop&&charLeft===wallLeft||charTop===wallBottom&&charLeft===wallLeft){
        console.log("walls ouch up");
        return true;
      }
  }
  return false;
}




//wall collision, if you are touching its borders means you collided with it
function wallTouch2(){

let word="";
  let charLeft=parseInt(character.style.left);
  let charRight=parseInt(charLeft)+100;
  let charTop=parseInt(character.style.top);
  let charBottom=charTop+100;

  // console.log(skeletons.length);
  let wallArray = [];
  for(let i=0;i<walls.length;i++){
      // console.log(skeletons[i]);
      let wallLeft=parseInt(document.querySelector(`.walls${i}`).style.left);
      let wallRight=wallLeft+100;
      let wallTop=parseInt(document.querySelector(`.walls${i}`).style.top);
      let wallBottom=wallTop+100;


      //right collision

      if(charTop===wallTop&&charBottom===wallBottom&&charRight===wallLeft){
        console.log("cant't go right");
        word="right";
      }
      //left collision
       else if(charTop===wallTop&&charBottom===wallBottom&&charLeft===wallRight){
        console.log("cant't go left");
        word="left";

      }
      //top collision
       else if(charLeft===wallLeft&&charRight===wallRight&&charTop===wallBottom){
        console.log("cant't go up");
        word="up";
      }

      //top collision
       else if(charLeft===wallLeft&&charRight===wallRight&&charBottom===wallTop){
        console.log("cant't go down");
        word="down";

      }
      return word;
  }
  // return false;
}

function wallTouch3(direction) {
  let wallX = 0;
  let wallY = 0;
  switch (direction) {
    case 'left':
      wallX = -1;
      break;
    case 'right':
      wallX = 1;
      break;
    case 'up':
      wallY = -1;
      break;
    case 'down':
      wallY = 1;
      break;
  }
  let check = walls.some(wall => {
    if (hero.x + wallX === wall.x && hero.y + wallY === wall.y ) {
      return true;
    }
  });
  return check;
}

// setInterval(wallTouch2,100)



//wall collision, if you are touching its borders means you collided with it
function skellTouch(){

  let charLeft=parseInt(character.style.left);
  let charRight=parseInt(charLeft)+100;
  let charTop=parseInt(character.style.top);
  let charBottom=charTop+100;


  for(let i=0;i<skeletons.length;i++){

      let skelLeft=parseInt(document.querySelector(`.skeletons${i}`).style.left);
      let skelRight=skelLeft+100;
      let skelTop=parseInt(document.querySelector(`.skeletons${i}`).style.top);
      let skelBottom=skelTop+100;

      //if its spaces are the exact same
      if(charLeft===skelLeft&&charTop===skelTop&&charRight===skelRight&&charTop===skelTop){
        console.log(`skell${i}`);


        loseLife();
      }

  }
}



;
setInterval(skellTouch,500);

function moveSkel(element,direction){
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


function skeleMove() {
  //it moves the skeletion from beginning for 2 secs
  setTimeout(function(){moveSkel(".skeletons0","up")},500);
  setTimeout(function(){moveSkel(".skeletons0","up")},1000);
  setTimeout(function(){moveSkel(".skeletons0","down")},1500);
  setTimeout(function(){moveSkel(".skeletons0","down")},2000);

  //now the skeleton moves forever in 2 second interloop
  setInterval(function()
  {
    setTimeout(function(){moveSkel(".skeletons0","up")},500);
    setTimeout(function(){moveSkel(".skeletons0","up")},1000);
    setTimeout(function(){moveSkel(".skeletons0","down")},1500);
    setTimeout(function(){moveSkel(".skeletons0","down")},2000);
  },2000);

}
//we call the function so it activates right away
skeleMove();



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



const specialButton = () => {
  console.log("a button pressed");
};


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


  console.log(hero.life);

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
    recordTime();
    console.log("dead");
    // alert("You died a horrible death");
  }
  document.querySelector('.hearts0').style.backgroundImage=heart0;
  document.querySelector('.hearts1').style.backgroundImage=heart1;
  document.querySelector('.hearts2').style.backgroundImage=heart2;

}
let i=0;

function showTime(){

  let over60=Math.floor(i/60);
  let rem60=Math.floor(i%60);

let display=document.querySelector(".timeAlive").innerText;
  if(i<10){
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

  i++;
  document.querySelector(".timeAlive").innerText=display;
}

setInterval(showTime,1000);

window.localStorage;

if(typeof(Storage)!== "undefined"){
  console.log("store");
}
else{
  console.log('no store');
}

function recordTime(){
  localStorage.setItem("score",setInterval(showTime,1000)-10);
  let storeTime+=localStorage.getItem("score");
  document.querySelector(".hallOfFame").innerText=storeTime;
}
