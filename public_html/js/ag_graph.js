/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*  worker thread */
var graph = [];
var sprite_edges = [];
var sprite = [];
var destination_nodes = [];

var startx = 0;
var starty = 0;
var start_sort = 0;

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
    graphModifySprite();
    
    self.postMessage({'cmd':'log', 'value': "sprites " + val.sprite.length + " graph "+ val.graph.length });
    self.postMessage({'cmd':'sprites', 'value': sprite });

}

function graphExtraEdges() {
    test("new edges");
    for (i = 0; i < sprite.length; i ++ ) {
        test( " sprite " + i);
        if (sprite[i].type === "super_monster") {
            checkEdges(sprite[i]);
        }
    }
    checkEdges(sprite[0], "guy");
}

function checkEdges(s, type="super_monster") {
    var xloc = Math.floor(s.x / 8);
    var yloc = Math.floor(s.y / 8);
    if (type === "guy") {
        startx = xloc;
        starty = yloc;
        start_sort = yloc * level_w_local + xloc;
    }
    else {
        destination_nodes.push( graphNode(xloc, yloc) );
    }
    for (i = 0; i < graph.length; i ++) {
        var x1 = graph[i].x1;
        var y1 = graph[i].y1;
        var x2 = graph[i].x2;
        var y2 = graph[i].y2;
        if ( x1 < xloc && xloc < x2 && y1 === y2 && yloc === y1) {
            // make a new horizontal edge
            if (type !== "guy") {
                sprite_edges.push( graphEdge( x1, y1, xloc, yloc, type) ); // one way...!
                sprite_edges.push( graphEdge( x2, y2, xloc, yloc, type) ); // one way...!
            }
            else {
                sprite_edges.push( graphEdge( xloc, yloc, x1, y1, type) ); // one way...!
                sprite_edges.push( graphEdge( xloc, yloc, x2, y2, type) ); // one way...!
            }
        }
        else if ( y1 < yloc && yloc < y2 && x1 === x2 && xloc === x1) {
            // make a new vertical edge
            if (type !== "guy") {
                sprite_edges.push( graphEdge( x1, y1, xloc, yloc, type) ); // one way...!
                sprite_edges.push( graphEdge( x2, y2, xloc, yloc, type) ); // one way...!
            }
            else {
                sprite_edges.push( graphEdge( xloc, yloc, x1, y1, type) ); // one way...!
                sprite_edges.push( graphEdge( xloc, yloc, x2, y2, type) ); // one way...!
            }
        }
        else if (x1 === xloc && y1 === yloc) {
            // duplicate existing node?
        }
        else {
            
        }
    }
}

function graphInit() {
    test("zero out prev and dist");
}

function graphSolve() {
    test("solve");
}

function graphModifySprite() {
    test("modify sprite for return");
}

function graphCancel(val) {
    
}

function setPrev(label, val) {
    for (i = 0; i < graph.length; i ++) {
        if (label === graph[i].sort ) graph[i].prev = val;
    }
    for (i = 0; i < sprite_edges.length; i ++) {
        if (label === sprite_edges[i].sort) sprite_edges[i].prev = val;
    }
}

function setDist(label, val) {
    for (i = 0; i < graph.length; i ++) {
        if (label === graph[i].sort ) graph[i].dist = val;
    }
    for (i = 0; i < sprite_edges.length; i ++) {
        if (label === sprite_edges[i].sort) sprite_edges[i].dist = val;
    }
}