import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { OrderModel } from '../models/order.model';
import {
  Filter,
  FilterOptions,
  PaginatedList,
  Sort,
} from '@ss-admin-dashboard/util-common';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  public getAll(filter: FilterOptions) {
    return this.http.get('/assets/mockData/order-mock.json').pipe(
      map((result) => result as OrderModel[]),
      map((list) => {
        const result = new PaginatedList<OrderModel>();
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
    return this.http.get('/assets/mockData/order-mock.json').pipe(
      map((result) => result as OrderModel[]),
      map((result) => result.find(x => x.id === id)),
    );
  }

  private filterResult(filterList: Filter[], result: OrderModel[])  {
    filterList.forEach(filter => {
      switch (filter.field) {
        case 'status': result = result.where(x => x.status.toLowerCase() === filter.value.toLowerCase()); break;
        case 'date': {
          const today = DateTime.now();
          
          switch (filter.value) {
            case 'all': break;
            case 'week': result = result.where(x => DateTime.fromISO(x.date + '').startOf('day') >= today.startOf("week")); break;
            case 'month': result = result.where(x => DateTime.fromISO(x.date + '').startOf('day') >= today.startOf("month")); break;
            case 'three-months': result = result.where(x => DateTime.fromISO(x.date + '').startOf('day') >= today.minus({ month: 3 }).startOf("month")); break;
            case 'six-months': result = result.where(x => DateTime.fromISO(x.date + '').startOf('day') >= today.minus({ month: 6 }).startOf("month")); break;
            case 'year': result = result.where(x => DateTime.fromISO(x.date + '').startOf('day') >= today.startOf("year")); break;
          }
          break;
        }
      }
    });
    return result;
  }

  private sortResult(sort: Sort, result: OrderModel[]) {
    return sort.direction === 'asc'
      ? result.orderBy((x) => x.date)
      : result.orderByDescending((x) => x.date);
  }
}
