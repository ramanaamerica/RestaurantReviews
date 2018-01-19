import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchRestaurantComponent } from '../fetchrestaurant/fetchrestaurant.component';
import { RestaurantService } from '../../services/restaurantservice.service';

@Component({
    selector: 'createrestaurant',
    templateUrl: './AddRestaurant.component.html'
})

export class createRestaurant implements OnInit {
    restaurantForm: FormGroup;
    title: string = "Add";
    id: number;
    cityname: string;
    errorMessage: any;

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _restaurantservice: RestaurantService, private _router: Router) {
        if (this._avRoute.snapshot.params["name"]) {
            this.cityname = this._avRoute.snapshot.params["name"];
        }

        this.restaurantForm = this._fb.group({
            id: 0,
            name: ['', [Validators.required]],
            city: ['', [Validators.required]],
            type: ['', [Validators.required]]
                       
        })
    }

    ngOnInit() {
        if (this.id > 0) {
            this.title = "Edit";
            this._restaurantservice.getRestaurantsByCity(this.cityname)
                .subscribe(resp => this.restaurantForm.setValue(resp)
                , error => this.errorMessage = error);
        }
    }

    save() {

        if (!this.restaurantForm.valid) {
            return;
        }

        if (this.title == "Create") {
            this._restaurantservice.saveRestaurant(this.restaurantForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/restaurants']);
                }, error => this.errorMessage = error)
        }
    }

    cancel() {
        this._router.navigate(['/restaurants']);
    }

    get name() { return this.restaurantForm.get('name'); }
    get city() { return this.restaurantForm.get('city'); }
    get type() { return this.restaurantForm.get('type'); }
    get image() { return this.restaurantForm.get('image'); }
    get rating() { return this.restaurantForm.get('rating'); }
}