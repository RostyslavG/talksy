import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, catchError, firstValueFrom, throwError} from 'rxjs';
import {error} from 'console';
import {ErrorResponce} from '../model/dto/errorResponce';
import {JWTToken} from '../model/dto/jwtToken';
import { UserRegister } from '../model/userRegister';
import { User } from '../model/user.model';
import { UserAuthService } from './user-auth.service';
import { AdminDTO, AdminTeachersDTO } from '../model/dto/admin.dto';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:5248/api/';


    constructor(
        private http: HttpClient,
        private authService:UserAuthService
    ) {}

    private async createAuthHeaders(isJson:boolean): Promise<HttpHeaders> {
        await this.authService.ensureValidToken();

        return isJson ?
            new HttpHeaders({
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${this.authService.accessTokenValue}`
            })
            :
            new HttpHeaders({
                'Authorization': `Bearer ${this.authService.accessTokenValue}`
            })
    }


    async getAllTeachers(){
        const headers = await this.createAuthHeaders(true);
        return firstValueFrom(
            this.http.get<AdminTeachersDTO>(`${this.apiUrl}Admin/teachers`, { headers })
        );
    }
    async createTeacher(data:FormData){
        const headers = await this.createAuthHeaders(false);
        return firstValueFrom(
            this.http.post(`${this.apiUrl}Admin/teachers`, data, { headers })
        );
    }

    async studentCabinet(): Promise<User> {
        const headers = await this.createAuthHeaders(true);
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

    async getAdminPageByLevel(level: string): Promise<AdminDTO> {
        const headers = await this.createAuthHeaders(true);
        return firstValueFrom(
            this.http.get<AdminDTO>(`${this.apiUrl}Admin/group/${level}`, { headers })
        );
    }

    async createLesson(data: FormData): Promise<void> {
        const headers = await this.createAuthHeaders(false);
        return firstValueFrom(
            this.http.post<void>(`${this.apiUrl}Admin/lesson`, data, { headers })
        );
    }
}
