import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';

//  Extra Types
import { LoginAttempt } from '../../accounts/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url:string = "http://brandonslotty.com/sites/mushroom/api/controller.php";

  constructor(
    public http: HttpClient,
  ) { }

  //  Observable Main pipe
  sendRequest(payload: ClientPayload):Observable<ServerPayload> {
    return this.http.post<ServerPayload[]>(this.url, payload).pipe(
      // delay(2222)
      map(p => this.getLatestResponse(p))
    );
  }


  //  Response Formatting
  getLatestResponse(sp: ServerPayload[]): ServerPayload {
    return sp[sp.length - 1];
  }

  verifyResponse(sp: ServerPayload[]): boolean {
    return sp.find(p => !p.success) == undefined;
  }


  //  Generic
  getList(type: string) {
    let payload:ClientPayload = {
      action: "get_list",
      type: type,
      data: [],
    }

    return this.sendRequest(payload);
  }

  truncate(type: string) {
    let payload:ClientPayload = {
      action: "truncate",
      type: type,
      data: [],
    }

    return this.sendRequest(payload);
  }

  update(type: string, values: Object){
    let payload:ClientPayload = {
      action: "update",
      type: type,
      data: [values],
    }

    return this.sendRequest(payload);
  }


  //  Account
  authenticate(credentials: LoginAttempt){
    let payload:ClientPayload = {
      action: "authenticate",
      type: "user",
      data: [credentials],
    };

    return this.sendRequest(payload);
  }




  

  //  Customers



  //  Mediums
  // getActiveMediums(){
  //   let payload:ClientPayload = {
  //     action: "get_medium",
  //     type: "mediums",
  //     data: [],
  //   };

  //   return this.sendRequest(payload);
  // }

}






export class ServerPayload {
  success: boolean;
  message: string;
  data   : any[];
}

export class ClientPayload {
  action: string;
  type  : string;
  data  : any[];
}
