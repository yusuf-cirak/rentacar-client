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
  
  constructor(
    private carService:CarService,
    private carImageService:CarImageService, 
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCarDetail();
    this.getCarImages();
  }

  getCarDetail(){
    const carId = this.activatedRoute.snapshot.paramMap.get('carId')?.toString();
    this.carService.getCarDetailById(Number(carId)).subscribe(response => {
      let items:any=response.data
      this.currentCar=items[0]
    })
  }

  getCarImages(){
    const carId = this.activatedRoute.snapshot.paramMap.get('carId')?.toString();
    this.carImageService.getImagesByCarId(Number(carId)).subscribe(response => {
      this.carImages = response.data;

      console.log(response.data)
    })
  }

}
