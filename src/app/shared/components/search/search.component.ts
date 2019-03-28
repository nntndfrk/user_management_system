import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, pluck} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements AfterViewInit, OnDestroy {
  @Input() placeholder: string;
  @Output() inputChange = new EventEmitter<string>();
  @ViewChild('search_input') input: ElementRef;
  inputChange$: Subscription;
  inputValue: string;

  ngAfterViewInit() {
    this.inputChange$ = fromEvent(this.input.nativeElement, 'input')
      .pipe(
        pluck('target', 'value'),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        this.inputChange.emit(value);
      });
  }

  clearInput() {
    this.input.nativeElement.value = '';
    this.input.nativeElement.dispatchEvent(new Event('input'));
  }

  ngOnDestroy() {
    this.inputChange$.unsubscribe();
  }
}
