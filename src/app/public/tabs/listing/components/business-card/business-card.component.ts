import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss'],
})
export class BusinessCardComponent {

  
  constructor() { }

  @Input() item: any;

  @Output() clicked = new EventEmitter();
  
  ngOnInit() {}

}
