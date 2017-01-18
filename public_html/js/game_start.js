/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

input_key = 0;


$(document).ready( function() {
    //alert("game start");
    //$("img").css("margin",0)
    //$("img").css("line-height", 0)
    //$("#page_content").html("<canvas id='my_canvas' width='256' height='192' style='border:1px solid #000000;' ></canvas>");
    
    $(document).keydown(function(e) {
        input_key = e.keyCode;
        $("#page_footer").html("<p>tap " + input_key  + "</p>");
        //// call game fn here

    });
    
    $(document).keyup(function(e) {
        input_key = 0;
        $("#page_footer").html("<p>tap " + input_key + "</p>");
        //// call game fn again here
    });
});