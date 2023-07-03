import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../shared/models/tag';
import { FoodService } from '../services/food/food.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements OnInit {
  [x: string]: any;
  @Input()
  justifyContent?: string = 'center';
  @Input()
  foodPageTags?: string[];
  tags: Tag[] = [];
  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.getTags();
  }

  getTags() {
    if (!this.foodPageTags) this.tags = this.foodService.getAllTags();
  }
}
