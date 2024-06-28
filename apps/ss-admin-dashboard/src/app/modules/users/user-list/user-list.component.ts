import { Component, OnInit } from '@angular/core';
import { FilterOptionsFactory, UserFacade, UserModel, UserModelUtil } from '@ss-admin-dashboard/feature';
import { Breadcrumb, FilterOptions, MenuItem, PaginatedList, clone } from '@ss-admin-dashboard/util-common';
import { BaseComponent } from '../../../base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'ad-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent extends BaseComponent implements OnInit {
  protected result = new PaginatedList<UserModel>();
  protected UserModelUtil = UserModelUtil;

  protected breadcrumbs: Breadcrumb[] = [
    { text: 'Users', link: '', icon: 'users'}
  ];

  protected filter = new FilterOptions();
  protected filterFactory = new FilterOptionsFactory();
  protected term = '';
  constructor(protected readonly facade: UserFacade) {
    super();
    this.filter.sort = { field: 'name', direction: 'asc'};
  }

  public ngOnInit(): void {
    this.getAll();
    this.facade.list$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        this.result = result
      }
    });
  }

  protected getMenuItem(id: string) {
    return [
      { text: 'Edit', link: `/users/${id}`, icon: 'edit'},
      { text: 'Delete', link: '', icon: 'delete'}
    ] as MenuItem[];
  }

  protected onFilterChanged(value: string) {
    this.term = value;
    this.changeFilter('all', value);
  }

  protected isFieldActive(field: string) {
    return this.filterFactory.hasFilter(this.filter, field);
  }

  protected onActiveClicked() {
    this.filter.filter = this.filter.filter.where(x => x.field !== 'inactive' && x.field !== 'blocked')
    this.filterFactory.toggleFilter(this.filter, 'active');
    this.getAll();
  }    

  protected onInactiveClicked() {
    this.filter.filter = this.filter.filter.where(x => x.field !== 'active' && x.field !== 'blocked')
    this.filterFactory.toggleFilter(this.filter, 'inactive');
    this.getAll();
  }

  protected onBlockedClicked() {
    this.filter.filter = this.filter.filter.where(x => x.field !== 'active' && x.field !== 'inactive')
    this.filterFactory.toggleFilter(this.filter, 'blocked');
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

