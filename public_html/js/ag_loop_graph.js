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
    if (! preferences_graph) return;
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
            if ( j + 1 < level_w && (m[i][j + 1] === AG.B_BLOCK || m[i][j+1] === AG.B_LADDER )&& 
                    (m[i][j] === AG.B_SPACE || m[i][j] === AG.B_PRIZE || m[i][j] === AG.B_BIBPRIZE || 
                    m[i][j] === AG.B_ONEUP || m[i][j] === AG.B_KEY || m[i][j] === AG.B_INITIAL_GOAL || m[i][j] === AG.B_GOAL)) {
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
        //var obj = string_drop[z];
        var j = drop[z];
        //console.log(obj + " " + j.x + " " + j.y);
        if (j.y + 2 < level_h && m[j.x][j.y + 1] === AG.B_SPACE && m[j.x][j.y+2] === AG.B_BLOCK) {
            graph.push( graphEdge(j.x,j.y, j.x, j.y+1) );
            graph.push( graphEdge(j.x, j.y+1, j.x, j.y) );
        }
        if (j.y + 1 < level_h) {
            for (a = j.y +1 ; a < level_h; a ++ ) {
                if (a+1 < level_h && m[j.x][a] === AG.B_SPACE && m[j.x][a+1] === AG.B_BLOCK) {
                    graph.push( graphEdge( j.x,j.y, j.x, a) ); // one way... falling!
                    continue;
                }
            }
        }
    }
    len = ladder.length -1;
    var start = graphNode(0,0);
    var stop = graphNode(0,0);
    for (z = 0; z < len; z ++) {
        var j = ladder[z];
        if(z === 0) start = j;
        stop = j;
        if (start.y !== j.y && j.y + 1 !== ladder[z+1].y  ){// && start.x !== j.x ) {
            // push two edges
            var temp = graphEdge(start.x,start.y, stop.x, stop.y);
            console.log("ladder "+ JSON.stringify(temp));
            if (temp.cost !== 0) {
                graph.push( graphEdge(start.x, start.y, stop.x, stop.y) );
                graph.push( graphEdge(stop.x, stop.y, start.x, start.y ) );
            }
            start = ladder[z+1];
        }
        
    }
    len = floor.length - 1;
    var start = graphNode(0,0);
    var stop = graphNode(0,0);
    for (z = 0; z < len; z ++) {
        var j = floor[z];
        if (z === 0) start = j;
        stop = j;
        //console.log(JSON.stringify(j));

        if (start.x !== j.x && j.x + 1 !== floor[z+1].x ){  //&& start.y !== j.y ) {
            // push two edges
            var temp = graphEdge(start.x,start.y, stop.x, stop.y);
            if (temp.cost !== 0) {
                graph.push( graphEdge(start.x, start.y, stop.x, stop.y) );
                graph.push( graphEdge(stop.x, stop.y, start.x, start.y ) );
            }
            start = floor[z+1];
        }
        if ( isInList(JSON.stringify(j), string_ladder )){  //&& start.y !== j.y ) {
            // push two edges
            var temp = graphEdge(start.x,start.y, stop.x, stop.y);
            //console.log(JSON.stringify(temp));
            if (temp.cost !== 0) {
                graph.push( graphEdge(start.x, start.y, stop.x, stop.y) );
                graph.push( graphEdge(stop.x, stop.y, start.x, start.y ) );
            }
            start = j;
        }
        
    }
    //////////// sort graph //////////////////
    graph.sort(function(a, b) {
        return (a.sort) - (b.sort);
    });
    //graphLog();
}

function graphLog() {
    for(i = 0; i < graph.length; i ++) {
        console.log(JSON.stringify(graph[i]) + " graph " + i)
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
        'cost': Math.pow(startx - stopx,2) + Math.pow(starty - stopy, 2),
        'sort': starty * level_w + startx };
}