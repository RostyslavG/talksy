import {Component, OnInit} from '@angular/core';
import {HeaderLogComponent} from '../components/header-log/header-log.component';
import {LabelLogComponent} from '../components/label-log/label-log.component';
import {UserAuthService} from '../../services/user-auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-teachers',
    standalone: true,
    imports: [HeaderLogComponent, LabelLogComponent, CommonModule, ReactiveFormsModule],
    templateUrl: './teachers.component.html',
    styleUrl: './teachers.component.css'
})
export class TeachersComponent implements OnInit {
    teacherForm!: FormGroup;
    confirmForm!: FormGroup;
    selectedFile!: File;
    showConfirmModal: boolean = false;

    constructor(
        private router: Router,
        private userAuthService: UserAuthService,
        private fb: FormBuilder,
        private http: HttpClient,
        private apiService:ApiService
    ) {
    }

    ngOnInit(): void {
        // if (this.userAuthService.roleValue != "Teacher") {
        //     switch (this.userAuthService.roleValue) {
        //         case 'User':
        //             this.router.navigate(['/cabinet']);
        //             break;
        //         // case 'Admin':
        //         //   this.router.navigate(['/admin']);
        //         // break;
        //         default :
        //             this.router.navigate(['/main']);
        //             break;
        //     }
        // }

        this.teacherForm = this.fb.group({
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            patronymic: ['', Validators.required],
            birthDate: ['', Validators.required],
        });

        this.confirmForm = this.fb.group({
            login: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
    }

    openConfirmModal(): void {
        if (this.teacherForm.invalid) {
            this.teacherForm.markAllAsTouched();
            return;
        }
        this.showConfirmModal = true;
    }

    async submitAll() {
        if (this.confirmForm.invalid) {
            this.confirmForm.markAllAsTouched();
            return;
        }

        const formData = new FormData();
        formData.append('Name', this.teacherForm.get('name')?.value);
        formData.append('LastName', this.teacherForm.get('lastname')?.value);
        formData.append('Patronymic', this.teacherForm.get('patronymic')?.value);
        formData.append('BirthDate', this.teacherForm.get('birthDate')?.value);
        formData.append('Login', this.confirmForm.get('login')?.value);
        formData.append('Password', this.confirmForm.get('password')?.value);

        if (this.selectedFile) {
            formData.append('avatar', this.selectedFile);
        }

        try {
            await this.apiService.createTeacher(formData);
            alert('Викладач створений!');
            this.teacherForm.reset();
            this.confirmForm.reset();
            this.showConfirmModal = false;
        } catch (error) {
            console.error(error);
            alert('Помилка при створенні викладача');
        }
    }
}
