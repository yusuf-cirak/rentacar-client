import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from 'src/app/models/carImage';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl = 'https://localhost:44334/api/';

  constructor(private httpClient:HttpClient) { }

  getImages():Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"carimages/getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }

  getImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"carimages/getbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)
  }
}
// veritabanında kaç satır var?
// şimdi hızlı geldi de ilk açılışta baya yavaş geliyo
// bide bazı hatalar var anlamadım sebebini
// performans kısmı çok yerden etkilenir.veritabanından kaynaklanıyor olabilir, internetinin hızından olabilir vs..
// hatalar neler?
// imagepathii yazdırdığın html dosyası hangisi?