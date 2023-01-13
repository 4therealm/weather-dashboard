
//open weather api key cbc16625cf1d4c162797052ebd9c2095\
//postman insomnia
$(function(){

  const APIKey = "cbc16625cf1d4c162797052ebd9c2095";
  let targetLat;
  let targetLon;

  let saved_searches = JSON.parse(localStorage.getItem('savedSearches')) || [];
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

  let newLocation = {
    key: city,
    lat: targetLat,
    lon: targetLon
  }

// if (saved_searches.indexOf(newLocation) !== -1) {
  saved_searches.push(newLocation)
  console.log(saved_searches)
  //console.log(JSON.stringify(saved_searches))
  const stringed = JSON.stringify(saved_searches)
  localStorage.setItem('savedSearches', stringed)  

  console.log( localStorage.getItem('savedSearches'))
  retrieve(targetLat, targetLon)
}




    
    
//     function cityTabs(){
//      saved_searches.forEach(city=>{
//        let cityBtn = $('<button>').text(city.key).addClass('cityBtn').attr('data-lat', city.lat).attr('data-lon', city.lon)
//        $('.nav-panel').append(cityBtn)
//        console.log(cityBtn)
//       })}
     
//   $('.cityBtn').on('click', function(e){
//     e.preventDefault()
// targetLat = $(this).attr('data-lat')
// targetLon = $(this).attr('data-lon')
// console.log(targetLat, targetLon)
// retrieve(targetLat, targetLon)
//   })
    
    
    });

    //       });






