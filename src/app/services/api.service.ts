import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://76dc-5-58-58-125.ngrok-free.app/api/';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    const headers = new HttpHeaders({ 'Accept': 'application/json' });

    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('❌ Помилка отримання API:', error);
        return throwError(() => error);
      })
    );
  }

  login(email:string, password:string){
    const headers = new HttpHeaders({ 'Accept': 'application/json' });

    return firstValueFrom(this.http.post(this.apiUrl+"Auth/login",{
        email:email,
        password:password
      },
      {headers}
    ));
  }

  registration(email:string, password:string){
    const headers = new HttpHeaders({ 'Accept': 'application/json' });

    return firstValueFrom(this.http.post(this.apiUrl+"Auth/registration",{
        email:email,
        password:password
      },
      {headers}
    ));
  }

  registrationAccept(email:string, password:string,key:string){
    const headers = new HttpHeaders({ 'Accept': 'application/json' });

    return firstValueFrom(this.http.post(this.apiUrl+"Auth/registration/accept",{
        email:email,
        password:password,
        key:key
      },
      {headers}
    ));
  }
}
