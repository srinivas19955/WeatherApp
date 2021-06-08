import { Component, OnInit } from '@angular/core';
import { WeatherService } from './../services/weather.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private ws: WeatherService) { }

  ngOnInit() {
    console.log('******************************');
    this.weatherDataArray = JSON.parse(localStorage.getItem('weatherDataSource'));
    console.log(this.weatherDataArray);
  }
  isSpinner=false;
  weatherData = { zipcode: "", data: "", forecastLink: "",icon:"" };
  weatherDataArray: any = [];
  weatherForm = new FormGroup({
    zipcode: new FormControl('',[
      Validators.required,
      Validators.pattern("^(?!0{3})[0-9]{5}$")
    ])
  });
  getzipcode(){
    return this.weatherForm.get('zipcode').value
  }
  onSubmit () {
    this.isSpinner=true;
    this.getWeatherData(this.getzipcode());
    this.weatherForm.reset();
  }
    getWeatherData(zipcode){
    this.ws.addWeatherData(zipcode).subscribe(
      result => {
        this.isSpinner=false;
        this.weatherData.data = result;
        this.weatherData.zipcode = zipcode;
        this.weatherData.forecastLink=this.weatherData.forecastLink =
            'forecast/' + this.weatherData.zipcode;
        console.log(this.weatherData.data);
        if (this.weatherData.data != null && this.weatherData.data != "" ) {
          let index=this.findById(this.weatherData.zipcode)
          if(index!=-1){
            this.weatherDataArray[index].zipcode=this.weatherData.zipcode;
            this.weatherDataArray[index].data=this.weatherData.data;
            localStorage.setItem(
              'weatherDataSource',
              JSON.stringify(this.weatherDataArray)
            );
            
          }else{
            this.weatherData.forecastLink =
            'forecast/' + this.weatherData.zipcode;
          this.weatherDataArray.push(
            JSON.parse(JSON.stringify(this.weatherData))
          );
          console.log(this.weatherDataArray);
          localStorage.setItem(
            'weatherDataSource',
            JSON.stringify(this.weatherDataArray)
          );
         
          }
         
        } else {
          alert('Data not found try with other zipcode');
        }
      },
      error => {
        console.log('error', error);
        this.isSpinner=true;
        alert('Data  not found try with other zipcode');
      }
    );
  }
  findById(zipcode: any) {
    if(this.weatherDataArray){
      let index=this.weatherDataArray.findIndex(obj=> obj.zipcode==zipcode);
      return index;
    }else{
      return -1;
    }
   
  }
  clearWeatherData() {
    this.weatherData.data = '';
    this.weatherData.zipcode = '';
    this.weatherData.forecastLink = '';
  }
  deleteCity(index) {
    this.weatherDataArray.splice(index, 1);
    localStorage.setItem(
      'weatherDataSource',
      JSON.stringify(this.weatherDataArray)
    );
  }
}
