import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css'],
})
export class HomeComponentComponent implements OnInit {
  starRating = 0;
  foods$?: Observable<any[]>;

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(map((params) => params['searchTerm']))
      .subscribe((searchTerm) => {
        const tag = this.route.snapshot.params['tag']; // Assign params.tag to a different variable
        if (searchTerm) {
          this.foods$ = this.foodService.getAllFoodsBySearchTerm(searchTerm);
        } else if (tag) {
          this.foods$ = this.foodService.getAllFoodsByTag(tag);
        } else {
          this.foods$ = this.foodService
            .getData()
            .pipe(map((data) => data.foods));
        }
      });
  }
}
