import { NgModule } from '@angular/core';
import { RestaurantService } from './services/restaurantservice.service'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchRestaurantComponent } from './components/fetchrestaurant/fetchrestaurant.component'
import { createRestaurant } from './components/addrestaurant/addrestaurant.component'

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FetchRestaurantComponent,
        createRestaurant,
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'restaurants', component: FetchRestaurantComponent },
            { path: 'add-restaurant', component: createRestaurant },
            { path: 'restaurants/:name', component: FetchRestaurantComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [RestaurantService]
})
export class AppModuleShared {
}
