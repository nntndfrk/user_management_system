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
  @Input() paginatorSteps = [1, 2, 5];
  @Output() makeStep = new EventEmitter<Page>();
  page: Page;

  constructor(private paginatorService: PaginatorService) {
  }

  ngOnInit() {
    this.page = this.paginatorService.init(this.totalItems, this.itemsPerPage);
    this.makeStep.emit(this.page);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.totalItems
      && (changes.totalItems.currentValue || !changes.totalItems.firstChange)
    ) {
      this.totalItems = changes.totalItems.currentValue;
      this.page = this.paginatorService.init(this.totalItems, this.itemsPerPage);
      this.makeStep.emit(this.page);
    }
  }

  onSelectPerPage() {
    this.page = this.paginatorService.init(this.totalItems, this.itemsPerPage);
    this.makeStep.emit(this.page);
  }

  stepForward() {
    this.page = this.paginatorService.stepForward();
    this.makeStep.emit(this.page);
  }

  stepBack() {
    this.page = this.paginatorService.stepBack();
    this.makeStep.emit(this.page);
  }

  stepEnd() {
    this.page = this.paginatorService.stepEnd();
    this.makeStep.emit(this.page);
  }

  stepStart() {
    this.page = this.paginatorService.stepStart();
    this.makeStep.emit(this.page);
  }

}
