import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from '../services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colors:Color[]=[];
  currentColor:Color; // Bir kategoriye tıkladığımızda set etmiş oluyoruz. Binding yapılabilir hale geliyor.
  dataLoaded=false;

  constructor(private colorService:ColorService) { }

  ngOnInit(): void { this.getColors();}
  

  getColors(){
    console.log(" Color API Request başladı")
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data
      this.dataLoaded=true;
      console.log(" Color API Request bitti")
    })
    console.log("Color Metod bitti")
  }

  setCurrentColor(color:Color){
    this.currentColor=color;
  }

  getCurrentColorClass(color:Color){
    if(color==this.currentColor){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

  getAllColorClass(){
    if(!this.currentColor){
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

}