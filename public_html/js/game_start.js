/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

input_key = 0;
var move_lr = 0;
var move_ud = 0;
var MOVE_CONST = 3;

$(document).ready( function() {
    //alert("game start");
    //$("img").css("margin",0)
    //$("img").css("line-height", 0)
    //$("#page_content").html("<canvas id='my_canvas' width='256' height='192' style='border:1px solid #000000;' ></canvas>");
    
    $(document).keydown(function(e) {
        input_key = e.keyCode;
        $("#page_footer").html("<p>tap " + input_key  + "</p>");
        //// call game fn here
        if (input_key === 37) move_lr = - MOVE_CONST;//guy.x --;
        if (input_key === 38) move_ud = - MOVE_CONST; //guy.y --;
        if (input_key === 39) move_lr = MOVE_CONST;// ++;
        if (input_key === 40) move_ud = MOVE_CONST;
        //drawLevel(0);

    });
    
    $(document).keyup(function(e) {
        input_key = 0;
        $("#page_footer").html("<p>tap " + input_key + "</p>");
        //// call game fn again here
    });
});