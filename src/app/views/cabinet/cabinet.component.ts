import { Component, OnInit } from '@angular/core';
import { HeaderLogComponent } from "../components/header-log/header-log.component";
import { LabelLogComponent } from "../components/label-log/label-log.component";
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../services/user-auth.service';
import { ApiService } from '../../services/api.service';
import { User } from '../../model/user.model';
import { CommonModule } from '@angular/common';
import { Lesson } from '../../model/lesson.model';

@Component({
  selector: 'app-cabinet',
  standalone: true,
  imports: [HeaderLogComponent, LabelLogComponent,
    RouterLink, CommonModule
  ],
  templateUrl: './cabinet.component.html',
  styleUrl: './cabinet.component.css'
})
export class CabinetComponent implements OnInit {
  daily: boolean | null = null;
  user: User| undefined;
  now:Date =new Date();
  currentMonth!:string;
  calendarMatrix: number[][]=[];
  monthNames = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ];
  scheduleData: { day: string; time: string }[] = [];
  dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  datetest: Date | undefined;
  lessons:Array<Lesson> | undefined;

  constructor(private router:Router,
    private userAuthService:UserAuthService,
    private apiService:ApiService) {
      this.generateCalendar();
      this.now = new Date();
      const month = this.now.getMonth();
      
      this.currentMonth = this.monthNames[month];
    }
   
  async ngOnInit() {
    if(this.userAuthService.roleValue != "User"){
      switch(this.userAuthService.roleValue){
        case 'Teacher':
            this.router.navigate(['/teachers']);
          break;
          case 'Admin':
            this.router.navigate(['/admin']);
          break;
          default :
            this.router.navigate(['/main']);
          break;
      }
    }
    
    try{
      const data =await this.apiService.studentCabinet();
      this.user =  data.user;
      this.scheduleData = this.user.group.shedule ? JSON.parse(this.user.group.shedule) as { day: string; time: string }[] : [];
      this.datetest= this.user.group.testDate;
      this.lessons = data.lessons;
    }
    catch(error){
      console.log(error);
    }
    
  }  

  tapDailyk(result:boolean){
    this.daily =result;
  }

  isStudyDay(dayIndex: number): boolean {
    const currentDayName = this.dayNames[dayIndex];
    return this.scheduleData.some(schedule => schedule.day === currentDayName);
  }

  generateCalendar(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    let days: number[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
  
    // Розбиваємо масив днів на тижневі масиви
    this.calendarMatrix = [];
    while (days.length) {
      this.calendarMatrix.push(days.splice(0, 7));
    }
  }

  isMatchingDate(day: number): boolean {
    if (!this.datetest) return false;

    const testDate = new Date(this.datetest); // Перетворюємо в `Date`
    return testDate.getDate() === day &&
           testDate.getMonth() === this.now.getMonth() &&
           testDate.getFullYear() === this.now.getFullYear();
    }
}
