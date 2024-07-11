import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {
  Filter,
  FilterOptions,
  PaginatedList,
  Sort,
} from '@ss-admin-dashboard/util-common';
import { MailModel, MailPaginatedList } from '../models/mail.model';

@Injectable({
  providedIn: 'root',
})
export class MailsService {
  constructor(private http: HttpClient) {}

  public getAll(filter: FilterOptions) {
    return this.http.get('/assets/mockData/mail-mock.json').pipe(
      map((result) => result as MailModel[]),
      map((list) => {
        const result = new MailPaginatedList();
        result.inboxCount = list.count(x => x.folder === 'inbox');
        result.draftsCount = list.count(x => x.folder === 'drafts');
        result.junkCount = list.count(x => x.folder === 'junk');
        result.flaggedCount = list.count(x => x.folder === 'flagged');
        result.totalCount = list.length;
        const filtered = this.filterResult(filter.filter, list);
        result.items = this.sortResult(filter.sort, filtered).slice(
          0,
          filter.skip + filter.take
        );
        return result;
      })
    );
  }

  public getLastEmail() {
    return this.http.get('/assets/mockData/mail-mock.json').pipe(
      map((result) => result as MailModel[]),
      map((list) => {
        return list.orderByDescending((x) => x.date)[0];
      })
    );
  }

  private filterResult(filterList: Filter[], result: MailModel[])  {
    filterList.forEach(filter => {
      switch (filter.field) {
        case 'folder': result = result.where(x => x.folder === filter.value); break;
      }
    });
    return result;
  }

  private sortResult(sort: Sort, result: MailModel[]) {
    return sort.direction === 'asc'
      ? result.orderBy((x) => x.date)
      : result.orderByDescending((x) => x.date);
  }
}
