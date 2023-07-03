import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Food } from 'src/app/shared/models/food';
import { Tag } from 'src/app/shared/models/tag';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  [x: string]: any;
  constructor(private http: HttpClient) {}
  private apiUrl = '/assets/food.json';
  foods$!: Observable<any[]>;

  getAllTags(): Tag[] {
    return [
      { name: 'All', count: 14 },
      { name: 'FastFood', count: 4 },
      { name: 'Pizza', count: 2 },
      { name: 'Lunch', count: 3 },
      { name: 'SlowFood', count: 2 },
      { name: 'Hamburger', count: 1 },
      { name: 'Fry', count: 1 },
      { name: 'Soup', count: 1 },
    ];
  }

  getData(): Observable<{
    [x: string]: any;
    foods: Food[];
  }> {
    return this.http.get<any>(this.apiUrl);
  }

  displayDataById(id: number): Observable<Food | undefined> {
    return this.http.get<{ foods: Food[] }>(this.apiUrl).pipe(
      map((response: { foods: any }) => {
        const foodList = response.foods;
        return foodList.find((food: { id: number }) => food.id === id);
      })
    );
  }
  getAllFoodsByTag(tag: string): Observable<Food[]> {
    if (tag === 'All') {
      return this.getData().pipe(map((data) => data.foods));
    } else {
      return this.getData().pipe(
        map(
          (data) => data.foods.filter((food) => food.tags?.includes(tag)) || []
        )
      );
    }
  }
  getAllFoodsBySearchTerm(searchTerm: string): Observable<Food[]> {
    return this.getData().pipe(
      map((data) =>
        data.foods.filter((food: { name: string }) =>
          food.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }
}
