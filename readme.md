Castle Dungeon Scroller

Synopsis: You are a hero trying to climb the castle to rescue the princess.
In classic gaming you will have 3 lives to win the game.
Their will be a time clock on the side. This time clock will stop once you die or win the game aka talk to the princess.
For now there will be 5 levels, can increase depending on time allocation.

Once you die your time it took to die or win will be stored in the Hall of Fame section.
For instance if you win in 40 seconds it will say Name: Time: 40 sec Status: Won
For instance if you lose all three lives in 35 seconds it will say Name: Time: 35 sec Status: Dead


In order to go up the castle there will be a staircase located in a certain area of the board.
Upon reaching the staircase you go to next floor. In the sense of around your location a new board will be created with its own obstacles.


|------------------|        |--------|
|                  |        |        |
|                  |        | items which can be clicked|
|   Game           |        |        |
|                  |        |--------|
|                  |        
|                  |        |--------|
|                  |        |time keeper|
|------------------|        |--------|

1. At the beginning you are prompted to insert your name.
2. On the side will be instructions detailing what each key does aka how to move around. up, down, left, right.
3. Your character will move one space at a time trying to get to the destined location.
4. You start with 3 lives and can only have a total of 3 lives.
5. On certain stages there will heart item that you pickup when walking over that will be added to your item collection
6. items in your item collection can be used as long as it meets the requirement so you cant use a heart when you already have 3 hearts
--might scratch this and instead just add heart directly to your life
7. On certain stages their will be enemies that move up/down or left/right--> linear
--if you touch enemy you lose a life.
8. once you get to the ladder at end of the level the stage reloads around you and now your at the next level

Functions needed:
getName()
generateboard()
generateObstacle()
generateEnenmy()
moveEnemy()
generateExit()
movePlayer()
generateHeart()
updateItems()
useItems()
removeItems()
timeStart()
timeEnd()
recordScore()
