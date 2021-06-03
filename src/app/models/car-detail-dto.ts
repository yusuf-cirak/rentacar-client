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
    carImage:CarImage[]; // sanırım burada varsayılan [] 0 elemanlı dediğimiz içindir.backend tarafından kaynaklanmıyor.eğer resim gelirse yükler.yoksa burada nasıl tanımladıysan odur.
    // []=[] ataması yapsak? resim varsa doludur yoksa boştur.
}