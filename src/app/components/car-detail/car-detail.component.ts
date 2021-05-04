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
  carImages:CarImage[]=[];
  car!:Car;
  defaultPath="https://localhost:44334"

  constructor(private carService:CarService,private carImageService:CarImageService, 
    private activatedRoute:ActivatedRoute) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>{
        if(params["carId"]){
          this.getCarsByCarId(params["carId"]),
          this.getCarImages(params["carId"])
        }
      })
    }
  

  getCarImages(carId:number){
    this.carImageService.getImagesByCarId(carId).subscribe(response=>{
      this.carImages = response.data;
      console.log(this.carImages);
      console.log(response)
    })
  }

  getCarsByCarId(carId:number){
    this.carService.getCarDetailById(carId).subscribe(response=>{
      this.car = response.data[0];
    })
  }
  getImagePath(image:string){
    return this.defaultPath + image;
  }

}
