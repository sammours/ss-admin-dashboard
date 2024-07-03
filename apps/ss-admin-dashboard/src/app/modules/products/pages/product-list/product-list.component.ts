import { Component, OnInit, viewChildren } from '@angular/core';
import { CategoryUtil, FilterOptionsFactory, ProductFacade, ProductModel } from '@ss-admin-dashboard/feature';
import { Breadcrumb, Filter, FilterOptions, PaginatedList, clone } from '@ss-admin-dashboard/util-common';
import { BaseComponent } from '../../../../base.component';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ProductListFilterComponent } from '../../components/product-list-filter/product-list-filter.component';

@Component({
  selector: 'ad-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent extends BaseComponent implements OnInit {
  protected filterComponent = viewChildren(ProductListFilterComponent);
  protected result = new PaginatedList<ProductModel>();
  protected CategoryUtil = CategoryUtil;
  protected breadcrumbs: Breadcrumb[] = [
    { text: 'Products', link: '', icon: 'product'}
  ];

  protected filter = new FilterOptions();
  protected filterFactory = new FilterOptionsFactory();
  protected term = '';

  constructor(private readonly facade: ProductFacade,
    private readonly router: Router
  ) {
    super();
    this.filter.sort = { field: 'name', direction: 'asc'};
    this.filter.take = 20;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getAll();
    this.facade.list$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        this.result = result
      }
    });
  }

  protected getProductPrice(product: ProductModel) {
    const priceAfterDiscount = product.discount === 0 ? product.price : product.price * ((100 - product.discount) / 100);
    return priceAfterDiscount === product.price
      ? `${product.price}€`
      : `<span class="old-price text-red-500">${product.price}€</span> <span class="text-lg">${Math.round(priceAfterDiscount*100)/100}€</span>`
  }

  protected onClearFilterClicked(field: string) {
    if (field === '') {
      this.filter.filter = [];
      this.filterComponent().forEach(x => x.clearSelectedCategories());
    } else {
      this.filterFactory.filter(this.filter, field, '');
      if (field === 'categories') {
        this.filterComponent().forEach(x => x.clearSelectedCategories());
      }
    }

    this.getAll();
  }

  protected onFilterChanged(filter: Filter[]) {
    this.filter.filter = filter;
    this.getAll();
  }

  protected onEditClicked(id: string) {
    this.router.navigate(['/products', id]);
  }

  protected onSortChanged(field: string, direction: 'asc' | 'desc') {
    this.filterFactory.sort(this.filter, field, direction);
    this.getAll();
  }

  protected onPageChanged(page: number) {
    this.filterFactory.paginate(this.filter, page);
    this.getAll()
  }

  private getAll() {
    this.facade.getAll(clone(this.filter));
  }
}

