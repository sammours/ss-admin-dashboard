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
        if (filter.take === -1) {
          result.items = this.sortResult(filter.sort, filtered);
        } else {
          result.items = this.sortResult(filter.sort, filtered).slice(
            filter.skip,
            filter.skip + filter.take
          );
        }
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

  public getByIds(ids: string[]) {
    return this.http.get('/assets/mockData/product-mock.json').pipe(
      map((result) => result as ProductModel[]),
      map((result) => result.filter(x => ids.contains(id => id === x.id))),
    );
  }

  private filterResult(filterList: Filter[], result: ProductModel[])  {
    filterList.forEach(filter => {
      switch (filter.field) {
         case 'term':
          result = result.where(x => 
            x.name.contains(filter.value) ||
            x.description.contains(filter.value));
            break;
        case 'categories': {
          const values = filter.value.split(',');
          result = result.where(x => values.contains(c => c === x.category ));
          break;
        }
        case 'min': result = result.where(x => x.price >= parseInt(filter.value, 10)); break;
        case 'max': result = result.where(x => x.price <= parseInt(filter.value, 10)); break;
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
      default:
        return sort.direction === 'asc'
        ? result.orderBy((x) => x.name)
        : result.orderByDescending((x) => x.name);
    }
  }
}
