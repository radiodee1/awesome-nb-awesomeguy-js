/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* helper functions for worker thread */

var worker ;

var graph_running = false;
var graph = [];


function graphCheckForWorkers() {
    if (typeof(Worker) !== "undefined") {
        preferences_graph = true;
    } else {
        preferences_graph = false;
        console.log("no worker support");
    }
}

function graphInit() {
    if (! preferences_graph ) return;
    worker = new Worker("js/ag_graph.js");
    
    worker.onmessage = function(e) {
        graph_running = false;
        var data = e.data;
        switch( data.cmd) {
            case 'log':
            case 'test':
                console.log(data.value);
                break;
            case 'sprites':
                console.log(data.value);
                break;
        }
    };
    worker.onerror = function(e) {
        console.log('Error: Line ' + e.lineno + ' in ' + e.filename + ': ' + e.message);
    };
    graphTest();
    
}

function graphTest() {
    worker.postMessage({'cmd': 'test', 'value': 'hello'});
}

function graphSet() {
    if (graph_running) return;
    sprite[0].x = guy.x;
    sprite[0].y = guy.y;
    worker.postMessage({'cmd':'set', 'value' : {'sprite': sprite ,'graph': map_objects } });
    graph_running = true;
}

function graphFromMap() {
    var m = map_objects;
    var floor = [];
    var ladder = [];
    var drop = [];
    var string_ladder = [];
    var string_floor = [];
    var string_drop = [];
    
    // floor first //
    for (j = 0; j < level_h; j ++) {
        for (i = 0; i < level_w; i ++) {
            /////////////////////// conditions //////////////////
            if ( j + 1 < level_w && m[i][j + 1] === AG.B_BLOCK && m[i][j] === AG.B_SPACE) {
                floor.push( graphNode(i,j) );
                string_floor.push( JSON.stringify(graphNode(i,j)) )
            }
            if (  j + 1 < level_w && i - 1 >= 0 && m[i][j] === AG.B_SPACE && m[i-1][j+1] === AG.B_BLOCK && m[i][j+1] === AG.B_SPACE) {
                floor.push( graphNode(i,j) ); // overhang on right
                string_floor.push( JSON.stringify(graphNode(i,j)) )

                drop.push(graphNode(i,j) );
                string_drop.push( JSON.stringify(graphNode(i,j)) )

            }
            if ( j + 1 < level_w && i + 1 < level_h  && m[i][j] === AG.B_SPACE &&  m[i+ 1][j+1] === AG.B_BLOCK && m[i][j+1] === AG.B_SPACE) {
                floor.push( graphNode(i,j) ); // overhang on left
                string_floor.push( JSON.stringify(graphNode(i,j)) )

                drop.push( graphNode(i,j) );
                string_drop.push( JSON.stringify(graphNode(i,j)) )

            }
        }
    }
    // ladder next //
    for (j = 0; j < level_h; j ++) {
        for(i = 0; i < level_w; i ++) {
            if (m[i][j] === AG.B_LADDER) {
                ladder.push( graphNode(i,j) );
                string_ladder.push( JSON.stringify(graphNode(i,j)) )

            }
            if (j + 1 < level_h && m[i][j] === AG.B_SPACE && m[i][j+1] === AG.B_LADDER) {
                ladder.push( graphNode(i,j) );
                string_ladder.push( JSON.stringify(graphNode(i,j)) )

            }
        }
    }
    ////////// further processing ////////////
    // detect skip from drop //
    var len = drop.length;
    for (z = 0; z < len; z++ ) {
        var obj = string_drop[z];
        var j = drop[z];
        console.log(obj + " " + j.x + " " + j.y);
        
    }
}

function isInList(obj, list) {
    var temp = false;
    if (list.indexOf(obj) !== -1) temp = true;
    return temp;
}

function graphNode(x,y ) {
    return {'x':x,'y':y};
}

function graphEdge(startx, starty, stopx, stopy) {
    return {'x1': startx, 'y1': starty, 
        'x2': stopx, 'y2':stopy, 
        'cost': Math.pow(startx - stopx,2) + Math.pow(starty - stopy, 2)};
}