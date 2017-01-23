/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready( function() {
    
    
    //setupDrawFunctionsA();
    
    //setupDrawFunctionsB();
    //var screen = getScreenPointer(0);
    //screen.putImageData(platform_a, 0,0);
    //drawSprite_40_8(platform_a, 0,0,0,0, 0, 0);
    //drawSprite_16(guy_a,16,16,0,0, 0,0);
    //drawScoreWords();
    
    //var square = cutTile("tiles1", 0, 10);
    //alert(square);
    //drawTile_8(square, 0,0,0,0, 0,0)
    
    
    //drawLevel(0);
});

function testDraw() {
    checkRegularCollisions();

    checkPhysicsAdjustments();

    scrollBg(); //always call this last!!

    drawLevel(0);
}

function testDrawLoop() {
    setInterval( function() {
        testDraw();
        //console.log("30");
    }, 30);
}

function testDrawPrep() {
    var room = 0;
    var level = 0;
    level += 1;                
    room = level - 1;
    
    clearSpriteList();
    clearMap();

    setLevelData(map_list[room].visible , map_list[room].hidden, map_list[room].xdim, map_list[room].ydim);
    initLevel();
    
    //preferences_monsters = true;
    //preferences_collision = true;
}