
//open weather api key cbc16625cf1d4c162797052ebd9c2095\

$(function(){
 
      
      const APIKey = "cbc16625cf1d4c162797052ebd9c2095";
      
      
      const today = $('.today')
      const today_items = $(today).children()
      console.log(today_items)
// getApiToday()      
getApi5Day()
function getApiToday() {
    const currentWeather = 'https://api.openweathermap.org/data/2.5/weather?lat=46.72&lon=94.68&appid=cbc16625cf1d4c162797052ebd9c2095&units=imperial'
  
  fetch(currentWeather)
    .then(function (response) {
      return response.json();
      })
    .then(function (data) {
      console.log(data)
      const temperature = `${data.main.temp} F`
      const icon = data.weather[0].icon 
      const description = data.weather[0].description
      const feelsLike = data.main.feels_like
      $('#description').text(description)
      $('#temperature').text(temperature)
      $('#feels-like').text(feelsLike)
      })}
        
        
    


function getApi5Day() {
  const fiveDay = 'https://api.openweathermap.org/data/2.5/forecast?lat=46.72&lon=94.68&&appid=cbc16625cf1d4c162797052ebd9c2095&units=imperial'

  fetch(fiveDay)
    .then(response => {return response.json()})
    .then(data=>{
      const threeHourArray = data.list
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
        console.log(`the weather on ${date} will be ${statusText}
         with temps around ${temp}
        the icon code is ${statusIcon} `)
        
        const cardDaddy = $('<div>').addClass('col')
        const card = $('<div>')
            .addClass('card', )

        const cardUl =$('<ul>')
            .addClass('list-group', 'list-group-flush', 'weather-items')     

          $(cardUl).append($('<li>').text(date))
          $(cardUl).append($('<li>').text(statusText))
          $(cardUl).append($('<li>').text(statusIcon))
          $(cardUl).append($('<li>').text(temp))
          $(cardUl).children().addClass('list-group-item')
        card.append(cardUl)
        $(cardDaddy).append(card)
        $('.five-day').append(cardDaddy)
      })
    })



  
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






