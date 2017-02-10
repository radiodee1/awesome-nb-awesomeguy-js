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
    
    if (graph_running || ! preferences_graph ) return;
    sprite[0].x = guy.x;
    sprite[0].y = guy.y;
    worker.postMessage({'cmd':'set', 'value' : {'sprite': sprite ,'graph': graph } });
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
                    (m[i][j] === AG.B_SPACE || m[i][j] === AG.B_PRIZE || m[i][j] === AG.B_BIBPRIZE || // m[i][j] === AG.B_LADDER ||
                    m[i][j] === AG.B_ONEUP || m[i][j] === AG.B_KEY || m[i][j] === AG.B_INITIAL_GOAL || m[i][j] === AG.B_GOAL)) {
                floor.push( graphNode(i,j) );
                string_floor.push( JSON.stringify(graphNode(i,j)) );
            }
            else if ( j + 1 < level_w && (m[i][j + 1] === AG.B_BLOCK )&& //|| m[i][j+1] === AG.B_LADDER )&& 
                    (m[i][j] === AG.B_SPACE || m[i][j] === AG.B_PRIZE || m[i][j] === AG.B_BIBPRIZE || m[i][j] === AG.B_LADDER ||
                    m[i][j] === AG.B_ONEUP || m[i][j] === AG.B_KEY || m[i][j] === AG.B_INITIAL_GOAL || m[i][j] === AG.B_GOAL)) {
                floor.push( graphNode(i,j) );
                string_floor.push( JSON.stringify(graphNode(i,j)) );
            }
            if (  j + 1 < level_w && i - 1 >= 0 && m[i][j] === AG.B_SPACE && m[i-1][j+1] === AG.B_BLOCK && m[i-1][j] === AG.B_SPACE && m[i][j+1] === AG.B_SPACE) {
                
                floor.push( graphNode(i,j) ); // overhang on right
                string_floor.push( JSON.stringify(graphNode(i,j)) );
                
                if(! isInList( JSON.stringify(graphNode(i,j)), string_drop )) {
                    drop.push(graphNode(i,j) );
                    string_drop.push( JSON.stringify(graphNode(i,j)) );
                }

            }
            if ( j + 1 < level_w && i + 1 < level_h  && m[i][j] === AG.B_SPACE &&  m[i+ 1][j+1] === AG.B_BLOCK && m[i+1][j] === AG.B_SPACE && m[i][j+1] === AG.B_SPACE) {
                
                floor.push( graphNode(i,j) ); // overhang on left
                string_floor.push( JSON.stringify(graphNode(i,j)) );
                
                if(! isInList( JSON.stringify(graphNode(i,j)), string_drop )) {
                    drop.push( graphNode(i,j) );
                    string_drop.push( JSON.stringify(graphNode(i,j)) );
                }
            }
        }
    }
    
    // ladder next //
    for (i = 0; i < level_w; i ++) {
        for(j = 0; j < level_h; j ++) { // level_h abd j
            if (m[i][j] === AG.B_LADDER) {
                ladder.push( graphNode(i,j) );
                string_ladder.push( JSON.stringify(graphNode(i,j)) );

            }
            if (j + 1 < level_h && m[i][j] === AG.B_SPACE && m[i][j+1] === AG.B_LADDER) {
                ladder.push( graphNode(i,j) );
                string_ladder.push( JSON.stringify(graphNode(i,j)) );

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
            graph.push( graphEdge(j.x,j.y, j.x, j.y+1,"drop") );
            graph.push( graphEdge(j.x, j.y+1, j.x, j.y, "drop") );
        }
        else if (j.y + 1 < level_h) {
            for (a = j.y +1 ; a < level_h; a ++ ) {
                if (a+1 < level_h && m[j.x][a] === AG.B_SPACE && m[j.x][a+1] === AG.B_BLOCK) {
                    var temp = graphEdge(j.x, j.y, j.x, a, "drop");
                    if (temp.cost !== 0 && temp.cost !== 1) {
                        graph.push( graphEdge( j.x,j.y, j.x, a, "drop") ); // one way... falling!
                        //console.log( JSON.stringify(graphEdge(j.x, j.y, j.x, a)) +" drop");
                        continue;
                    }
                }
            }
        }
    }
    
    
    var len = ladder.length  ;
    var start = graphNode(0,0);
    var stop = graphNode(0,0);
    var z = 0;
    
    while ( z < len) {
        
        if(z === 0) {
            if (2 < len) stop = ladder[2]
            start = ladder[0];
        }
        
        //console.log(ladder[z].y + " " + ladder[z+1].y + " raw"  );
        if ( ( z+2 < ladder.length && start.y !== ladder[z].y && (ladder[z+1].y) + 1  !== (ladder[z+2].y)  ) ||  (z >= len -1 ) ) {
            // push two edges
            
            var temp = graphEdge(start.x ,start.y, stop.x, stop.y,"ladder");
            if (temp.cost !== 0) {
                //console.log(z + " ladder "+ JSON.stringify(temp));
                
                graph.push( graphEdge(start.x, start.y, stop.x, stop.y, "ladder") );
                graph.push( graphEdge(stop.x, stop.y, start.x, start.y, "ladder" ) );
            }
            if (z+2 < ladder.length ) start = ladder[z+2];
            //z ++;
        }
        
        if (z + 2 < ladder.length) stop = ladder[z+2];// 1
        z+=1;
    }
    //graphLog(graph);
    var z = 0;
    var len = floor.length - 1;
    var start = graphNode(0,0);
    var stop = graphNode(0,0);
    while ( z < len) {
        
        if (z === 0) {
            var j = floor[z];
            start = j;
            stop = floor[z];
            
        }
        
        //console.log(JSON.stringify(j) + " " + start.x +" " + stop.x);
        
        if  ( ( z + 1 < floor.length //&& start.x !== floor[z+1].x 
                && floor[z].x +1 !== floor[z+1].x) || 
                isInList(JSON.stringify(floor[z]), string_ladder )  || 
                z >= floor.length -1 ){  
            // push two edges
            if (z-1 >= 0) stop = floor[z]; // temporarily!
            
            
            var temp = graphEdge(start.x,start.y, stop.x, stop.y, "floor");
            //console.log("line "+ JSON.stringify(temp) +" line");

            if (temp.cost !== 0) {
                graph.push( graphEdge(start.x, start.y, stop.x, stop.y , "floor") );
                graph.push( graphEdge(stop.x, stop.y, start.x, start.y , "floor") );
            }
            if (isInList(JSON.stringify(floor[z]), string_ladder ) ) {
                start = floor[z];
                //console.log("-------split-------")
            }
            else {
                start = floor[z +1];
            }
            
            if (z+2 < floor.length) stop = floor[z+2];
            j = floor[z + 1];
            z++;
        }
        else {
            
            
            //console.log(z + " here");
              
            j = floor[z];
            stop = floor[z+1];
            z++;
        }
        
    }
    
    //////////// sort graph //////////////////
    graph.sort(function(a, b) {
        return (a.sort) - (b.sort);
    });
    graphLog(graph);
}

function graphLog(graph) {
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
    return {'x': parseInt(x),'y': parseInt(y)};
}

function graphEdge(startx, starty, stopx, stopy, name="none") {
    return {'x1': startx, 'y1': starty, 
        'x2': stopx, 'y2':stopy, 
        'cost': Math.pow(startx - stopx,2) + Math.pow(starty - stopy, 2),
        'sort': starty * level_w + startx,
        'from': starty * level_w + startx,
        'to': stopy * level_w + stopx,
        'name': name
    };
}