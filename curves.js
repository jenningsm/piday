
function pToC(r, theta){
  return [r * Math.cos(theta), r * Math.sin(theta)];
}

function drawCurveSet(set){
  var unit = Math.PI * 2 / set.symmetry;
  var curve = set.curve;
  for(var i = 0; i < set.symmetry; i++){
    var base = (i + set.offset) * unit;
    for(var j = 0; j < 2; j++){
      function convert(r, theta){
        theta *= (j === 0 ? 1 : -1);
        theta /= 2;
        theta *= set.horzscale;
        theta += j;
        theta *= unit;
        theta += base;
        r *= set.vertscale;
        r += set.base;
        var ret = pToC(r, theta);
        return [ret[0] + center[0], ret[1] + center[1]];
      }
  
      var points = [];
      for(var k = 0; k < curve.length / 2; k++){
        points = points.concat(convert(curve[k*2], curve[k*2 + 1]));
      }
      context.beginPath();
      context.moveTo(points[0], points[1]);
      context.bezierCurveTo(points[2], points[3], points[4], points[5], points[6], points[7]);
      context.lineWidth = 1;
  
      context.strokeStyle = 'rgba(0, 0, 0,' + set.alpha + ')';
      context.stroke();
    }
  }
}

function drawCurveScene(scene){
  for(var i = 0; i < scene.length; i++){
    drawCurveSet(scene[i]);
  }
}

function generateCurve(variability){
  var curve = [];
  function randDist(){
    return Math.random() * variability;
  }
  curve.push(randDist());
  curve.push(0);
  curve.push(randDist());
  curve.push(Math.random());
  curve.push(randDist());
  curve.push(Math.random());
  curve.push(randDist());
  curve.push(1);
  return curve;
}

function curveSet(curve, args){
  var cSet = {};
  var params = {'alpha' : 1, 'symmetry' : 21, 'offset' : 0, 'horzscale' : 1, 'base' : 0, 'vertscale' : 1};
  for(key in params){
    if(params.hasOwnProperty(key)){
      if(args.hasOwnProperty(key)){
        cSet[key] = args[key];
      } else {
        cSet[key] = params[key];
      }
    }
  }
  cSet.curve = curve;
  return cSet;
}

function generateCurveScene(curveGenerator, args, num){
  var curveSets = [];
  for(var i = 0; i < num; i++){
    var params = {};
    for(key in args){
      if(args.hasOwnProperty(key)){
        params[key] = args[key](i);
      }
    }
    curveSets.push(curveSet(curveGenerator(i), params));
  } 
  return curveSets;
}



