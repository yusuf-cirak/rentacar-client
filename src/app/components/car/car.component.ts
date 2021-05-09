import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { CarService } from '../services/car.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  cars:Car[]=[];
  rentals:Rental[]=[];
  currentCar:Car;
  dataLoaded=false;
  defaultPath="https://localhost:44334"
  filterText="";
  
  constructor(private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private cartService:CartService,
    private toastrService:ToastrService) { }

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

  addToCart(car:Car){
    let item=this.rentals.find(r=>r.carId===car.carId);
    if (item && item.returnDate===null){
      this.toastrService.error('Araç zaten kiralandı',car.carName);
      return;
    }else{
      this.toastrService.success('Araç kiralama listesine eklendi',car.carName)
      this.cartService.addToCart(car)
      console.log(car)
    }
  }

}