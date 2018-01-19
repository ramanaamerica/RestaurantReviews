import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class RestaurantService {
    myAppUrl: string = "";

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.myAppUrl = baseUrl;
    }

    getRestaurants() {
        return this._http.get(this.myAppUrl + 'api/Restaurant/Index')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getRestaurantsByCity(name: string) {
        return this._http.get(this.myAppUrl + "api/Restaurant/ByCity/" + name)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    saveRestaurant(restaurant) {
        return this._http.post(this.myAppUrl + 'api/Restaurant/Create', restaurant)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    saveReview(review) {
        return this._http.post(this.myAppUrl + 'api/Restaurant/CreateReview', review)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    getReviewsByUser(username: string) {
        return this._http.get(this.myAppUrl + "api/Restaurant/ReviewsByUser/" + username)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }
    

    deleteReview(id) {
        return this._http.delete(this.myAppUrl + "api/Restaurant/DeleteReview/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}