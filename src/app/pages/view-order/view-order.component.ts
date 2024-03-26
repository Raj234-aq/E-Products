import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit{
  order_id : any = '';
  order_details : any = [];
  constructor(private oService : OrderService, private route : Router){
    this.order_id = localStorage.getItem('order_id');
  }

  ngOnInit(): void {
    console.log('Order_id: '+ this.order_id);
    /** View Order **/
    this.getOrderById();
  }

  /** Get Order info by order id **/
  getOrderById(){
    return this.oService.viewOrderInfo(this.order_id).subscribe({
      next:((res: any) => {
        console.log(res);
        this.order_details = {
          id : res._id,
          date : res.order_date,
          pro_name : res.pro_id.pro_name,
          desc : res.pro_id.pro_desc,
          price : res.pro_id.pro_price,
          image : res.pro_id.pro_image,
          user : res.user_id.name,
          email : res.user_id.email,
          phone : res.user_id.phone,
          pic: res.user_id.profile_pic
        }
        console.log(this.order_details);
      }),
      error:((error:any) => {
        console.log(error);
      })
    });
  }
  /** Print Order Details **/
  print(){
    window.print();
  }

  view(){
    this.route.navigateByUrl('/products');
  }
}
