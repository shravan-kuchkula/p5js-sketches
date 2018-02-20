var mapimg;

var clat=0;
var clon=0;

//40.654378, -74.462204
var lat = 40.654378;
var lon = -74.462204;

var zoom = 1;
var earthquakes;


function preload(){
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/0,0,1,0/1024x1024?access_token=pk.eyJ1Ijoic2hyYXZhbi1rdWNoa3VsYSIsImEiOiJjamR2MDl0c2YxZzB3MnFsbGVyYmFzd2tjIn0.a0O3tbgq4XUimt8JzGGEhg');
  earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
  //earthquakes = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv');
}

function mercX(lon){
  
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
  
}

function mercY(lat){
  
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}


function setup() {
  createCanvas(1024, 1024);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  
  var cx = mercX(clon);
  var cy = mercY(clat);
  
  for (var i = 0; i < earthquakes.length; i++){
    var data = earthquakes[i].split(/,/);
    //console.log(data);
    var lat = data[1];
    var lon = data[2];
    
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
  
    fill(255, 0, 255, 200);
    ellipse(x, y, 10, 10);
    
  }
  

  
}
