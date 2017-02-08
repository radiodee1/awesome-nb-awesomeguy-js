/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




/*  worker thread */


self.onmessage = function(e) {
    switch (e.data.cmd ) {
        case 'test':
            test(e.data.value);
            break;
        case "graphSet":
        case 'set':
            graphSet(e.data.value);
            break;
        case "graphCancel":
        case 'cancel':
            graphCancel(e.data.value);
            break;
            
            
    }
  
}

function test(val) {
    self.postMessage({'cmd':'test','value':val});
}

function graphSet(val) {
    self.postMessage({'cmd':'log', 'value': "sprites " + val.sprite.length + " map "+ val.graph.length });
}

function graphCancel(val) {
    
}