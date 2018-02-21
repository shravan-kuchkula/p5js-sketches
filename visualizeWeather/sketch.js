var mydata;
var mapimg;

var snow;
var foggy;
var mild;
var nice;
var cloudy;
var cold;
var summer;
var rain;
var mist;
var hot;
var milder;


var clat=0;
var clon=0;

var zoom=1;

var api = 'http://api.openweathermap.org/data/2.5/group?id=';
var cities = '524901,703448,2643743,2063523,2147714,149590,3369157,3451189,3531673,5128638,5368381,4691930,6173331,5870294,1269843';
//var cities = '524901,703448,2643743';
var units = '&units=metric';
var apiKey = '&appid=9cc3b51af34536d164280b4c8167b062';

// 2063523 - Perth
// 2147714 - Sydney
// 149590 - Tanzania
// 3369157 - Cape Town 
// 3451189 - Rio


function preload(){
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,1,0/1024x1024?access_token=pk.eyJ1Ijoic2hyYXZhbi1rdWNoa3VsYSIsImEiOiJjamR2MDl0c2YxZzB3MnFsbGVyYmFzd2tjIn0.a0O3tbgq4XUimt8JzGGEhg');
  var url = api + cities + units + apiKey;
  //var url = 'http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric&appid=9cc3b51af34536d164280b4c8167b062';
  loadJSON(url, gotData);
  
  snow = loadImage('images/001-nature-1.png');
  foggy = loadImage('images/002-weather-2.png');
  mild = loadImage('images/003-summer-2.png');
  nice = loadImage('images/004-summer-1.png');
  cloudy = loadImage('images/005-weather-1.png');
  cold = loadImage('images/006-nature.png');
  summer = loadImage('images/007-summer.png');
  rain = loadImage('images/008-weather.png');
  mist = loadImage('images/009-cloud.png');
  hot = loadImage('images/010-sunny.png');
  milder = loadImage('images/011-contrast.png');
}

function gotData(data){
  mydata = data;
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
  //translate(width / 2, height / 2);
  //imageMode(CENTER);
  //image(mapimg, 0, 0);
  
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimg, 0, 0);
  
  var cx = mercX(clon);
  var cy = mercY(clat);
  
  if(mydata){
    
    for (var i = 0; i < mydata.cnt; i++){
      
      print(i);
      
      var lat = mydata.list[i].coord.lat;
      var lon = mydata.list[i].coord.lon;
      
      var x = mercX(lon) - cx;
      var y = mercY(lat) - cy;
      
      print(x);
      print(y);
      
      print(mydata.list[i].weather[0].main);

      
      if (mydata.list[i].weather[0].main == "Clouds"){
        image(cloudy, x, y);
      } else if (mydata.list[i].weather[0].main == "Clear"){
        image(summer, x, y);
      } else if (mydata.list[i].weather[0].main == "Haze"){
        image(foggy, x, y);
      } else if (mydata.list[i].weather[0].main == "Mist"){
        image(mist, x, y);
      } else if (mydata.list[i].weather[0].main == "Drizzle"){
        image(rain, x, y);
      } else {
        //console.log(weather.list[i].weather.main)
        image(milder, x, y);
      }
      
      
    }
    
  }
}

function draw() {
  

  
}