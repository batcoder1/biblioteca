import { BookComponent } from './../../components/book/book.component';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { UserComponent } from '../../components/user/user.component';
import { HomeComponent } from '../../components/home/home.component';

const routes: Routes = [
    {pathMatch: 'full', path: '', component: HomeComponent },
    {pathMatch: 'full', path: 'catalogo', component: BookComponent },
    {pathMatch: 'full', path: 'lectores', component: UserComponent }
  ];
@NgModule({
    declarations: [
    ],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [ RouterModule ]
})

export class RouteModule { }
