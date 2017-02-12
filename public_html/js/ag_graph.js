/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*  worker thread */

class AG {};
    
AG.UP = 38;
AG.DOWN = 40;
AG.LEFT = 37;
AG.RIGHT = 39;
AG.JUMP = 90;

var HIGH = 99999;

var graph = [];
var sprite_edges = [];
var sprite = [];
var destination_nodes = [];

var startx = 0;
var starty = 0;
var start_sort = 0;

var active_monster_string = "super_monster";

importScripts("ag_graph_extra.js");


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
        case "monsterName":
        case 'monster':
            active_monster_string = e.data.value;
    }
  
}

function test(val) {
    self.postMessage({'cmd':'test','value':val});
}

function graphSet(val) {
    graph = val.graph;
    sprite = val.sprite;
    sprite_edges = [];
    
    graphExtraEdges();
    graphInit();
    
    graphSolve();
    //graphModifySprite();
    
    self.postMessage({'cmd':'log', 'value': "sprites " + val.sprite.length + " graph "+ val.graph.length +" END" });
    self.postMessage({'cmd':'sprites', 'value': sprite });

}

function graphExtraEdges() {
    test("new edges");
    var count = 0;
    var position = 0;
    checkEdges(sprite[0], "guy");
    var i = 1;
    for (i = 1; i < sprite.length; i ++ ) {
        //test( " sprite --- " + i + " " + sprite[i].type);
        if (sprite[i].type === active_monster_string) {
            count ++;
            position = i;
            checkEdges(sprite[i]);
            //test("monster_count " + i + " " + active_monster_string + " " + sprite.length);
        }
    }
    test("sprite_edges " + sprite_edges.length + " " + count + " " + position + " " + sprite.length);
}

function checkEdges(s, type="super_monster") {
    var xloc = Math.floor(s.x  / 8);
    var yloc = Math.floor((s.y )/ 8)  + 1;// Math.floor(s.bottomBB/16 );
    test(typeof s + " " + JSON.stringify(s));
    if (type === "guy") {
        startx = xloc;
        starty = yloc ;
        start_sort = yloc * level_w_local + xloc;
        //test("guy "+ xloc +" "+ yloc);
    }
    else {
        yloc = Math.floor(s.y / 8 ) -0;
        destination_nodes.push( graphNode(xloc, yloc) );
        s.node = yloc * level_w_local + xloc;
        //test("monster " + xloc + " " + yloc);
    }
    var i = 0;
    for (i = 0; i < graph.length; i ++) {
        var x1 = graph[i].x1;
        var y1 = graph[i].y1;
        var x2 = graph[i].x2;
        var y2 = graph[i].y2;
        //test("graph " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + type);
        if ( ((x1 > xloc && xloc > x2) || (x1 < xloc && xloc < x2) ) && y1 === y2 && yloc === y1) {
            // make a new horizontal edge
            //test("horizontal "+ x1 + " " + y1 + " " + x2 + " " + y2 + " " + type);
            if (type !== "guy") {
                sprite_edges.push( graphEdge( x1, y1, xloc, yloc, type) ); // one way...!
                //sprite_edges.push( graphEdge( x2, y2, xloc, yloc, type) ); // one way...!
            }
            else {
                sprite_edges.push( graphEdge( xloc, yloc, x1, y1, type) ); // one way...!
                //sprite_edges.push( graphEdge( xloc, yloc, x2, y2, type) ); // one way...!
            }
        }
        else if ( ((y1 > yloc && yloc > y2) || (y1 < yloc && yloc < y2) ) && x1 === x2 && xloc === x1) {
            // make a new vertical edge
            //test("vertical "+ x1 + " " + y1 + " " + x2 + " " + y2 + " " + type);
            if (type !== "guy") {
                sprite_edges.push( graphEdge( x1, y1, xloc, yloc, type) ); // one way...!
                //sprite_edges.push( graphEdge( x2, y2, xloc, yloc, type) ); // one way...!
            }
            else {
                sprite_edges.push( graphEdge( xloc, yloc, x1, y1, type) ); // one way...!
                //sprite_edges.push( graphEdge( xloc, yloc, x2, y2, type) ); // one way...!
            }
        }
        else if (x1 === xloc && y1 === yloc) {
            // duplicate existing node?
            //test("dup "+ x1 + " " + y1 + " " + x2 + " " + y2 + " " + type);
        }
        else {
            //test("problem graph " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + type);

        }
    }
}

function graphInit() {
    test("zero out prev and dist");
    var i = 0;
    for (i = 0; i < graph.length; i ++) {
        graph[i].prev = -1;
        graph[i].dist = HIGH;
    }
    var i = 0;
    for (i = 0; i < sprite_edges.length; i ++) {
        sprite_edges[i].prev = -1;
        sprite_edges[i].dist = 0;
    }
    sprite_edges.sort(function(a, b) {
        return (a.sort) - (b.sort);
    });
}

function graphSolve() {
    test("solve " + start_sort + " new-edges:" + sprite_edges.length);
    var loop = true;
    var count = 0;
    var sort = start_sort;
    while(loop) {
        // start going over graph.
        //test("prev " + getPrev(sort));
        if (getPrev(sort) === -1 || true) {
            //test("here");
            
            var list = [];
            var i = 0;
            for (i = 0; i < graph.length; i ++) {
                if (graph[i].sort === sort) list.push(graph[i]);
            }
            var i = 0;
            for (i = 0; i < sprite_edges.length; i ++) {            
                if (sprite_edges[i].sort === sort) list.push(sprite_edges[i]);
            }
            if (list.length > 0) sort = followGraph(list);
            else sort++;
        }
        count ++;
        if (count > graph.length / 2 + 4) loop = false;
    }
}

function followGraph(list) {
    //test(list.length + " length " + JSON.stringify(list[0]));
    var new_sort = list[0].sort;
    var min = HIGH;//level_w_local;
    var i = 0;
    var dist_here = getDist(list[0].sort);

    for (i = 0; i < list.length; i ++) {
    test(list.length + " length " + JSON.stringify(list[i]));
        
        if(list[i].cost < min) {
            min = list[i].cost;
            new_sort = list[i].to;
            //var some_prev = getPrev(list[i].to);
            //if (some_prev === -1) {
            //    setDist(list[i].to , dist_here + list[i].cost);
            //}
        }
    }
    //var dist_old = getDist(new_sort);
    
    //var dist_next = dist_here + min;
    
    var i = 0;
    for (i = 0; i < list.length; i ++ ) {
        if (getDist(list[i].to) > list[i].cost + getDist(list[0].from) && list[i].prev === -1) {
            setPrev(new_sort, list[0].sort);
            setDist(new_sort, getDist(list[i].to) + list[i].cost);
            test(" ------ prev and dist ------ " + JSON.stringify(list[i]));

        }    
    }
    //var dist_here = getDist(list[0].sort);
    
    
    
    
    return new_sort;
    
}

function graphModifySprite() {
    test("modify sprite for return");
    var i = 0;
    for (i = 0; i < sprite.length; i ++ ) {
        if (sprite[i].type === active_monster_string) {
            var j = 0;
            for (j = 0; j < destination_nodes.length; j ++) {
                if (destination_nodes[j].sort ===  sprite[i].node   ) {
                    // check four directions... look in prev
                    var prev = getPrev(sprite[i].node);
                    var xloc = Math.floor(sprite[i].x / 8);
                    var yloc = Math.floor(sprite[i].y / 8);
                    var edge = getEdgeByPrev(sprite[i].node, prev);
                    
                    test(JSON.stringify(edge));
                    if (typeof edge !== 'undefined') {
                        sprite[i].move = 0;
                        if (edge.x1 === edge.x2) {
                            if (yloc > edge.y1) {
                                sprite[i].move = AG.UP;
                                sprite[i].barrierx = edge.x1;
                                sprite[i].barriery = edge.y1;
                            }
                            else if (yloc < edge.y1) {
                                sprite[i].move = AG.DOWN;
                                sprite[i].barrierx = edge.x2;
                                sprite[i].barriery = edge.y2;
                            }
                        }
                        if (edge.y1 === edge.y2) {
                            if (xloc > edge.x1) {
                                sprite[i].move = AG.LEFT;
                                sprite[i].barrierx = edge.x1;
                                sprite[i].barriery = edge.y1;
                            }
                            else if (xloc < edge.x1) {
                                sprite[i].move = AG.RIGHT;
                                sprite[i].barrierx = edge.x2;
                                sprite[i].barriery = edge.y2;
                            }
                        }
                    }
                    //////
                }
            }
        }
    }
}

function graphCancel(val) {
    
}

function getEdgeByPrev(node, prev){
    var i = 0;
    for (i = 0; i < sprite_edges.length; i ++ ) {
        if (sprite_edges[i].sort === node && sprite_edges[i].to === prev) return sprite_edges[i];
    }
    var i = 0;
    for (i = 0; i < graph.length; i ++ ) {
        if (graph[i].sort === node && graph[i].to === prev) return graph[i];
    }
}

function setPrev(label, val) {
    var i = 0;
    for (i = 0; i < graph.length; i ++) {
        if (label === graph[i].sort ) graph[i].prev = val;
    }
    var i = 0;
    for (i = 0; i < sprite_edges.length; i ++) {
        if (label === sprite_edges[i].sort) sprite_edges[i].prev = val;
    }
}

function setDist(label, val) {
    var i = 0;
    for (i = 0; i < graph.length; i ++) {
        if (label === graph[i].sort ) graph[i].dist = val;
    }
    var i = 0;
    for (i = 0; i < sprite_edges.length; i ++) {
        if (label === sprite_edges[i].sort) sprite_edges[i].dist = val;
    }
}

function getDist(label) {
    var i = 0;
    for (i = 0; i < graph.length; i ++) {
        if (label === graph[i].sort ) {
            return graph[i].dist;
        }
    }
    var i = 0;
    for (i = 0; i < sprite_edges.length; i ++) {
        if (label === sprite_edges[i].sort) {
            return sprite_edges[i].dist;
        }
    }
    
}

function getPrev(label) {
    var i = 0;
    for (i = 0; i < graph.length; i ++) {
        if (label === graph[i].sort ) {
            return graph[i].prev;
        }
    }
    var i = 0;
    for (i = 0; i < sprite_edges.length; i ++) {
        if (label === sprite_edges[i].sort) {
            return sprite_edges[i].prev;
        }
    }
    
}