import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent implements OnInit {
  @Input() categories = []; //categories for filter
  @Input() elementsList = []; //sent elements 
  @Output() filteredElements = new EventEmitter<Array<any>>(); //elements filtered emitter
  isFilterUsed:boolean = false;
  

  constructor() { }

  ngOnInit() {
  }

  filterByCategory(category){
    let filteredElements = [];
    filteredElements = this.elementsList.filter(e=> e.category == category);
    this.filteredElements.emit(filteredElements);
    this.isFilterUsed = true;
  }

  cancelFilter(){
    this.filteredElements.emit(this.elementsList);
    this.isFilterUsed = false;
    
  }

}
