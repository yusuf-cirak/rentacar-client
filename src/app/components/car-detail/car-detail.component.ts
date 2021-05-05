import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from '../services/car.service';
import { CarImageService } from '../services/carImage.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  currentCar:Car;
  carImages:CarImage[];
  dataLoaded=false;
  
  constructor(
    private carService:CarService,
    private carImageService:CarImageService, 
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarImages(params["carId"])
        this.getCarDetail(params["carId"])
      }
    })
  }

  getCarDetail(carId:number){
    this.carService.getCarDetailById(carId).subscribe(response => {
      let items:any=response.data
      this.currentCar=items[0];
      this.dataLoaded=true;
    })
  }

  getCarImages(carId:number){
    this.carImageService.getImagesByCarId(carId).subscribe(response => {
      this.carImages=response.data
      this.dataLoaded=true;


      console.log(response.data)
    })
  }

}
