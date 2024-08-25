import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

export const routes: Routes = [

    {
        path: '',
        component: UsersComponent
    },
    {
        path: 'user-detail',
        component: UserDetailComponent
    },
];