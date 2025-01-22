import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { ApiService } from '../../services/api.service';
import { ErrorResponce } from '../../model/dto/errorResponce';

@Component({
    selector: 'app-login-register',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './login-register.component.html',
    styleUrls: ['./login-register.component.css']
})

export class LoginRegisterComponent implements OnInit {
    mode: string | null = null;
    authForm: FormGroup;

    invalid: string | null= null;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private apiService: ApiService
    ) {

        this.authForm = this.fb.group(
            {
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(8)]],
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
    }

    get email() {
        return this.authForm.get('email');
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

        if (this.authForm.invalid) {
            this.authForm.markAllAsTouched();
            console.log('Форма недійсна:', this.authForm.errors);
            return;
        }

        try {
            const { email, password } = this.authForm.value;
            const response = await this.apiService.login(email, password);
            console.log('Успішний вхід:', response);
        } catch (error: any) {
            console.error('Помилка входу:', error);
            const errorMessage = error?.message || 'Невідома помилка. Спробуйте знову.';
            alert(errorMessage);
        }
    }

    async registration() {
        if (this.authForm.invalid) {
            this.authForm.markAllAsTouched();
            return;
        }

        try {
            const { email, password } = this.authForm.value;
            console.log(await this.apiService.registration(email, password));
            this.mode = 'accept';
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
}

export function matchPasswordsValidator(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const password = group.get(passwordKey)?.value;
        const confirmPassword = group.get(confirmPasswordKey)?.value;

        return password === confirmPassword ? null : { mismatch: true };
    };
}
