
//open weather api key cbc16625cf1d4c162797052ebd9c2095\
//postman insomnia
$(function(){

  const APIKey = "cbc16625cf1d4c162797052ebd9c2095";
  let targetLat;
  let targetLon;



  let geoCode = `http://api.openweathermap.org/geo/1.0/direct?q=${location},001&appid=${APIKey}`




function retrieve(targetLat, targetLon){
getApiToday(`https://api.openweathermap.org/data/2.5/weather?lat=${targetLat}&lon=${targetLon}&appid=${APIKey}&units=imperial`)
getApi5Day(`https://api.openweathermap.org/data/2.5/forecast?lat=${targetLat}&lon=${targetLon}&appid=${APIKey}&units=imperial`)  
}

function getApiToday(target) {
  fetch(target)
  .then( response => {return response.json()})
  .then( data => {parseWeather1(data)})}


function getApi5Day(target){
  fetch(target)
  .then( response => {return response.json()})
  .then( data => {parseWeather5(data)})}

function parseWeather1(weather){
  console.log(weather)
}

function parseWeather5(weather){
$('.five-day').empty()
  const threeHourArray = weather.list
  const day1 = threeHourArray[3]
  const day2 = threeHourArray[11]
  const day3 = threeHourArray[19]
  const day4 = threeHourArray[27]
  const day5 = threeHourArray[35]
  
  const middayArray = [day1,day2,day3,day4,day5]
  console.log(middayArray)

  middayArray.forEach(day=>{
    const temp = day.main.temp
    const statusText = day.weather[0].description
    const statusIcon = day.weather[0].icon
    const date = day.dt_txt    
    const cardDaddy = $('<div>').addClass('col')
    const card = $('<div>').addClass('card', )
    const cardUl =$('<ul>')
        .addClass('list-group', 'list-group-flush', 'weather-items')     

      $(cardUl).append($('<li>').text(date))
      $(cardUl).append($('<li>').text(statusText))
      $(cardUl).append($('<li>').text(statusIcon))
      $(cardUl).append($('<li>').text(temp))
      $(cardUl).children().addClass('list-group-item')
      
      card.append(cardUl)
      cardDaddy.append(card)
      $('.five-day').append(cardDaddy)
  })
}
        
    





$('#submitBtn').on('click', function(e){
 console.log('clicked')
  e.preventDefault()
  let searchInput = $(this).next().val()
  getCoordinates(searchInput)
})


function getCoordinates(location){
  let geoCode = `http://api.openweathermap.org/geo/1.0/direct?q=${location},001&appid=${APIKey}`
  fetch(geoCode)
  .then(response =>{return response.json();})
  .then(data => {
    console.log(data)
    parseApi(data)})
}




function parseApi(data){
targetLat = data[0].lat;
targetLon = data[0].lon;
const country = data[0].country
const state = data[0].state
const city = data[0].name
console.log(`lat: ${targetLat}, lon: ${targetLon}, ${city}, ${state}, ${country}`)

retrieve(targetLat, targetLon)

}
    
    
    
    
    
    });
    //         let object = [temperature, icon, description]
            
    //         object.forEach(thing =>{
    //           let block = document.createElement('div')
    //           block.textContent = thing
    //           console.log(block)
    //           cBody.append(block)
    //         })
            
    //  console.log(object)
    //         // console.log(data)
    //         // console.log(data.coord)
    //         // console.log(description)
    //         // // console.log(humidity)
    //         // console.log(temperature + 'F')
    //         // console.log(data.weather[0].icon)
            
    //       });






