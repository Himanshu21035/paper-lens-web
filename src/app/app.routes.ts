import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import { UploadModule } from './features/upload-module/upload-module';
import { PaperList } from './features/paper-list/paper-list';
import { PaperViewerComponent } from './features/paper-viewer/paper-viewer';

export const routes: Routes = [
    {path:'', component:Dashboard},
    {path:'upload', component: UploadModule},
    {path: 'papers', component:PaperList},
    {path: 'papers/:paperId', component:PaperViewerComponent},
];
