import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PRODUCT } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  productList : PRODUCT[] = [];
  productForm : FormGroup;
  updateProObj : any = [];
  titleMsg : boolean = true;
  showHideModel : boolean = true;

  @ViewChild("takeInput", {static : false})
  InputVar!: ElementRef;
  constructor(private pService:ProductService, private fBuilder : FormBuilder, private route : Router){

    /** pro_name, pro_desc, pro_price,pro_image **/
    this.productForm = this.fBuilder.group({
      pro_name : [""],
      pro_desc : [""],
      pro_price : [""],
      pro_image : [""],
    });
  }

  reset()
  {
    // We will clear the value of the input
    // Field using the reference variable.

    this.InputVar.nativeElement.value = "";
  }

  /** setFile($event) **/
  setFile(Event:any){
    let file = Event.target.files[0];
    console.log(file);
    /** Set file into this file **/
    this.productForm.get("pro_image")?.setValue(file);
  }


  /**Life Cycle Hooks**/
  ngOnInit(): void {
    /** Get All **/
    this.getAll();
  }


  /** Get all Product**/

  getAll(){
    this.pService.getAllProduct().subscribe({
      next:((res: any) => {
        console.log(res);
        this.productList=res;
      }),
      error:((error:any) => {
        console.log(error);
      })
    });
  }

  modalOpen(){
    this.titleMsg = true;
    this.showHideModel = true;
  }

  modalClose(){
    this.showHideModel = false;
  }

  /** Add New Product **/
  addNewProduct(){
    console.log('add' + this.titleMsg);
    console.log(this.productForm.value);

    /** Create a Object of FormData **/
    let productData = new FormData();
    let ProductForm = this.productForm.value;
    Object.keys(ProductForm).forEach((pro:any)=>{
      //console.log(pro, ProductForm[pro]);
      productData.append(pro, ProductForm[pro]);
    });

    /** Add New Product Api Call **/
    this.pService.addProduct(productData).subscribe({
      next: ((res:any) => {
        console.log(res);
        alert("Product successfully Add");

        /** Get All Product **/
        /** Close Modal **/
        this.showHideModel = false;
        this.modalClose();
        this.getAll();

      }),
      error: ((error) => {
        console.log(error);
      })
    });

    /** Form reset **/
    this.productForm.reset();
    this.reset();
    /** Close Modal **/
    this.showHideModel = false;
  }


  /** Open Modal and Set **/
  openUpdateModal(p : any){
    console.log(p);

    /** Assign into the updateProObj **/
    this.updateProObj = p;
    this.titleMsg = false;
    this.showHideModel = true;

    //console.log('update' + this.titleMsg);

    /** Now Setting up the value of a **/
    this.setUpdateProduct();
  }

  /** Now set value to productform **/
  setUpdateProduct(){
    this.productForm.get("pro_name")?.setValue(this.updateProObj.pro_name);
    this.productForm.get("pro_desc")?.setValue(this.updateProObj.pro_desc);
    this.productForm.get("pro_price")?.setValue(this.updateProObj.pro_price);
  }

  /** Call Update Product depends on Id**/
  updateProductById(){

    /** Create a Object of FormData **/
    let productData = new FormData();
    let ProductForm = this.productForm.value;
    Object.keys(ProductForm).forEach((pro:any)=>{
      //console.log(pro, ProductForm[pro]);
      productData.append(pro, ProductForm[pro]);
    });

    /** Update Api Call **/
    this.pService.updateProduct(this.updateProObj._id,productData).subscribe({
      next : ((res : any) => {
        console.log(res);
       
        /** Close Modal **/
        this.showHideModel = false;
        this.modalClose();

        /** Get all Api Call **/
        this.getAll();
        alert(res.message);
      }),
      error : ((error : any) => {
        console.log(error);
      })
    });

    /** Form reset **/
    this.productForm.reset();
    this.reset();
    /** Close Modal **/
    this.showHideModel = false;
  }

  /** Delete Product **/
  deleteById(_id : any){
    var conf = confirm('Would you like to delete this product');
    console.log(conf);
    if (conf){
      /** Delete api call **/
      this.pService.deleteProduct(_id).subscribe({
        next : ((res : any) => {
          console.log(res);
          /** Get All**/
          this.getAll();
          alert(res.message);
        }),
        error : ((error : any) => {
          console.log(error);
        })
      });
    }
  }
  /** Logout **/
  logout(){
    localStorage.clear();
    alert("You have Successfully Logout");
    this.route.navigateByUrl('/login');
  }
}
