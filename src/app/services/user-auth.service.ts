import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { JWTToken } from '../model/dto/jwtToken';
import { catchError, firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private pendingRefresh: Promise<void> | null = null;
  private isAuth: boolean = false; // Чи користувач увійшов
  private accessToken: string | null = null; // accessToken
  private refreshToken: string | null = null; // refreshToken
  private expiredEnd:number | null = null; // Дата закінчення токена
  private isRefreshing: boolean = false; // Чи не йде оновлення токена
  private role: string | null =null;

  constructor(
    private http:HttpClient,
    private cookieService:CookieService,
    private jwtHelper: JwtHelperService
  ) { 
    if(cookieService.check('AccessToken')){
      const accesToken = cookieService.get('AccessToken');
      const refreshToken = cookieService.get('RefreshToken');

      this.accessToken = accesToken;
      this.refreshToken = refreshToken;
      this.isAuth= true;

      this.parseJwt(accesToken);
    }
  }

  // Отримати access token
  get accessTokenValue():string | null{
    return this.accessToken;
  }
  // Отримати refresh token
  get refreshTokenValue():string | null{
    return this.refreshToken;
  }
  // Отримати чи користувач увійшров
  get isAuthValue() :boolean{
    return this.isAuth;
  }
  // Отримати чи оновлюється токен
  get isRefreshingValue(): boolean {
    return this.isRefreshing;
  }

  get roleValue():string | null{
    return this.role;
  }

  // Встановити чи оновлюється токен
  setIsRefreshingValue(value: boolean): void {
    this.isRefreshing = value;
  }


  authUser(token:JWTToken){
    const accesToken = token.accessToken;
    const refreshToken = token.refreshToken;

    this.cookieService.set('AccessToken', token.accessToken, 1, '/', undefined, true, 'Strict');
    this.cookieService.set('RefreshToken', token.refreshToken, 1, '/', undefined, true, 'Strict');
    this.isAuth=true;

    this.parseJwt(accesToken);
  }

  parseJwt(token:string){
    const decToken = this.jwtHelper.decodeToken(token);

    this.expiredEnd = decToken.exp;
    this.role = decToken.role;
  }

  // Отримання чи токен ще не протерінувався
  isTokenExpired(): boolean {   
    if (this.expiredEnd) { 
      const now = Math.floor(Date.now() / 1000); 
      return now >= this.expiredEnd; 
    }  
    return true; 
  }

  // Запит на оновлення токена
  async ensureValidToken(): Promise<void> {
    if (!this.accessToken) {
      throw new Error('No access token');
    }

    if (!this.isTokenExpired()) {
      return;
    }

    if (!this.pendingRefresh) {
      this.pendingRefresh = this.refreshNewToken()
        .catch(error => {
          throw error;
        })
        .finally(() => {
          this.pendingRefresh = null;
        });
    }

    return this.pendingRefresh;
  }

  private async refreshNewToken(): Promise<void> {
    if (!this.refreshToken) {
      throw new Error('No refresh token');
    }

    const response = await firstValueFrom(
      this.http.post<JWTToken>('http://localhost:5248/api/Auth/refresh', {
        refreshToken: this.refreshToken
      })
    );

    this.authUser(response);
  }
}
