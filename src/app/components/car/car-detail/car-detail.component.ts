import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailDto } from 'src/app/models/car-detail-dto';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from '../../services/car.service';
import { CarImageService } from '../../services/carImage.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetailDto:CarDetailDto;
  carImages: CarImage[] =[];


  apiUrl: string = 'https://localhost:44334';
  constructor(
    private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailByCarId();
        this.getImageByCarId();
      }
    });
  }


  getCarDetailByCarId() {
    this.carService
      .getCarDetailById(this.activatedRoute.snapshot.params['carId'])
      .subscribe((response) => {
        this.carDetailDto = response.data;
        console.log(this.carDetailDto);
      });
  }

  getImageByCarId() {
    this.carImageService
      .getImagesByCarId(this.activatedRoute.snapshot.params['carId'])
      .subscribe((response) => {
         this.carImages = response.data;
      });
  }

  goToCars(){
    this.router.navigate(['./cars'])
  }

  goToCarRental() {
    this.router.navigate(['./car-rental', this.activatedRoute.snapshot.params['carId']]);
  }

  goToSet(){
    this.router.navigate(['./car-set', this.activatedRoute.snapshot.params['carId']])
  }
}
