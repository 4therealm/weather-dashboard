
//open weather api key cbc16625cf1d4c162797052ebd9c2095\

$(function(){
 
      
      const APIKey = "cbc16625cf1d4c162797052ebd9c2095";
      
      
      const today = $('.today')
      const today_items = $(today).children()
      console.log(today_items)
getApi()      

function getApi() {
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






