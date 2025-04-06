import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, catchError, firstValueFrom, throwError} from 'rxjs';
import {error} from 'console';
import {ErrorResponce} from '../model/dto/errorResponce';
import {JWTToken} from '../model/dto/jwtToken';
import { UserRegister } from '../model/userRegister';
import { User } from '../model/user.model';
import { UserAuthService } from './user-auth.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:5248/api/';


    constructor(
        private http: HttpClient,
        private authService:UserAuthService
    ) {}

    private async createAuthHeaders(): Promise<HttpHeaders> {
        await this.authService.ensureValidToken();
        
        return new HttpHeaders({
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.authService.accessTokenValue}`
        });
    }

    async studentCabinet(): Promise<User> {
        const headers = await this.createAuthHeaders();
        return firstValueFrom(
          this.http.get<User>(`${this.apiUrl}Student`, { headers })
        );
    }


    login(email: string, password: string) {
        return firstValueFrom(this.http.post<JWTToken>(this.apiUrl + "Auth/login", {
                email: email,
                password: password
            }
        ));
    }

    registration(user:UserRegister) {
        return firstValueFrom(this.http.post<JWTToken>(this.apiUrl + "Auth/registration", user ));
    }

    registrationAccept(email: string, password: string, key: string) {
        return firstValueFrom(this.http.post<JWTToken>(this.apiUrl + "Auth/registration/accept", {
                email: email,
                password: password,
                key: key
            }
        ));
    }

    
}
