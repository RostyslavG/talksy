import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HeaderLogComponent } from '../components/header-log/header-log.component';
import { LabelLogComponent } from '../components/label-log/label-log.component';
import { UserAuthService } from '../../services/user-auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AdminDTO } from '../../model/dto/admin.dto';
import { User } from '../../model/user.model';
import { LessonAddDTO } from '../../model/dto/lesson-add.dto';


@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, HeaderLogComponent, LabelLogComponent, RouterLink],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit, AfterViewInit {
    @ViewChild('radioGroup') radioGroupRef!: ElementRef;
    @ViewChild('popup') popupRef!: ElementRef;
    @ViewChild('openPopupBtn') openPopupBtnRef!: ElementRef;

    @ViewChild('lessonCountInput') lessonCountInputRef!: ElementRef;
    @ViewChild('thameInput') thameInputRef!: ElementRef;
    @ViewChild('desriptionInput') desriptionInputRef!: ElementRef;
    @ViewChild('deadlineInput') deadlineInputRef!: ElementRef;

    selectedFile: File | null = null;
    selectedLessonFile: File | null = null;
    selectedHomeworkFile: File | null = null;

    lessons: { id: string; theme: string; time: string }[] = [];
    teachers: User[] = [];
    user: User | undefined;
    groupId: string | undefined;

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
        const popup = this.popupRef.nativeElement as HTMLElement;
        const openPopupBtn = this.openPopupBtnRef.nativeElement as HTMLElement;

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

        openPopupBtn.addEventListener('click', () => {
            popup.style.display = 'flex';
        });

        const closeBtn = popup.querySelector('.close-btn1') as HTMLElement;
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                popup.style.display = 'none';
            });
        }
    }

    handleLessonFileUpload(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedLessonFile = input.files[0];
        }
    }

    handleHomeworkFileUpload(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedHomeworkFile = input.files[0];
        }
    }

    async submitLesson(event: Event): Promise<void> {
        event.preventDefault();

        const lessonCount = (this.lessonCountInputRef.nativeElement as HTMLInputElement).value;
        const thame = (this.thameInputRef.nativeElement as HTMLInputElement).value;
        const desription = (this.desriptionInputRef.nativeElement as HTMLTextAreaElement).value;
        const deadline = (this.deadlineInputRef.nativeElement as HTMLInputElement).value;

        if (!lessonCount || !thame || !deadline) {
            console.error('Будь ласка, заповніть обов’язкові поля.');
            return;
        }

        const formData = new FormData();
        formData.append('LessonCount', lessonCount);
        formData.append('Theme', thame);
        formData.append('Desription', desription);
        formData.append('CreatedAt', new Date().toISOString());
        formData.append('Deadline', new Date(deadline).toISOString());
        formData.append('GroupId', this.groupId!);

        if (this.selectedLessonFile) {
            formData.append('lesson', this.selectedLessonFile);
        }
        if (this.selectedHomeworkFile) {
            formData.append('homework', this.selectedHomeworkFile);
        }

        try {
            await this.apiService.createLesson(formData);
            console.log('Урок успішно створено!');
            this.resetForm();
        } catch (error) {
            console.error('Помилка при створенні уроку:', error);
        }
    }

    resetForm(): void {
        (this.lessonCountInputRef.nativeElement as HTMLInputElement).value = '';
        (this.thameInputRef.nativeElement as HTMLInputElement).value = '';
        (this.desriptionInputRef.nativeElement as HTMLTextAreaElement).value = '';
        (this.deadlineInputRef.nativeElement as HTMLInputElement).value = '';
        this.selectedLessonFile = null;
        this.selectedHomeworkFile = null;
        (this.popupRef.nativeElement as HTMLElement).style.display = 'none';
    }

    async sendLevel(level: string): Promise<void> {
        try {
            const data: AdminDTO = await this.apiService.getAdminPageByLevel(level);
            console.log('Отримані дані:', data);

            this.lessons = data.lessons ?? [];
            this.teachers = data.teachers ?? [];
            this.user = data.user;
            this.groupId = data.groupId;
        } catch (err) {
            console.error('Помилка при запиті:', err);
        }
    }
}


