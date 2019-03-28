import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

import {PaginatorService} from './paginator.service';
import {Page} from '../../../core/models/page.model';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  providers: [PaginatorService]
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() totalItems: number;
  @Input() itemsPerPage: number;
  @Output() makeStep = new EventEmitter<number>();
  page: Page;

  constructor(private paginatorService: PaginatorService) {
  }

  ngOnInit() {
    this.page = this.paginatorService.init(this.totalItems, this.itemsPerPage);
    this.makeStep.emit(this.page.pageNumber);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.totalItems.currentValue || !changes.totalItems.firstChange) {
      this.totalItems = changes.totalItems.currentValue;
      this.page = this.paginatorService.init(this.totalItems, this.itemsPerPage);
      this.makeStep.emit(this.page.pageNumber);
    }
  }

  stepForward() {
    this.page = this.paginatorService.stepForward();
    this.makeStep.emit(this.page.pageNumber);
  }

  stepBack() {
    this.page = this.paginatorService.stepBack();
    this.makeStep.emit(this.page.pageNumber);
  }

}
