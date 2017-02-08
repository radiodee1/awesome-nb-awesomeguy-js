/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* helper functions for worker thread */

var worker ;

var graph_running = false;


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
    //graphSet();
}

function graphTest() {
    worker.postMessage({'cmd': 'test', 'value': 'hello'});
}

function graphSet() {
    if (graph_running) return;
    sprite[0].x = guy.x;
    sprite[0].y = guy.y;
    worker.postMessage({'cmd':'set', 'value': {'sprite': sprite ,'graph': map_objects } });
    graph_running = true;
}
