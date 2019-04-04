import {Page} from '../../../core/models/page.model';

export class PaginatorService {
  currentStep: number;
  total: number;
  perPage: number;
  totalPages: number;
  totalElements: Array<number>;

  init(total: number, perPage: number): Page {
    this.currentStep = 1;
    this.total = total;
    this.perPage = perPage;
    this.totalPages = this.calculatePages();
    this.totalElements = this.calculateElements();
    return this.getPage();
  }

  stepForward(): Page {
    if (this.currentStep < this.totalPages) {
      this.currentStep++;
    }
    return this.getPage();
  }

  stepBack(): Page {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
    return this.getPage();
  }

  stepEnd(): Page {
    if (this.currentStep < this.totalPages) {
      this.currentStep = this.totalPages;
    }
    return this.getPage();
  }

  stepStart(): Page {
    if (this.currentStep > 1) {
      this.currentStep = 1;
    }
    return this.getPage();
  }

  // TODO: implement step to page

  getPage(): Page {
    return {
      pageNumber: this.currentStep,
      perPage: this.perPage,
      isFirst: (this.currentStep === 1),
      isLast: (this.currentStep === this.totalPages),
      pageDescription: this.getPageDescription()
    };
  }

  calculatePages() {
    return Math.floor(this.total / this.perPage) + Number(!!(this.total % this.perPage));
  }

  calculateElements() {
    const outArr = [];
    for (let i = 0; i <= this.total; i++) {
      outArr.push(i);
    }
    return outArr;
  }

  getPageDescription() {
    const stepElements = [...this.totalElements].slice(
      (this.currentStep * this.perPage) - this.perPage + 1,
      (this.currentStep * this.perPage) + 1
    );
    return `${stepElements[0]} - ${stepElements.slice(-1)}`;
  }
}

