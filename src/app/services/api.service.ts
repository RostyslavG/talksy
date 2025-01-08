import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://52a0-5-58-58-125.ngrok-free.app/api/Test';

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
}
