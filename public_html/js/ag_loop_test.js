/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready( function() {
    //$("#my_canvas").
    setGuyData();

    setTileMapData();
    setMonsterData();
    setMovingPlatformData();
    alert(tiles_a);

    drawSprite_16(guy_a, 0,0,0,0, 0, 0);
    drawScoreWords();
    
    
    
    //drawLevel(0);
});
