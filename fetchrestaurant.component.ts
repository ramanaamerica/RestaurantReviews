import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurantservice.service'

@Component({
    selector: 'fetchrestaurant',
    templateUrl: './fetchrestaurant.component.html'
})

export class FetchRestaurantComponent {
    public restaurants: RestaurantData[];
    cityname: string;

    constructor(public http: Http, private _router: Router, private _restaurantService: RestaurantService, private _avRoute: ActivatedRoute) {
        if (this._avRoute.snapshot.params["name"])
        {
            this.cityname = this._avRoute.snapshot.params["name"];
            this.getRestaurantsbyCity(this.cityname);
        }
        else
            this.getRestaurants();
    }

    getRestaurants() {
        this._restaurantService.getRestaurants().subscribe(
            data => this.restaurants = data
        )
    }

    getRestaurantsbyCity(name) {      

        this._restaurantService.getRestaurantsByCity(name).subscribe(
            data => this.restaurants = data
        )
    }

    deleteReview(reviewID) {
        var ans = confirm("Do you want to delete the review : " + reviewID);
        if (ans) {
            this._restaurantService.deleteReview(reviewID).subscribe((data) => {
                this.getRestaurants();
            }, error => console.error(error)) 
        }
    }
}

interface RestaurantData {
    id: number;
    name: string;
    city: string;
    type: string;
    image: string;
    rating: string;
}