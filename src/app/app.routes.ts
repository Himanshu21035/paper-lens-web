import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { UploadModule } from './features/upload-module/upload-module';

export const routes: Routes = [
    {path:'', component:Dashboard},
    {path:'upload', component: UploadModule}
];
