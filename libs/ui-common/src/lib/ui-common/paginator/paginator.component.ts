import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { IconComponent } from "../icon/icon.component";

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  selector: 'ad-ui-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input({ required: true }) length!: number;
  @Input() currentPage = 0;
  @Input() pageSize = 10;
  @Input() maxPages = 10;

  protected totalPageCount = 0;
  protected pages: number[] = []; // Max "maxPages" Pages

  @Output() page = new EventEmitter<number>();

  public ngOnInit(): void {
    this.calculateTotalPageCount();
    this.calculateDisplayedPages();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotalPageCount();
    this.calculateDisplayedPages();
  }

  protected onPageChanged(page: number) {
    this.currentPage = page;
    this.page.emit(this.currentPage);
    this.calculateDisplayedPages();
  }

  protected onPreviousClicked() {
    this.onPageChanged(this.currentPage === 0 ? 1 : this.currentPage - 1);
  }

  protected onNextClicked() {
    this.onPageChanged(this.currentPage === this.totalPageCount - 1 ? this.totalPageCount : this.currentPage + 1);
  }

  private calculateTotalPageCount() {
    this.totalPageCount = this.length === 0 ? 1 : Math.ceil(this.length / this.pageSize);
  }

  private createPageArray(start: number, end: number) {
    this.pages = [];
    for (let i = start - 1; i < end; i++) {
      this.pages.push(i);
    }
  }

  private calculateDisplayedPages() {
    if (this.totalPageCount <= this.maxPages) {
      this.createPageArray(1, this.totalPageCount);
      return;
    }

    const middle = Math.ceil(this.maxPages / 2);
    if (this.currentPage - middle <= 0) {
      this.createPageArray(1, this.maxPages);
      return;
    }

    if (this.currentPage + middle >= this.totalPageCount) {
      this.createPageArray(this.totalPageCount - this.maxPages + 1, this.totalPageCount);
      return;
    }

    const lastPageToDisplay = this.isRealNumber(this.maxPages / 2) ? middle - 1 : middle;
    this.createPageArray(this.currentPage - middle + 1, this.currentPage + lastPageToDisplay);
    return;
  }

  isRealNumber(value: number): boolean {
    return !isNaN(parseFloat(value + '')) && isFinite(value);
  }
}
