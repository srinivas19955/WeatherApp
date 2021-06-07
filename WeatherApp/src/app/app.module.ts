import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { WeatherComponent } from './weather/weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { AppRoutingModule } from './app-routing.module';
import { WeatherService } from './services/weather.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DateConverterPipe } from './pipes/date-converter.pipe';
@NgModule({
  imports:      [ BrowserModule, FormsModule , HttpClientModule , AppRoutingModule,ReactiveFormsModule],
  declarations: [ AppComponent, HelloComponent, WeatherComponent, ForecastComponent, DateConverterPipe ],
  providers:[WeatherService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
