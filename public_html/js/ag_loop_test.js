/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var Sprite = {
	x:0, 
        y:0, 
        animate:0,
	facingRight:0, 
        active:0, 
        visible:0,
	leftBB:0, 
        rightBB:0, 
        topBB:0, 
        bottomBB:0
};
 
//Sprite sprite[100];
var sprite = [];
for(i = 0; i < 100; i ++){
    sprite.push(Object.assign({},Sprite));
}
//sprite[10].x = 75;
//alert(sprite.length + " " + sprite[10].x);

var guy = Object.assign({},Sprite); 
var keySprite = Object.assign({},Sprite);
