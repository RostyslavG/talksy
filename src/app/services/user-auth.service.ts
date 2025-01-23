import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { JWTToken } from '../model/dto/jwtToken';
import { firstValueFrom, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private isAuth: boolean = false; // Чи користувач увійшов
  private accessToken: string | null = null; // accessToken
  private refreshToken: string | null = null; // refreshToken
  private expiredEnd:number | null = null; // Дата закінчення токена
  private isRefreshing: boolean = false; // Чи не йде оновлення токена

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
  // Встановити чи оновлюється токен
  setIsRefreshingValue(value: boolean): void {
    this.isRefreshing = value;
  }


  parseJwt(token:string){
    const decToken = this.jwtHelper.decodeToken(token);

    this.expiredEnd = decToken.exp;
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
  refreshNewToken(): Promise<JWTToken> {
  return firstValueFrom(
    this.http.post<JWTToken>('https://localhost:7028/api/Token/refresh', { refreshToken: this.refreshToken })
    .pipe(
      tap((result: JWTToken) => {
        this.cookieService.set('AccessToken', result.accessToken as string, 1, '/', undefined, true, 'Strict');
        this.accessToken = result.accessToken;
        this.parseJwt(result.accessToken);
      })
    )
  );
}
}
