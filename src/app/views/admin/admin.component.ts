import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderLogComponent } from '../components/header-log/header-log.component';
import { LabelLogComponent } from '../components/label-log/label-log.component';
import { UserAuthService } from '../../services/user-auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AdminDTO, LessonAdmin, TeacherAdmin } from '../../model/dto/admin.dto';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, HeaderLogComponent, LabelLogComponent],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
    @ViewChild('radioGroup') radioGroupRef!: ElementRef;

    lessons: LessonAdmin[] = [];
    teachers: TeacherAdmin[] = [];
    adminName: string = '';
    adminLastname: string = '';
    role: string = '';

    constructor(
        private router: Router,
        private userAuthService: UserAuthService,
        private apiService: ApiService
    ) {}

    ngOnInit(): void {
        if (this.userAuthService.roleValue !== 'Admin') {
            switch (this.userAuthService.roleValue) {
                case 'User':
                    this.router.navigate(['/cabinet']);
                    break;
                case 'Teacher':
                    this.router.navigate(['/teachers']);
                    break;
                default:
                    this.router.navigate(['/main']);
                    break;
            }
        }
    }

    ngAfterViewInit(): void {
        const radioGroup = this.radioGroupRef.nativeElement as HTMLElement;

        radioGroup.querySelectorAll('input[type="radio"][name="level"]').forEach(input => {
            input.addEventListener('change', (event: Event) => {
                const value = (event.target as HTMLInputElement).value;
                this.sendLevel(value);
            });
        });

        const defaultRadio = radioGroup.querySelector('input[type="radio"][name="level"]:checked') as HTMLInputElement;
        if (defaultRadio) {
            this.sendLevel(defaultRadio.value);
        }
    }

    async sendLevel(level: string): Promise<void> {
        try {
            const data: AdminDTO = await this.apiService.getAdminPageByLevel(level);
            this.adminName = data.adminName;
            this.adminLastname = data.adminLastname;
            this.role = data.role;
            this.lessons = data.lessons;
            this.teachers = data.teachers;
        } catch (err) {
            console.error('Помилка при запиті:', err);
        }
    }
}

