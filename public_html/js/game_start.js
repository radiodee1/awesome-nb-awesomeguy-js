/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

input_key = 0;
var move_lr = 0;
var move_ud = 0;
var move_jump = 0;
var MOVE_CONST = 3;

$(document).ready( function() {
    //alert("game start");
    //$("img").css("margin",0)
    //$("img").css("line-height", 0)
    //$("#page_content").html("<canvas id='my_canvas' width='256' height='192' style='border:1px solid #000000;' ></canvas>");
    setupDrawFunctionsA();
    
    
    
    $(document).keydown(function(e) {
        input_key = e.keyCode;
        $("#page_footer").html("<p>tap " + input_key  + "</p>");
        //// call game fn here
        if (input_key === AG.LEFT) move_lr = - MOVE_CONST;//guy.x --;
        if (input_key === AG.UP) move_ud = - MOVE_CONST; //guy.y --;
        if (input_key === AG.RIGHT) move_lr = MOVE_CONST;// ++;
        if (input_key === AG.DOWN) move_ud = MOVE_CONST;
        if (input_key === AG.JUMP) move_jump = 1;
        //drawLevel(0);

    });
    
    $(document).keyup(function(e) {
        input_key = 0;
        $("#page_footer").html("<p>tap " + input_key + "</p>");
        //// call game fn again here
        move_lr = 0;
        move_ud = 0;
        move_jump = 0;
    });
    console.log("ready?");
    
    
    //runLoop();
    setupDrawFunctionsB();
    
});