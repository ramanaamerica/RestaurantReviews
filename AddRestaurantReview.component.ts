import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchRestaurantComponent } from '../fetchrestaurant/fetchrestaurant.component';
import { RestaurantService } from '../../services/restaurantservice.service';

@Component({
    selector: 'createRestaurantReview',
    templateUrl: './AddRestaurantReview.component.html'
})

export class createRestaurantReview implements OnInit {
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    addreviewForm: FormGroup;
    title: string = "Add Review";
    id: number;   
    errorMessage: any;

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _restaurantservice: RestaurantService, private _router: Router) {
        

        this.addreviewForm = this._fb.group({
            id: 0,
            review: ['', [Validators.required]]
        })
    }   

    save() {

        if (!this.addreviewForm.valid) {
            return;
        }

        if (this.title == "Create") {
            this._restaurantservice.saveReview(this.addreviewForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/restaurants']);
                }, error => this.errorMessage = error)
        }
        else if (this.title == "Delete") {
            this._restaurantservice.deleteReview(this.addreviewForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/restaurants']);
                }, error => this.errorMessage = error) 
        }
    }

    cancel() {
        this._router.navigate(['/restaurants']);
    }

    get reviewText() { return this.addreviewForm.get('reviewText'); }
   
}