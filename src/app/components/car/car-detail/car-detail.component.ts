import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from '../../services/car.service';
import { CarImageService } from '../../services/carImage.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetail: Car | null;
  carImages: CarImage[] = [];
  carName: string;
  carModel: number;
  carPrice: number;
  carDesc: string;
  carColor: string;

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
        let items: any = response.data;
        this.carDetail = items[0];
        this.carName = this.carDetail.carName;
        this.carModel = this.carDetail.carModelYear;
        this.carPrice = this.carDetail.carDailyPrice;
        this.carDesc = this.carDetail.carDescription;
        this.carColor = this.carDetail.carColorName;
      });
  }

  getImageByCarId() {
    this.carImageService
      .getImagesByCarId(this.activatedRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.carImages = response.data;
      });
  }

  goToCars(){
    this.router.navigate(['./cars'])
  }

  goToCarRental() {
    this.router.navigate(['./car-rental', this.activatedRoute.snapshot.params['id']]);
  }

  goToSet(){
    this.router.navigate(['./car-set', this.activatedRoute.snapshot.params['id']])
  }
}
