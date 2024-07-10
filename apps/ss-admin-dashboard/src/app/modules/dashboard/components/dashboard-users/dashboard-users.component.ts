import { Component, OnInit, signal } from '@angular/core';
import { BaseComponent } from '../../../../base.component';
import { FilterOptionsFactory, UserFacade, UserModel, UserModelUtil } from '@ss-admin-dashboard/feature';
import { takeUntil } from 'rxjs';
import { FilterOptions } from '@ss-admin-dashboard/util-common';

@Component({
  selector: 'ad-dashboard-users',
  templateUrl: './dashboard-users.component.html',
  styleUrl: './dashboard-users.component.scss',
})
export class DashboardUsersComponent extends BaseComponent implements OnInit {
  protected users = signal<UserModel[]>([]);
  
  protected factory = new FilterOptionsFactory();
  protected UserModelUtil = UserModelUtil;

  constructor(private readonly userFacade: UserFacade) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.getActiveUsers();
    this.userFacade.list$.pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.users.set(result.items);
      }
    });
  }

  private getActiveUsers() {
    const filter = new FilterOptions();
    filter.take = 10;
    filter.skip = 0;
    this.factory.filter(filter, 'active', 'true');
    this.factory.sort(filter, 'name');
    this.userFacade.getAll(filter);
  }
}

