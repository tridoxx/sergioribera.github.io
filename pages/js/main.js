var font, fontSize = 400;
var points;
var automatas = [];
var bg;

var eContent = document.getElementById("content-code");
eContent.innerHTML = errores[texto];

$(function(){
    $("#drop-botton-menu").hover(function(){
        $('#drop-menu').addClass('dropdown');
        $('#drop-menu').removeClass('dropdown-hidden');
    }, function(){
        // change to any color that was previously used.
        $('#drop-menu').addClass('dropdown-hidden');
        $('#drop-menu').removeClass('dropdown');
    });
    $("#drop-botton-menu").click(function(){
        $('#drop-menu').addClass('dropdown');
        $('#drop-menu').removeClass('dropdown-hidden');
    });
});

function preload() {
  font = loadFont('lib/AvenirNextLTPro-Demi.otf');
  bg = loadImage('img/abstract.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(100);
    eContent.style.color =  color(random(200, 255), random(230, 255), random(60, 75));
    fontSize = Math.abs(((windowWidth - fontSize) * 2) - 50);
    fontSize = fontSize > 320 ? 320 : fontSize;
    x = (windowWidth / 2) - ((fontSize / 2) + 125);
    y = (windowHeight / 2) + 75;

    points = font.textToPoints(texto, x, y, fontSize, {
        sampleFactor: 0.12,
    });

    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var c = color(random(200, 255), random(230, 255), random(60, 75));
        var automata = new Automata(pt.x, pt.y, c);
        automatas.push(automata);
    }
    document.onresize = ()=>{
        document.getElementById('defaultCanvas0').width = window.innerWidth;
        document.getElementById('defaultCanvas0').height = window.innerHeight;
    };
}

function draw() {
    background(15);
    //imageMode(CENTER);
    //image(bg, width/2, height/2);
    for (var i = 0; i < automatas.length; i++) {
        var v = automatas[i];
        v.behaviors();
        v.update();
        v.show();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(100);
    fontSize = Math.abs(((windowWidth - fontSize) * 2) - 50);
    fontSize = fontSize > 320 ? 320 : fontSize;
    x = (windowWidth / 2) - ((fontSize / 2) + 125);
    y = (windowHeight / 2) + 75;

    points = font.textToPoints(texto, x, y, fontSize, {
        sampleFactor: 0.12,
    });
    automatas = [];
    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var c = color(random(200, 255), random(200, 255), random(60, 75));
        var automata = new Automata(pt.x, pt.y, c);
        automatas.push(automata);
    }
}