/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready( function() {
    
    
    
    
    
    //drawLevel(0);
});

function testPlayGameAgain() {
    //level = 0;
    if (play_again && is_game_running) {
        testAdvanceLevel() ;
        
    }
    else if (play_again && !is_game_running) {
        level = 0;
        is_end_level = true;
    }
    else {
        var play = confirm("Play Again?");
        if ( ! play ) {
            clearInterval(loop_handle);
            play_again = false;
        }
        else {
            play_again = true;
            is_end_level = true;
            level = 0;
            is_game_running = true;
        }
    }
}

function testAdvanceLevel() {
    if (is_end_level) {
        level ++;
        is_end_level = false;
        testDrawPrep();
    }
    testDraw();
}

function testDraw() {
    
    newBG ++;
    animate = newBG;
    
    checkRegularCollisions();

    checkPhysicsAdjustments();

    scrollBg(); //always call this last!!

    //animate_vars();

    drawLevel(0);
}

function testDrawLoop() {
    is_end_level = true;
    level = 0;
    
    loop_handle = setInterval( function() {
        testPlayGameAgain();
        //testDraw();
        
        //console.log("30");
    }, 30);
}

function testDrawPrep() {
    var room = 0;
    //var level = 0;
    //level += 1;                
    room = level - 1;
    
    clearSpriteList();
    clearMap();

    level_h = map_list[room].ydim;
    level_w = map_list[room].xdim;

    setLevelData(map_list[room].visible , map_list[room].hidden, map_list[room].xdim, map_list[room].ydim);
    initLevel();
    
    jumptime = 0;
    move_ud = 0;
    move_lr = 0;
    move_jump = 0;
    //preferences_monsters = true;
    //preferences_collision = true;
}