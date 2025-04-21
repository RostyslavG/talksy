import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HeaderLogComponent } from '../components/header-log/header-log.component';
import { LabelLogComponent } from '../components/label-log/label-log.component';
import { UserAuthService } from '../../services/user-auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AdminDTO } from '../../model/dto/admin.dto';
import { User } from '../../model/user.model';

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

    lessons: { id: string; theme: string; time: string }[] = [];
    teachers: User[] = [];
    user: User | undefined;

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

    async sendLevel(level: string): Promise<void> {
        try {
            const data: AdminDTO = await this.apiService.getAdminPageByLevel(level);
            console.log('Отримані дані:', data);

            this.lessons = data.lessons ?? [];
            this.teachers = data.teachers ?? [];
            this.user = data.user;
        } catch (err) {
            console.error('Помилка при запиті:', err);
        }
    }
}


