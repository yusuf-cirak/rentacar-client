import { CarImage } from "./carImage";

export interface CarDetailDto{
    carId:number;
    carName:string;
    carBrandId:number;
    carBrandName:string;
    carColorId:number;
    carColorName:string;
    carModelYear:number;
    carDailyPrice:number;
    carDescription:string;
    carImage:CarImage[]; 
}