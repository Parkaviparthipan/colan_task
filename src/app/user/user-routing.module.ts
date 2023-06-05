import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
    { path: '', redirectTo: 'user-details', pathMatch: 'full' },
    { path: 'user-details', component: UserDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }