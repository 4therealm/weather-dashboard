
//open weather api key cbc16625cf1d4c162797052ebd9c2095\
//postman insomnia
$(function(){

  const APIKey = "cbc16625cf1d4c162797052ebd9c2095";
  let targetLat;
  let targetLon;
  let most_recent = JSON.parse(localStorage.getItem('most_recent'))
  let saved_searches = JSON.parse(localStorage.getItem('savedSearches')) || [];
  let geoCode = `http://api.openweathermap.org/geo/1.0/direct?q=${location},001&appid=${APIKey}`
console.log(most_recent)
retrieve(44.64,-93.14)
cityTabs()
let today = dayjs().format('dddd')
console.log(today)
  function retrieve(targetLat, targetLon){
    getApiToday(`https://api.openweathermap.org/data/2.5/weather?lat=${targetLat}&lon=${targetLon}&appid=${APIKey}&units=imperial`)
    getApi5Day(`https://api.openweathermap.org/data/2.5/forecast?lat=${targetLat}&lon=${targetLon}&appid=${APIKey}&units=imperial`)  
  }

  function getApiToday(target) {
    console.log('today fired')
    fetch(target)
    .then( response => {return response.json()})
    .then( data => {parseWeather1(data)})}


  function getApi5Day(target){
    
    fetch(target)
   .then( response => {return response.json()})
  .then( data => {parseWeather5(data)})}

  function parseWeather1(weather){
    let day = $("<div>").addClass('col-12').append('<h1>').text(today)
      const city = $("<div>").addClass('col-12').append('<h1>').html(`${weather.name}`)
      const statusText =$("<div>").addClass('col-12').append('<p>').html(`Current weather ${weather.weather[0].description}`)
      const statusIcon =$("<div>").addClass('col-12').append($('<img id="dynamic">').attr('src', `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`).addClass('icon'));
      const temp = $("<div>").addClass('col-6').append('<h2>').html(`Current Temp ${parseInt(weather.main.temp)}F°`)
      const feels_like =$("<div>").addClass('col-4').append('<p>').html(`Feels like ${parseInt(weather.main.feels_like)}F°`)
      const temp_max =$("<div>").addClass('col-4').append('<p>').html( `high: ${parseInt(weather.main.temp_max)}F°`)
      const temp_min = $("<div>").addClass('col-4').append('<p>').html(`low: ${parseInt(weather.main.temp_min)}F°`)
      const humidity =$("<div>").addClass('col-4').append('<p>').html(` humidity: ${weather.main.humidity}%`)
      $('.today').empty()

      $('.today').append(city, day, temp, feels_like, statusText, statusIcon, temp_min, temp_max, humidity)
    
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
    // console.log(middayArray)

    middayArray.forEach(day=>{
      const temp = day.main.temp
      const statusText = day.weather[0].description
      const statusIcon = $('<img id="dynamic">').attr('src', `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`).addClass('icon');
      const date = dayjs(day.dt_txt).format('dddd')    
      const cardDaddy = $('<div>').addClass('col card-daddy')
      const card = $('<div>').addClass('card', )
      const cardUl =$('<ul>').addClass('cardUl')
          .addClass('list-group', 'list-group-flush', 'weather-items')     

        $(cardUl).append($('<li>').text(date))
        $(cardUl).append($('<li>').text(statusText))
        $(cardUl).append(statusIcon)
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
      // console.log(data)
      parseApi(data)})
  }




function parseApi(data){
  targetLat = data[0].lat;
  targetLon = data[0].lon;
  const country = data[0].country
  const state = data[0].state
  const city = data[0].name

  let newLocation = {
    key: city,
    lat: targetLat,
    lon: targetLon
  }
localStorage.setItem('most_recent', JSON.stringify(newLocation))
// if (saved_searches.indexOf(newLocation) !== -1) {
  saved_searches.push(newLocation)
  // console.log(saved_searches)
  
  localStorage.setItem('savedSearches',JSON.stringify(saved_searches))  

  // console.log( localStorage.getItem('savedSearches'))

}




    
    
    function cityTabs(){
     saved_searches.forEach(city=>{
       let cityBtn = $('<button>').text(city.key).addClass('cityBtn').attr('data-lat', city.lat).attr('data-lon', city.lon)
       $('.nav-panel').append(cityBtn)
       console.log(cityBtn)
      })}
     
  $('.cityBtn').on('click', function(e){
    e.preventDefault()
targetLat = $(this).attr('data-lat')
targetLon = $(this).attr('data-lon')
console.log(targetLat, targetLon)
retrieve(targetLat, targetLon)
  })
    // retrieve(most_recent.lat, most_recent.lon)
    
    });

    //       });






