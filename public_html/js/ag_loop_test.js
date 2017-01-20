/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready( function() {
    //$("#my_canvas").
    
    
    
    setupDrawFunctions();
    
    guy.y = 32;
    //var screen = getScreenPointer(0);
    //screen.putImageData(platform_a, 0,0);
    drawSprite_40_8(platform_a, 0,0,0,0, 0, 0);
    drawSprite_16(guy_a,16,16,0,0, 0,0);
    drawScoreWords();
    alert(tiles_a);
    var square = cutTile("tiles1", 0, 10);
    //alert(square);
    drawTile_8(square, 0,0,0,0, 0,0)
    
    
    //drawLevel(0);
});
