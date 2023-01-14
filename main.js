
//open weather api key cbc16625cf1d4c162797052ebd9c2095\
//postman insomnia

$(function(){
  let currDTValue = "";
  const fiveDaysOfWeather = []
  const APIKey = "cbc16625cf1d4c162797052ebd9c2095";
  let most_recent = JSON.parse(localStorage.getItem('most_recent')) || {}
  let saved_searches = JSON.parse(localStorage.getItem('savedSearches')) || [];
  let today = dayjs().format('dddd')
  let btnContainer= $('<div>')
  let targetLat = most_recent.lat || 44.97;
  let targetLon = most_recent.lon || -93.26;
  cityTabs()
  retrieve(targetLat, targetLon)
  
  function retrieve(targetLat, targetLon){
    getApiToday(`https://api.openweathermap.org/data/2.5/weather?lat=${targetLat}&lon=${targetLon}&appid=${APIKey}&units=imperial`)
    getApi5Day(`https://api.openweathermap.org/data/2.5/forecast?lat=${targetLat}&lon=${targetLon}&appid=${APIKey}&units=imperial`)  
  }

  function getApiToday(target) {
    console.log('today fired')
    fetch(target)
    .then( response => {return response.json()})
    .then( data => {parseWeather1(data)})
  }


  function getApi5Day(target){
    fetch(target)
   .then( response => {return response.json()})
  .then( data => {parseWeather5(data)})
  }

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
  }

  function parseWeather5(weather){
  $('.five-day').empty()
  console.log(weather)
    const threeHourArray = weather.list
    const day1 = threeHourArray[3]
    const day2 = threeHourArray[11]
    const day3 = threeHourArray[19]
    const day4 = threeHourArray[27]
    const day5 = threeHourArray[35]
    
    const middayArray = [day1,day2,day3,day4,day5]
    console.log(middayArray)

    middayArray.forEach(day=>{
      const currentDay = new dayjs().format('dddd:DD')
      const temp = `${parseInt(day.main.temp)}F°`
      const statusText = day.weather[0].description
      const statusIcon = $('<img id="dynamic">')
        .attr('src', `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`)
        .addClass('icon');
      const date = new dayjs(day.dt_txt).format('dddd-DD')   
      console.log(date)
      const cardDaddy = $('<div>').addClass('col card-daddy mb-5')
      const card = $('<div>').addClass('card', )
      const cardUl =$('<ul>').addClass('cardUl')
          .addClass('list-group', 'list-group-flush', 'weather-items')     

      $('.five-day').append(cardDaddy.append(card.append(cardUl
        .append($('<li>').text(date))
        .append($('<li>').text(statusText))
        .append(statusIcon)
        .append($('<li>').text(temp))
        .children().addClass('list-group-item'))))        
    })
  }
        
    

  $('#submitBtn').on('click', function(e){
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
    let newLocation = {key:data[0].name,lat:data[0].lat,lon:data[0].lon}
    
    for(var i = 0; i < saved_searches.length; i++) {
      if(saved_searches[i].key == newLocation.key) {
          saved_searches.splice(i, 1);
            break;}
          }
    saved_searches.push(newLocation)
    localStorage.setItem('savedSearches',JSON.stringify(saved_searches))  
    localStorage.setItem('most_recent', JSON.stringify(newLocation))
    retrieve(newLocation.lat, newLocation.lon)
  }
    
  function cityTabs(){
    saved_searches.forEach(city=>{
      btnContainer.empty()
      let cityBtn = $('<button>').text(city.key).addClass('cityBtn').attr('data-lat', city.lat).attr('data-lon', city.lon)
      $('header').append(btnContainer).append(cityBtn)
    })
  }    


  $('.cityBtn').on('click', function(e){
    targetLat = $(this).attr('data-lat')
    targetLon = $(this).attr('data-lon')
    e.preventDefault()
    retrieve(targetLat, targetLon)
  })
    
});

    //       });






