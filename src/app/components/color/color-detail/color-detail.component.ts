import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color-detail',
  templateUrl: './color-detail.component.html',
  styleUrls: ['./color-detail.component.css']
})
export class ColorDetailComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) { }

  colorDetail: Color;
  colorForm: FormGroup;
  colorId:number;
  colorName:string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getColorDetailByColorId();
        this.createColorForm();
      }
    });
  }

  getColorDetailByColorId() {
    this.colorService
      .getColorById(this.activatedRoute.snapshot.params['colorId'])
      .subscribe((response) => {
        this.colorDetail = response.data;
        this.colorId= this.colorDetail.colorId
        this.colorName = this.colorDetail.colorName
      });
  }
  createColorForm(){
    this.colorForm = this.formBuilder.group({
      colorId:[Validators.required],
      colorName:[Validators.required]
    });
  }

  update(){
    if (this.colorForm.valid) {
      let colorModel = Object.assign({}, this.colorForm.value);
      this.colorService.update(colorModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },
      (responseError)=>{
        if(responseError.error.ValidationErrors.length>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      });
    } else {
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

  goToColors(){
    this.router.navigate(['./colors'])
  }
}
