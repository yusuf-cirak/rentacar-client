import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from 'src/app/models/loginModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl="https://localhost:44334/api/auth/"

  constructor(
    private httpClient:HttpClient,

  ) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }


  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

//localStorage= Http uygulamaları unutkan servislerdir. Dolayısıyla login olup tarayıcıyı yenilediğimizde her şey yok olur. Onu tarayıcının hatırlaması için bir yerde
//tutarız. (f12'de application kısmında, localStorage olarak tutuluyor)






}
