import { Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { LoginRegisterComponent } from './views/login-register/login-register.component';
import { CabinetComponent } from './views/cabinet/cabinet.component';
import { SettingComponent } from './views/setting/setting.component';
import { TestComponent } from './views/test/test.component';
import { DzComponent } from './views/dz/dz.component';
import { LessonsComponent } from './views/lessons/lessons.component';
import { SingleLessonComponent } from './views/single-lesson/single-lesson.component';
import { AdminComponent } from './views/admin/admin.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { TeachersComponent } from './views/teachers/teachers.component';
import { AdminMainComponent } from './views/admin-main/admin-main.component';
import { HomeworkListComponent } from './views/homework-list/homework-list.component';

export const routes: Routes = [
    { path: '' , component:MainComponent },
    { path:'login-registration/:mode', component:LoginRegisterComponent},
    { path:'cabinet', component:CabinetComponent},
    { path:'setting', component:SettingComponent},
    { path:'test', component:TestComponent},
    { path:'homework', component:DzComponent},
    { path:'lessons', component:LessonsComponent},
    { path:'lesson/:id', component: SingleLessonComponent },
    { path:'admin', component:AdminComponent},
    { path:'calendar', component:CalendarComponent},
    { path:'teachers', component:TeachersComponent},
    { path:'admin-main', component:AdminMainComponent},
    { path:'homework-list', component:HomeworkListComponent},
];
