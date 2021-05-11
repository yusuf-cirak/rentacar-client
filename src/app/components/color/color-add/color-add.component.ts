import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup

  constructor(
    private formbuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm=this.formbuilder.group({
      colorName:["",Validators.required],
    })
  }

  add(){
    if(this.colorAddForm.valid){
      let brandModel=Object.assign({},this.colorAddForm.value)
      
      this.colorService.add(brandModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,
              "Doğrulama hatası")
          }
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

}
