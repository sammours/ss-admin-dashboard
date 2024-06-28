import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ProductModel } from '../models/product.model';
import {
  Filter,
  FilterOptions,
  PaginatedList,
  Sort,
} from '@ss-admin-dashboard/util-common';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  public getAll(filter: FilterOptions) {
    return this.http.get('/assets/mockData/product-mock.json').pipe(
      map((result) => result as ProductModel[]),
      map((list) => {
        const result = new PaginatedList<ProductModel>();
        const filtered = this.filterResult(filter.filter, list);
        result.totalCount = filtered.length;
        result.items = this.sortResult(filter.sort, filtered).slice(
          filter.skip,
          filter.skip + filter.take
        );
        return result;
      })
    );
  }

  public getById(id: string) {
    return this.http.get('/assets/mockData/product-mock.json').pipe(
      map((result) => result as ProductModel[]),
      map((result) => result.find(x => x.id === id)),
    );
  }

  private filterResult(filterList: Filter[], result: ProductModel[])  {
    filterList.forEach(filter => {
      switch (filter.field) {
         case 'all':
          result = result.where(x => 
            x.name.contains(filter.value) ||
            x.description.contains(filter.value) ||
            x.category.contains(filter.value) ||
            x.price === parseFloat(filter.value));
            break;

        case 'discount': result = result.where(x => x.discount > 0); break;
        case 'available': result = result.where(x => x.amount > 0); break;
        case 'rating': result = result.where(x => x.rating === parseInt(filter.value, 10)); break;
      }
    });
    return result;
  }

  private sortResult(sort: Sort, result: ProductModel[]) {
    switch (sort.field) {
      case 'name':
        return sort.direction === 'asc'
          ? result.orderBy((x) => x.name)
          : result.orderByDescending((x) => x.name);
      case 'price':
        return sort.direction === 'asc'
          ? result.orderBy((x) => x.price)
          : result.orderByDescending((x) => x.price);
      case 'discount':
        return sort.direction === 'asc'
          ? result.orderBy((x) => x.discount)
          : result.orderByDescending((x) => x.discount);
      case 'category':
        return sort.direction === 'asc'
          ? result.orderBy((x) => x.category)
          : result.orderByDescending((x) => x.category);
          case 'rating':
            return sort.direction === 'asc'
              ? result.orderBy((x) => x.rating)
              : result.orderByDescending((x) => x.rating);
              case 'amount':
            return sort.direction === 'asc'
              ? result.orderBy((x) => x.amount)
              : result.orderByDescending((x) => x.amount);
      default:
        return sort.direction === 'asc'
        ? result.orderBy((x) => x.name)
        : result.orderByDescending((x) => x.name);
    }
  }
}
