import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.css']
})
export class BrandDetailComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private brandService: BrandService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  brandDetail: Brand;
  brandForm: FormGroup;
  brandId:number;
  brandName:string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getBrandDetailByBrandId();
        this.createBrandForm();
      }
    });
  }

  getBrandDetailByBrandId() {
    this.brandService
      .getBrandDetailByBrandId(this.activatedRoute.snapshot.params['brandId'])
      .subscribe((response) => {
        this.brandDetail = response.data;
        this.brandId= this.brandDetail.brandId
        this.brandName = this.brandDetail.brandName
      });
  }
  createBrandForm(){
    this.brandForm = this.formBuilder.group({
      brandId:[Validators.required],
      brandName:[Validators.required]
    });
  }

  update(){
    if (this.brandForm.valid) {
      let brandModel = Object.assign({}, this.brandForm.value);
      this.brandService.update(brandModel).subscribe(response=>{
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

  goToBrands(){
    this.router.navigate(['./brands'])
  }
  
}
