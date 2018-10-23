let game = document.querySelector(".gameInner");
let skeleton = document.querySelector(".skeleton").style;
let character = document.querySelector(".character");


const hero = {x: 0,y: 0};

//this will be stiarcase, it will appear in onyl one location, which i can change over time
const stairCase = [{x: 5,y: 5}];


//these are obstacles so i can just push and remove them on every level
const obstacles = [
  {x: 1,y: 1},
  {x: 2,y: 2},
  {x: 2,y: 3},
  {x: 4,y: 4}
  // {x: 2,y: 3},
  // {x: 2,y: 3}
];

const skeletons = [
  {x: 3, y: 3},
  {x: 4, y: 4},
  {x: 5, y: 5},
  {x: 6, y: 6}
];

const wall=[
  {x:4,y:4}
];

function placeObjects(item, srcImage){

console.log(srcImage);
let newItem=document.createElement('div');


  //this gets me the x and y cordinates of the items
  for(let i=0;i<item.length;i++){

    //this creates the elemnt of div
        let n = document.createElement(`div`);
        // this sets the attribute of class ot that div to a name of box+index position
        n.setAttribute("class", `object${i}`); //sets the class attribute with the name
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
// ;max-width:100px; max-height:100px; width:100px; height:100px`
        game.append(n); //adds each element to the parent

    console.log("x is "+ item[i].x*100+"px");
    console.log("y is "+item[i].y*100+"px");

      //x=item.x*100+"px"
      //console.log("x is"+x);
      //y=item.y*100+"px"

  }
}

placeObjects(obstacles,"wall.png");
placeObjects(skeletons,"skeleton.gif");

//items simiar to obstacles i can push and remove them
const gems = [
  {x: 4,y: 4},
  {x: 3,y: 3},
  {x: 2,y: 4},
  {x: 6,y: 0}
];


const moveSkeleton = () => {

}

const gameDesign = document.querySelector('.gameInner');
let gameWidth=gameDesign.style.width;
let gamedHeight=gameDesign.style.height;



function createBoard(width, height, color){

  //max size is 700
  if(height>700){
    gamedHeight=700;
  }
  else{
    gamedHeight= height;
  }

  gameWidth= width;


  //these get reasigned to the dimesnions of the game
  gameDesign.style.width = gameWidth + "px";
  gameDesign.style.height = gamedHeight + "px";
  gameDesign.style.background = color;

}
//
createBoard(800,900,"blue");


//sets parameters of arena
const gameArena = (x,y) =>{

  if(x<0 || y<0 || x>=gameWidth/100 || y>=gamedHeight/100){
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
    case 37: moveLeft(); break;
    case 38: moveUp(); break;
    case 39: moveRight(); break;
    case 40: moveDown(); break;
    case 65: specialButton();break;
  }
});






//hero is the coordinates of the character
const moveUp = () => {

  if(canMoveTo(hero.x,hero.y-1)){
      hero.y -= 1;
      moveHeroTo(hero.x, hero.y);
    }
    else{
      // console.log("out of bounds");
    }
};

const moveDown = () => {

  if (canMoveTo(hero.x, hero.y+1)){
    hero.y += 1;
    moveHeroTo(hero.x, hero.y);
  }
  else{
    // console.log("out of bounds");
  }
};

const moveLeft = () => {
  if(canMoveTo(hero.x-1,hero.y)){
    hero.x-=1;
    moveHeroTo(hero.x,hero.y);
  }
  else{
    // console.log("out of bounds");
  }

};

const moveRight = () => {
  if(canMoveTo(hero.x+1,hero.y)){
    hero.x+=1;
    moveHeroTo(hero.x,hero.y);
  }
  else{
    // console.log("out of bounds");
  }
};




const specialButton = () => {
  console.log("a button pressed");
};
