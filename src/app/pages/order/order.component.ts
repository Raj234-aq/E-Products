import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit{
  pro_id : any = '';
  details : boolean = true;
  productDetails : any = [];
  Info : any = [];
  placeOrderInfo : any = [];
  constructor(private pService:ProductService, private actRoute : ActivatedRoute, private oService : OrderService, private route : Router){
  this.pro_id = this.actRoute.snapshot.paramMap.get('id');
  console.log(this.pro_id);
  }

  ngOnInit(): void {
    /** getParticularProduct **/
    if(this.pro_id){
      this.details = false;
      this.getParticularProduct();
    }
    else{
      this.details = true;
    }
    /** Get user info from Local Storage **/
    this.getUserFromLocalStorage();
  }

  getUserFromLocalStorage(){    
    this.Info = JSON.parse(localStorage.getItem("userInfo") || "[]");
    console.log(this.Info);    
  }


  /** Get Particular Product Item **/

  getParticularProduct(){
    this.pService.getProductByID(this.pro_id).subscribe({
      next : ((res : any) => {
        console.log(res);
        this.productDetails = res;
      }),
      error : ((error : any) => {
        console.log(error);
      })      
    });
  }

  /** Place Order **/
  orderPlace(){
    let orderInfo = {
      pro_id : this.pro_id,
      user_id : this.Info.user_id
    };
    this.oService.orderPlace(orderInfo).subscribe({
      next : ((res : any) => {
        console.log(res);
        //alert(res.message);
        if(res.success){
          alert(res.message);
          this.placeOrderInfo = res.orderInfo;

        /** Now store order id into the localstorage **/
        localStorage.setItem('order_id', this.placeOrderInfo._id);

        /** Redirect to view Order Component **/
        //this.route.navigateByUrl('/vieworder');
        }
        else{
          alert("Please login for placed order");
        }
      }),
      error : ((error : any) => {
        console.log(error);
      })
    });
  }
}
