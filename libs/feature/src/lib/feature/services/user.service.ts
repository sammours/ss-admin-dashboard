import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { UserModel } from '../models/user.model';
import {
  Filter,
  FilterOptions,
  PaginatedList,
  Sort,
} from '@ss-admin-dashboard/util-common';
import { UserModelUtil } from '../utilities';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public getAll(filter: FilterOptions) {
    return this.http.get('/assets/mockData/user-mock.json').pipe(
      map((result) => result as UserModel[]),
      map((list) => {
        const result = new PaginatedList<UserModel>();
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
    return this.http.get('/assets/mockData/user-mock.json').pipe(
      map((result) => result as UserModel[]),
      map((result) => result.find(x => x.id === id)),
    );
  }

  private filterResult(filterList: Filter[], result: UserModel[])  {
    filterList.forEach(filter => {
      switch (filter.field) {
         case 'all':
          result = result.where(x => 
            x.firstName.contains(filter.value) ||
            x.lastName.contains(filter.value) ||
            x.email.contains(filter.value) ||
            x.jobTitle.contains(filter.value) ||
            x.street.contains(filter.value) ||
            x.city.contains(filter.value) ||
            x.country.contains(filter.value) ||
            x.zipCode.contains(filter.value)); break;
        case 'active': result = result.where(x => x.active && !x.blocked); break;
        case 'inactive': result = result.where(x => !x.active && !x.blocked); break;
        case 'blocked': result = result.where(x => x.blocked); break;
      }
    });
    return result;
  }

  private sortResult(sort: Sort, result: UserModel[]) {
    switch (sort.field) {
      case 'name':
        return sort.direction === 'asc'
          ? result.orderBy((x) => UserModelUtil.fullName(x))
          : result.orderByDescending((x) => UserModelUtil.fullName(x));
      case 'jobTitle':
        return sort.direction === 'asc'
          ? result.orderBy((x) => x.jobTitle)
          : result.orderByDescending((x) => x.jobTitle);
      case 'birthDate':
        return sort.direction === 'asc'
          ? result.orderBy((x) => x.birthDate)
          : result.orderByDescending((x) => x.birthDate);
      case 'registeredAt':
        return sort.direction === 'asc'
          ? result.orderBy((x) => x.registeredAt)
          : result.orderByDescending((x) => x.registeredAt);
      default:
        return sort.direction === 'asc'
          ? result.orderBy((x) => UserModelUtil.fullName(x))
          : result.orderByDescending((x) => UserModelUtil.fullName(x));
    }
  }
}
