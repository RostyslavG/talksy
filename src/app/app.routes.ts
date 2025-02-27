import { Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import { LoginRegisterComponent } from './views/login-register/login-register.component';
import { CabinetComponent } from './views/cabinet/cabinet.component';
import { SettingComponent } from './views/setting/setting.component';
import { TestComponent } from './views/test/test.component';
import { DzComponent } from './views/dz/dz.component';
import { LessonsComponent } from './views/lessons/lessons.component';
import { SingleLessonComponent } from './views/single-lesson/single-lesson.component';

export const routes: Routes = [
    { path: '' , component:MainComponent },
    { path:'login-registration/:mode', component:LoginRegisterComponent},
    { path:'cabinet', component:CabinetComponent},
    { path:'setting', component:SettingComponent},
    { path:'test', component:TestComponent},
    { path:'homework', component:DzComponent},
    { path:'lessons', component:LessonsComponent},
    { path: 'lesson/:id', component: SingleLessonComponent },
];
