import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[]=[];
  currentCar:Car;
  dataLoaded=false;
  defaultPath="https://localhost:44334"
  
  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"]){
        this.getCarsByBrand(params["brandId"]);
      }else if (params["colorId"]){
        this.getCarsByColor(params["colorId"]);
      }else{
        this.getCars();
      }
    })
  }
  getCars(){
    console.log("Car API Request başladı")
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
      console.log("Car API Request bitti")
    })
      console.log("Car Metod bitti")
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data
      this.dataLoaded=true;
    })
  }

  setCurrentCar(car:Car){
    this.currentCar=car;
  }

}