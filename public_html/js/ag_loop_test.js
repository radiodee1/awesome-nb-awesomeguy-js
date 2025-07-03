/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var old_lives = -1;
var is_initial_message = true;

function testPlayGameAgain() {
    //level = 0;

    if ((old_lives > lives && old_lives != -1 && lives > 0 )||wait_for_continue == MESSAGE_OW){
        testPicMessage(MESSAGE_OW, false, 1.5);
        testImageMag();
        old_lives = lives;
        return;
    }
    else if ((is_game_running && play_again && is_end_level && is_initial_message ) ) {
        old_lives = lives;
        testPicMessage(MESSAGE_START_QUES, false, 3);
        testImageMag();
        return;
    }
    //////////////////////////////
    if (play_again && is_game_running) {
        testAdvanceLevel() ;
        
    }
    else if (play_again && !is_game_running) {
        level = 0;
        is_end_level = true;
        old_lives = lives;
    }
    else if (true) {
        //testDrawBlack();

        graphCancel();
        testDrawSplash();
    
        testImageMag();
        var play = confirm("Play Again?");
        if ( ! play ) {
            clearInterval(loop_handle);
            play_again = false;
            is_initial_message = true;
            testPicMessage(MESSAGE_GAME_OVER, false, 30);
            testImageMag();
            return; 
        }
        else {
            change_level();
            play_again = true;
            is_end_level = true;
            //level = 0;
            lives = 3;
            score = 10;
            is_game_running = true;

            old_lives = lives;
            is_initial_message = true;
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
    
    graphSet();
    
    //graphDraw();
    //testImageMag();    
}

function testDrawLoop() {
    is_end_level = true;
    //level = 0;
    score = 10;
    lives = 3;
    //preferences_collision = true;
    preferences_monsters = true;
    if (preferences_graph_control) {
        graphCheckForWorkers();
        graphInit();
    }
    
    if (true) { // if (! isMobile()) {}
    
        loop_handle = setInterval( function() {
            testPlayGameAgain();
            
            //console.log("30");
        }, 40);//40
    }
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
    
    graphFromMap();
    //graphSet();
    
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
    
    //console.log('larger_screen', preferences_larger_screen);
    if (! preferences_larger_screen ) return;
    var c = document.getElementById("my_canvas");
    var ctx = c.getContext("2d");
    var img = ctx.getImageData(0,0,256,192);
    var cc = document.getElementById("my_large_canvas");
    var cctx = cc.getContext("2d");
    var image = new Image();
    //var image = document.createElement("img")
    image.src = c.toDataURL();

    image.onload = () => {
        //cctx.drawImage(image, 0,0, 512, 384);
        cctx.drawImage(image, 0,0, test_pixels(100, 'width'), test_pixels(100, 'height'));


    }
}

const MESSAGE_START_QUES = 1;
const MESSAGE_OW = 2;
const MESSAGE_GAME_OVER = 3;
const MESSAGE_NEW_GAME_QUES = 4;

function testPicMessage(message = 1, is_waiting = false, timeout = 1) {
    if (wait_for_continue != message && wait_for_continue != -1) {
        return;
    }
    //wait_for_continue = message;
    var id = '';
    if (message == MESSAGE_START_QUES) {
        id = 'message_start';
    }
    else if (message == MESSAGE_OW) {
        id = 'message_ow';
    }
    else if (message == MESSAGE_GAME_OVER) {
        id = "message_go";
    }
    else if (message == MESSAGE_NEW_GAME_QUES) {
        id = "message_ng";
    }
    console.log('message', id);

    var image = document.getElementById(id);
    var c = document.getElementById("my_canvas");
    var ctx = c.getContext("2d");
    //ctx.drawImage(image, 0,0, 512, 384);
    ctx.drawImage(image, 0,0, 256, 192);

    if (wait_for_continue != -1) {
        return;
    }

    if (is_waiting) {
        testPicWaitInput(message);
        return;
    }
    else if ( timeout > 0) {
        testPicWaitTime(message, 1000 * timeout )
        return;

    }

}

var wait_for_continue = -1;

function testPicWaitInput (wait_num) {
    wait_for_continue = wait_num;
    document.addEventListener('keydown',  (event) => {
        console.log('key', event.key);
        wait_for_continue = -1;
    })
    return;

}

function testPicWaitTime (wait_num, timeout) {
    if (wait_for_continue != -1) {
        return;
    }
    wait_for_continue = wait_num;
    setTimeout(() => {
        if (wait_for_continue == MESSAGE_START_QUES) {
            is_initial_message = false;
        }
        console.log('message wait_for_continue timer', wait_for_continue);
        wait_for_continue = -1; 
        
    }, timeout);
}

var mobile_pixels_w = window.innerWidth;
var mobile_pixels_h = window.innerHeight;

function test_set_w_h (w, h) {
    // set width and height
    mobile_pixels_w = w;
    mobile_pixels_h = h;
}


// use only for my_large_canvas!!
function test_pixels(p=100, dim='width', g=512) {
    const w =  Math.floor(mobile_pixels_w / 100 * p);
    const goal = g;
    if ( w < goal ) {
        r = w;
    }
    else {
        r = goal;
    }
    if (! isMobile() ) {
        if (dim == 'width') {
            return goal;
        }
        else {
            return Math.floor( goal / 4 * 3 );
        }
    }
    console.log('buttons', r, w);
    const h = Math.floor(r / 4 * 3);
    if (dim == 'width') {
        return r;
    }
    else {
        return h;
    }
}

function isMobile() {
    return isMobileUserAgent();
}

function isMobileUserAgent() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}


