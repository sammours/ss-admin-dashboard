import { Component, OnInit } from '@angular/core';
import { FilterOptionsFactory, ProductFacade, ProductModel } from '@ss-admin-dashboard/feature';
import { Breadcrumb, FilterOptions, PaginatedList, clone } from '@ss-admin-dashboard/util-common';
import { BaseComponent } from '../../../base.component';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ad-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent extends BaseComponent implements OnInit {
  protected result = new PaginatedList<ProductModel>();

  protected breadcrumbs: Breadcrumb[] = [
    { text: 'Products', link: '', icon: 'product'}
  ];

  protected filter = new FilterOptions();
  protected filterFactory = new FilterOptionsFactory();
  protected term = '';
  protected openDialog = false;
  protected selectedProduct: ProductModel | undefined;
  protected activeImage: string | undefined;
  constructor(private readonly facade: ProductFacade,
    private readonly router: Router
  ) {
    super();
    this.filter.sort = { field: 'name', direction: 'asc'};
    this.filter.filter.push({ field: 'available', value: 'true'});
  }

  public ngOnInit(): void {
    this.getAll();
    this.facade.list$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        this.result = result
      }
    });
  }

  protected getProductPrice(product: ProductModel) {
    const priceAfterDiscount = product.discount === 0 ? product.price : product.price * (product.discount / 100);
    return priceAfterDiscount === product.price
      ? `${product.price}€`
      : `<span class="old-price text-red-500">${product.price}€</span> <span class="text-lg">${Math.round(priceAfterDiscount*100)/100}€</span>`
  }

  protected onProductSelected(product: ProductModel) {
    this.selectedProduct = product;
    this.activeImage = product.images[0];
    this.openDialog = true;
  }

  protected onDialogClosed() {
    this.selectedProduct = undefined;
    this.activeImage = undefined;
    this.openDialog = false;
  }

  protected onFilterChanged(value: string) {
    this.term = value;
    this.changeFilter('all', value);
  }

  protected onEditClicked(id: string) {
    this.router.navigate(['/products', id]);
  }

  protected isFieldActive(field: string) {
    return this.filterFactory.hasFilter(this.filter, field);
  }
  
  protected onAvailableClicked() {
    this.filterFactory.toggleFilter(this.filter, 'available');
    this.getAll();
  }

  protected onDiscountOnlyClicked() {
    this.filterFactory.toggleFilter(this.filter, 'discount');
    this.getAll();
  }

  protected onSortClicked(field: string) {
    this.filterFactory.sort(this.filter, field);
    this.getAll();
  }

  protected onPageChanged(page: number) {
    this.filterFactory.paginate(this.filter, page);
    this.getAll()
  }

  private changeFilter(field: string, value: string) {
    this.filterFactory.filter(this.filter, field, value);
    this.getAll();
  }

  private getAll() {
    this.facade.getAll(clone(this.filter));
  }
}

