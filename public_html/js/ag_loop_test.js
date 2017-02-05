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
    else if (true) {
        //testDrawBlack();
        testDrawSplash();
        testImageMag();
        var play = confirm("Play Again?");
        if ( ! play ) {
            clearInterval(loop_handle);
            play_again = false;
        }
        else {
            play_again = true;
            is_end_level = true;
            level = 0;
            lives = 3;
            score = 10;
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
    testImageMag();
}

function testDraw() {
    
    
    setPanelScroll(scrollx, scrolly);
    
    checkRegularCollisions();

    checkPhysicsAdjustments();

    scrollBg(); //always call this last!!

    animate_vars();

    drawLevel(0);
}

function testDrawLoop() {
    is_end_level = true;
    //level = 0;
    score = 10;
    lives = 3;
    //preferences_collision = true;
    preferences_monsters = true;
    
    //level = 6; // FOR TESTING FLOATING PLATFORMS
    
    loop_handle = setInterval( function() {
        testPlayGameAgain();
        //testDraw();
        
        //console.log("30");
    }, 40);//30
}

function testDrawPrep() {
    var room = 0;
    //var level = 0;
    //level += 1;                
    room = level - 1;
    
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

function testDrawBlack() {
    
    /* clear screen */
    var c = document.getElementById("my_canvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.rect(0,0,AG.SCREEN_WIDTH, AG.SCREEN_HEIGHT);
    ctx.fillStyle = "black";
    ctx.fill();
}

function testDrawSplash() {
    
    splash_num ++;
    if (splash_num > 3) splash_num = 1;
    if (splash_num === 1) id = "splash1";
    if (splash_num === 2) id = "splash2";
    if (splash_num === 3) id = "splash3";
    
    var img_id = document.getElementById(id);

    var c = document.getElementById("my_canvas");
    var ctx = c.getContext("2d");
    ctx.drawImage(img_id, 0,0);
}

function testImageMag() {
    //console.log("mag");
    if (! preferences_larger_screen ) return;
    var c = document.getElementById("my_canvas");
    var ctx = c.getContext("2d");
    var img = ctx.getImageData(0,0,256,192);
    var cc = document.getElementById("my_large_canvas");
    var cctx = cc.getContext("2d");
    var image = new Image();
    image.src = c.toDataURL();
    //cctx.putImageData(img, 0,0, 0,0, 512, 384);
    cctx.drawImage(image, 0,0, 512, 384);
}