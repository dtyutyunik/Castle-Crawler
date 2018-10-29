#Name: Castle Crawler

##Synopsis:
You are a hero trying to climb the castle to rescue the princess.
In classic gaming you will have 3 lives to win the game reflected via hearts.
Their will be a time clock on the side. This time clock will stop once you die or win the game aka talk to the princess.
There will be a multitude of levels depending on time allocation, at the least a first level and a level for the princess.

Once you die your time it took to die or win will be stored in the Hall of Fame section.
For instance if you win in 10 seconds it will say Name: Time: 10 sec Status: Won
For instance if you lose all three lives in 12 seconds it will say Name: Time: 12 sec Status: Dead

In order to go up the castle there will be a staircase located in a certain area of the board.
Upon reaching the staircase you go to next floor. In the sense of around your location a new board will be created with its own obstacles. Upon Reaching the princess you need to press A to win the game.

```
|------------------|        |--------|
|                  |        | Title  |
|                  |        | Lives  |
|                  |        | Time   |
|   Game           |        |        |
|                  |        |        |
|                  |        |Hall of Fame|
|                  |        |        |
|                  |        |        |
|------------------|        |--------|
```
1. Loading screen appears show an animation.
2. Underneath animation there will be two buttons,
  ⋅⋅* Play-that starts game and closes the current screen.
    ⋅⋅* Rules-that display how to play the game.
3. Your character will move one space at a time trying to get to the destined location.
4. You start with 3 lives and can only have a total of 3 lives.
5. On certain stages their will be enemies that move up/down or left/right--> linear
    ⋅⋅* if you touch enemy you lose a life.
6. once you get to the ladder at end of the level the stage reloads around you and now your at the next level
7. Ways to Win: Touch the princess and press a on keyboard before time runs out.
8. Ways to lose: Either lose all three lives or run out of time before touching the princess
9. Upon win or loss, a prompt asking for your name will appear and will store your play time, name, and status in the leaderboard/Hall of Fame

##Functions needed:
`getName()`
`generateboard()`
`generateObstacle()`
`generateEnenmy()`
`moveEnemy()`
`removeEnemy()`
`generateExit() //staircase`
`movePlayer()`
`generateHeart()`
`timeStart()`
`timeEnd()`
`recordScore()`

##Code Most Proud of:
```
removeStuff("walls",walls);

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
```

WireFrame images:
![Overview](wireFrame/Overview.JPG)
![Gameplay](wireFrame/Gameplay.JPG)

Game images:
![Landing Page](/GamePlay-Images/Landing-Page.PNG)
![Level 1](/GamePlay-Images/Level1.PNG)
![Level 2](/GamePlay-Images/Level2.PNG)
![Final Level](/GamePlay-Images/Final-Level.PNG)
![Final Level- Time up](/GamePlay-Images/Time-Up.PNG)

Link to github: <https://github.com/dtyutyunik/Castle-Crawler>
Link to website: <http://colorful-sofa.surge.sh>
