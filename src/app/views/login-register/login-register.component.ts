import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { ApiService } from '../../services/api.service';
import { ErrorResponce } from '../../model/dto/errorResponce';
import { UserAuthService } from '../../services/user-auth.service';
import { JWTToken } from '../../model/dto/jwtToken';
import { UserRegister } from '../../model/userRegister';

@Component({
    selector: 'app-login-register',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
    ],
    templateUrl: './login-register.component.html',
    styleUrls: ['./login-register.component.css']
})

export class LoginRegisterComponent implements OnInit {
    mode: string | null = null;
    authForm: FormGroup;

    invalid: string | null= null;

    registrationCount: number = 0;
    labelRefister: string | null = null;
    selectedLevel: string | null = null; 
    selectedIndex: number | null = null;
    registerTrue: boolean = false;

    levels = [
        { name: 'Beginner (A1)' },
        { name: 'Elementary (A2)' },
        { name: 'Intermediate (B1)' },
        { name: 'Upper Intermediate (B2)' }
    ];
    
    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private apiService: ApiService,
        private router:Router,
        private userAuthService:UserAuthService
    ) {

        this.authForm = this.fb.group(
            {
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(3)]],
                name:[''],
                lastname:[''],
                level:[''],
                birthday:[''],
                confirmPassword: [''],
                key: ['']
            },
            { validators: matchPasswordsValidator('password', 'confirmPassword') }
        );
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.mode = params.get('mode');

        });

        if(this.mode === 'registration'){
            this.labelRefister = 'Створити аккаунт';
        }
    }

    get email() {
        return this.authForm.get('email');
    }

    get name() {
        return this.authForm.get('name');
    }
    get lastname() {
        return this.authForm.get('lastname');
    }
    get birthday() {
        return this.authForm.get('birthday');
    }
    get level() {
        return this.authForm.get('level');
    }

    get password() {
        return this.authForm.get('password');
    }

    get confirmPassword() {
        return this.authForm.get('confirmPassword');
    }

    get key() {
        return this.authForm.get('key');
    }

    async login() {
        console.log('Метод login() викликано');

        // if (this.authForm.invalid) {
        //     this.authForm.markAllAsTouched();
        //     console.log('Форма недійсна:', this.authForm.errors);
        //     return;
        // }

        try {
            const { email, password } = this.authForm.value;
            const response = await this.apiService.login(email, password);
            this.userAuthService.authUser(response);

            switch(this.userAuthService.roleValue){
                case 'User':
                        this.router.navigate(['/cabinet']);
                    break;
                case 'Teacher':
                        this.router.navigate(['/teachers']);
                    break;
                case 'Admin':
                        this.router.navigate(['/admin']);
                    break;
                default:
                    this.router.navigate([''])
                    break;
            }

            console.log('Успішний вхід:', response);
        } catch (error: any) {
            console.error('Помилка входу:', error);
            const errorMessage = error?.message || 'Невідома помилка. Спробуйте знову.';
        }    
    }

    async registration() {
        // if (this.authForm.invalid) {
        //     this.authForm.markAllAsTouched();
        //     return;
        // }

        // try {
        //     const { email, password } = this.authForm.value;
        //     console.log(await this.apiService.registration(email, password));
        //     this.mode = 'accept';
        // } catch (error) {
        //     if(error){
        //         if(error instanceof ErrorResponce){
        //             this.invalid = `У полі ${error.reason} не правильно заповнене. Зверніть увагу, що ${error.message}`;
        //         }
        //     }
           
        // }

        try {
            const { email, password, name, lastname, birthday, level } = this.authForm.value;

            const user: UserRegister ={
                email: email,
                password: password,
                name: name,
                lastname: lastname,
                birthday: birthday,
                level: level
            
            }

            const response = await this.apiService.registration(user);
            
            if(response){
                this.registerTrue = true;
                this.userAuthService.authUser(response);
            }
           
        } catch (error) {
            if(error){
                if(error instanceof ErrorResponce){
                    this.invalid = `У полі ${error.reason} не правильно заповнене. Зверніть увагу, що ${error.message}`;
                }
            }
           
        }
    }

    async registrationAccept() {
        if (this.authForm.invalid) {
            this.authForm.markAllAsTouched();
            return;
        }

        try {
            const { email, password, key } = this.authForm.value;
            console.log(await this.apiService.registrationAccept(email, password, key));
        } catch (error) {
            console.error(error);
        }
    }

    nexyStepRegister(){
        this.registrationCount++;

        if(this.registrationCount>1){
            this.labelRefister = 'Оберіть свій рівень';
        }

        if(this.registrationCount > 2 ){
            this.registration();
        }
    }

    selectLevel(level: { name: string }, index: number) {
        this.selectedLevel = level.name; 
        this.selectedIndex = index;
        this.authForm.get('level')?.setValue(level.name);
    }

    routeToPage(){
        this.router.navigate(['/cabinet']);
    }
    

}

export function matchPasswordsValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const password = group.get(passwordKey)?.value;
        const confirmPassword = group.get(confirmPasswordKey)?.value;

        return password === confirmPassword ? null : { mismatch: true };
    };
}
