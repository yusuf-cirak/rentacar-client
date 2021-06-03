import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from '../services/brand.service';
import { CarService } from '../services/car.service';
import { CarImageService } from '../services/carImage.service';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  brands: Brand[] = [];
  colors: Color[] = [];
  selectedBrandId: number = 0;
  selectedColorId: number = 0;

  filterText: string;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,
    private colorService: ColorService,
    private carimageService:CarImageService
  ) {}

  loaded:boolean=false;

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params['colorId']) {
        this.getCarsByColor(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }


  getCars() {
    this.carService.getCars().subscribe((response) => {
    console.log(response.data)
    this.cars=response.data
    });
  }

  getCarsByBrand(brandId: number) {
    if (brandId == 0) {
      this.getCars();
    } else {
      this.carService.getCarsByBrand(brandId).subscribe((response) => {
        this.cars = response.data;
      });
    }
  }

  getCarsByColor(colorId: number) {
    if (colorId == 0) {
      this.getCars();
    } else {
      this.carService.getCarsByColor(colorId).subscribe((response) => {
        this.cars = response.data;
      });
    }
  }

  goToAdd(){
    this.router.navigate(['./cars/add']);
  }
  goToDetail(carId: number) {
    this.router.navigate(['./car-detail', carId]);
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
}