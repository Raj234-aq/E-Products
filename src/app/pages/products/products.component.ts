import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCT } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  productList:PRODUCT[]=[];

  /** Price Limit **/
  start:number=1000;
  end:number=2000;
  constructor(private pService:ProductService, private route : Router){}

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


  priceLimit(){
    /** Limit Search Condition **/
    if(this.end > this.start){
      this.getProductByPricelimit();

    }else{
      alert('Please select valid price range');
    }
    console.log("limit fn");
  }

  /** Get Procuct By Price Limit **/
  getProductByPricelimit(){
    this.pService.getProcuctByPrice(this.start, this.end).subscribe({
      next:((res: any) => {
        console.log(res);
        this.productList = res;
      }),
      error:((error:any) => {
        console.log(error);
      })
    });
  }

  /** Order Product**/
  order(p : any){
    console.log(p);
    let product_id = p._id;

    /** Redirect to order Com **/
    this.route.navigate(["/order", product_id]);
    //this.route.navigateByUrl('/order');
  }
}
