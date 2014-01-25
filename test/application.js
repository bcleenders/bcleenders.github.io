var container = $('#rect_container');

var blocks = [];

for(var i = 0; i < 12; i++) {
    $('<div id="rect' + i+ '_0" class="rect rect_hasleftborder"><img class="rect_image" src="imgs/invisible_rectangle.png"/></div>').appendTo(container);
    
    for(var j = 1; j < 24; j++) {
        $('<div id="rect' + i + '_' + j + '" class="rect"><img class="rect_image" src="imgs/invisible_rectangle.png"/></div>').appendTo(container);
    }
}

for(var i = 0; i < 12; i++) {
    for(var j = 0; j < 24; j++) {
        blocks.push($('#rect'+ i + '_' + j));
    }
}

function randOrd(){
    return (Math.round(Math.random())-0.5); 
}

var startSuits = function(changeTo) {
    var goLight = true;
    blocks =  blocks.sort(randOrd);
    var i = 0;
    var innerInterval = setInterval(function() {
        if(goLight)
            blocks[i].addClass(changeTo);
        else
            blocks[i].removeClass(changeTo);
        
        i++;

        if(i >= blocks.length) {
            i = 0;
            goLight = ! goLight;
        }
    }, 25);
}

startSuits('rect_light');