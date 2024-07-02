import { Component, OnInit, input, output, signal } from '@angular/core';
import { FilterOptionsFactory, ProductModel } from '@ss-admin-dashboard/feature';
import { BaseComponent } from './../../../../base.component';
import { Filter, FilterOptions } from '@ss-admin-dashboard/util-common';

class FilterItem<T> {
  public item: T;
  public selected: boolean;
  public display: boolean;

  constructor(item: T, selected: boolean, display: boolean) {
    this.item = item;
    this.selected = selected;
    this.display = display;
  }
}

@Component({
  selector: 'ad-product-list-filter',
  templateUrl: './product-list-filter.component.html',
  styleUrl: './product-list-filter.component.scss',
})
export class ProductListFilterComponent extends BaseComponent implements OnInit {
  public products = input.required<ProductModel[]>();

  protected allCategories: FilterItem<string>[] = [];
  protected showAllCategories = signal(false);

  protected filterList = new FilterOptions();
  protected filterFactory = new FilterOptionsFactory();
  
  protected min = 0;
  protected max = 0;

  public filter = output<Filter[]>();

  override ngOnInit() {
    super.ngOnInit();
    this.min = Math.min(...this.products().map(x => x.price));
    this.max = Math.max(...this.products().map(x => x.price));
    this.allCategories = this.products().map(x => x.category).distinct(x => x).map((x, i) => new FilterItem(x, false,  i < 5));
  }

  public clearSelectedCategories() {
    this.allCategories.forEach(x => x.selected = false);
  }

  protected onTermChanged(value: string) {
    this.filterFactory.filter(this.filterList, 'term', value);
    this.filter.emit(this.filterList.filter);
  }

  protected onMinChanged(value: string) {
    this.filterFactory.filter(this.filterList, 'min', value.replace(/\D/g,''));
    this.filter.emit(this.filterList.filter);
  }

  protected onMaxChanged(value: string) {
    this.filterFactory.filter(this.filterList, 'max', value.replace(/\D/g,''));
    this.filter.emit(this.filterList.filter);
  }

  protected onShowCategoriesClicked() {
    if (this.showAllCategories() ===  true) {
      this.allCategories = this.products().map(x => x.category).distinct(x => x).map((x, i) => new FilterItem(x, false,  i < 5));
      this.showAllCategories.set(false);
    } else {
      this.allCategories = this.products().map(x => x.category).distinct(x => x).map((x) => new FilterItem(x, false,  true));
      this.showAllCategories.set(true);
    }
  }

  protected onCategorySelected(category: FilterItem<string>) {
    category.selected = !category.selected;
    const fieldName = 'categories';
    const allSelected = this.allCategories.filter(x => x.selected)?.map(x => x.item) ?? [];
    this.filterFactory.filter(this.filterList, fieldName, allSelected.join(','));
    this.filter.emit(this.filterList.filter);
  }

  protected onRatingChanged(rating: number) {
    this.filterFactory.filter(this.filterList, 'rating', rating.toString());
    this.filter.emit(this.filterList.filter);
  }
}
