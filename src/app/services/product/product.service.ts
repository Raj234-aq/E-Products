import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private pro_api_url: string = 'https://e-products.glitch.me/products';
  /** All Product Related API End Points**/


  /** Get all Product list **/
  getAllProduct(){
    return this.http.get(`${this.pro_api_url}/list`);
  }

  /** Get Particular Product By Id**/
  getProductByID(_id : any){
    return this.http.get(`${this.pro_api_url}/list/${_id}`);
  }

  /** Get Product By Price Limit **/
  getProcuctByPrice(lim1:any, lim2:any){
    return this.http.get(`${this.pro_api_url}/limit/${lim1}/${lim2}`);
  }

  /** Add New Product **/
  addProduct(proData:any){
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || "[]");
    let token = userInfo.token;
    const headers = new HttpHeaders().set('token',token);
    return this.http.post(`${this.pro_api_url}/add`, proData, {headers:headers});
  }

  /** Call Update Product depends on Id**/
  updateProduct(_id : any, proData : any){
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || "[]");
    let token = userInfo.token;
    const headers = new HttpHeaders().set('token',token);
    return this.http.put(`${this.pro_api_url}/edit/${_id}`, proData, {headers:headers});
  }

  /** Delete Particular item**/
  deleteProduct(_id : any){
    let userInfo = JSON.parse(localStorage.getItem('userInfo') || "[]");
    let token = userInfo.token;
    const headers = new HttpHeaders().set('token',token);
    return this.http.delete(`${this.pro_api_url}/del/${_id}`, {headers:headers})
  }

  // /** Place Order **/
  // orderPlace(orderInfo : any){
  //   return this.http.post(`${this.pro_api_url}/order/buy`, orderInfo);
  // }
}
