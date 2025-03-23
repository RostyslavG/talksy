import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { error } from 'console';
import { ErrorResponce } from '../model/dto/errorResponce';
import { JWTToken } from '../model/dto/jwtToken';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://ef37-5-58-58-125.ngrok-free.app/';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  login(email:string, password:string){
    return firstValueFrom(this.http.post<JWTToken>(this.apiUrl+"Auth/login",{
        email:email,
        password:password
      }
    ));
  }

  registration(email:string, password:string){
    return firstValueFrom(this.http.post<JWTToken>(this.apiUrl+"Auth/registration",{
        email:email,
        password:password
      }
    ));
  }

  registrationAccept(email:string, password:string,key:string){
    return firstValueFrom(this.http.post<JWTToken>(this.apiUrl+"Auth/registration/accept",{
        email:email,
        password:password,
        key:key
      }
    ));
  }
}
