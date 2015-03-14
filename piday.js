
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var width  = window.innerWidth;
var height = window.innerHeight;

canvas.width = width;
canvas.height = height;
var center = [width / 2, height / 2];

context.rect(0, 0, width, height);
context.fillStyle = 'white';
context.fill();

var img = new Image();

var imgdim = 130;
function drawImage(){
  context.drawImage(img, center[0] - imgdim / 2, center[1] - imgdim / 2, imgdim, imgdim);
}

img.addEventListener('load', drawImage);
img.src = "pi.png";


///////////////////////////////


var cs = [];
var two = []
var c = [150, 0, 150, .15, 80, .6, 200, 1];
for(var i = 0; i < 20; i++){
  cs.push(curveSet(c, {'alpha' : .7 / (i+1), 'symmetry' : 21, 'vertscale' : Math.pow(1.1, i)}));
}
for(var i = 0; i < 150; i++){
  two.push(curveSet(c, {'alpha' : .7 / (Math.sqrt(i)+1), 'symmetry' : 21, 'base' : i * 10, 'vertscale' : 1}));
}


function alpha(i){
  return .5 / (Math.pow(i, 1/3)+1);
}
function symmetry(){
  return 21;
}
function base(i){
  return 100 + i * 3;
}
function curve(){
  return generateCurve(75);
}
var g = generateCurveScene(curve, {'alpha' : alpha, 'symmetry' : symmetry, 'base' : base}, 250);

drawCurveScene(g);
  
