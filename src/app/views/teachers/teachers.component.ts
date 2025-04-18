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
import { UserRegister } from '../../model/userRegister';
import { User } from '../../model/user.model';

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
    showDeleteModal:boolean = false;
    activeLevel: string | null = null;
    selectedImgUrl: string | undefined;
  
    levels = [
        { name: 'Beginner (A1)', shortName: 'A1' },
        { name: 'Elementary (A2)', shortName: 'B2' },
        { name: 'Intermediate (B1)', shortName: 'B2+' },
        { name: 'Upper Intermediate (B2)', shortName: 'C1' }
    ];

    teachers: Array<User> | undefined;
    user: User | undefined;
    selectedTeacher: User | undefined;

    constructor(
        private router: Router,
        private userAuthService: UserAuthService,
        private fb: FormBuilder,
        private http: HttpClient,
        private apiService:ApiService
    ) {
    }

    async ngOnInit() {
        this.teacherForm = this.fb.group({
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            patronymic: ['', Validators.required],
            birthDate: ['', Validators.required],
            level:['', Validators.required]
        });

        this.confirmForm = this.fb.group({
            login: ['', Validators.required],
            password: ['', Validators.required],
        });


        try{
            const result = await this.apiService.getAllTeachers();
            console.log(result);
            this.teachers = result.teachers;
            this.user = result.user;
        }
        catch(error){
            console.log(error);
        }
    }
    
    
    selectLevel(level: string): void {
        this.teacherForm.patchValue({ level: level });
        this.activeLevel =level;
    }

    onFileSelected(event: any): void {
        this.selectedFile = event.target.files[0];
        this.selectedImgUrl = URL.createObjectURL(this.selectedFile);
    }

    openConfirmModal(): void {
        if (this.teacherForm.invalid) {
            this.teacherForm.markAllAsTouched();
            return;
        }
        this.selectedTeacher = undefined;
        this.showConfirmModal = true;
    }

    showDeleteWindow():void{
        this.showConfirmModal = false;
        this.showDeleteModal = true;
    }

    showUpdateModal(id:string):void{
        this.selectedTeacher = this.teachers?.find(t => t.id === id);
        if(this.selectedTeacher ){
            this.teacherForm.get('name')?.setValue(this.selectedTeacher.name);
            this.teacherForm.get('lastname')?.setValue(this.selectedTeacher.lastName);
            this.teacherForm.get('patronymic')?.setValue(this.selectedTeacher.patronymic);
            this.selectedImgUrl = this.selectedTeacher.avatarUrl
        }
        this.showConfirmModal = true;
    }


    async submitAll() {
        if (this.confirmForm.invalid) {
            this.confirmForm.markAllAsTouched();
            return;
        }

        const formData = new FormData();

        formData.append('Email', this.confirmForm.get('login')?.value);
        formData.append('Password', this.confirmForm.get('password')?.value);
        formData.append('Name', this.teacherForm.get('name')?.value);
        formData.append('Lastname', this.teacherForm.get('lastname')?.value); 
        formData.append('Patronymic', this.teacherForm.get('patronymic')?.value);
        formData.append('birthday', this.teacherForm.get('birthDate')?.value); 
        formData.append('Level', this.teacherForm.get('level')?.value);

        if (this.selectedFile) {
            
            formData.append('avatar', this.selectedFile, this.selectedFile.name);
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
            this.teacherForm.reset();
            this.confirmForm.reset();
            this.showConfirmModal = false;
        }
    }
}
