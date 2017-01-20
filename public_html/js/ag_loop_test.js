/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready( function() {
    //$("#my_canvas").
    
    setupDrawFunctions();
    
    alert(platform_a);
    
    //var screen = getScreenPointer(0);
    //screen.putImageData(platform_a, 0,0);
    drawSprite_40_8(platform_a, 0,0,0,0, 0, 0);
    drawSprite_16(guy_a, 0,0,0,0, 0,0);
    drawScoreWords();
    
    
    
    //drawLevel(0);
});
