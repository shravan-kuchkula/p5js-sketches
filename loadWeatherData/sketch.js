var weather;

var api = 'http://api.openweathermap.org/data/2.5/weather?zip=';
//var zipcode = '07059';
var country = ',us';
var units = '&units=metric';
var apiKey = '&appid=9cc3b51af34536d164280b4c8167b062';

var input;

function setup() {
  createCanvas(400, 200);
  
  var button = select('#submit');
  button.mousePressed(weatherAsk); 
  
  input = select('#city');

}

function weatherAsk(){
  
  var url = api + input.value() + country + units + apiKey;
  loadJSON(url, gotData, 'jsonp');
  
}

function gotData(data) {
  //print(data);
  weather = data;
}



function draw() {
  background(0);
  
  if (weather){
    
    ellipse(100, 100, weather.main.temp, weather.main.temp);
    ellipse(300, 100, weather.main.humidity, weather.main.humidity);
    
  }
  
}