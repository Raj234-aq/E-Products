import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http:HttpClient) { }

  private pro_api_url: string = 'https://e-products.glitch.me/products';

  /** Place Order **/
  orderPlace(orderInfo : any){
    return this.http.post(`${this.pro_api_url}/order/buy`, orderInfo);
  }

  /** View Order Info by order Id**/
  viewOrderInfo(order_id : any){
    return this.http.get(`${this.pro_api_url}/order/view/${order_id}`);
  }
}
