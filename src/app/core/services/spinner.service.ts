import {BehaviorSubject} from 'rxjs';

export class SpinnerService {
  private show$ = new BehaviorSubject<boolean>(false);

  getSpinner() {
    return this.show$.asObservable();
  }

  showSpinner() {
    this.show$.next(true);
  }

  hideSpinner() {
    this.show$.next(false);
  }
}
