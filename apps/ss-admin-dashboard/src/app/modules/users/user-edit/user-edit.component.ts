import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFacade, UserModel, UserModelUtil, UserValidator } from '@ss-admin-dashboard/feature';
import { Breadcrumb, clone } from '@ss-admin-dashboard/util-common';
import { BaseComponent } from '../../../base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'ad-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent extends BaseComponent implements OnInit {
  protected user = new UserModel();
  protected UserModelUtil = UserModelUtil;

  protected breadcrumbs: Breadcrumb[] = [
    { text: 'Users', link: '/users', icon: 'users'},
    { text: 'Edit', link: ''}
  ];

  protected validator = new UserValidator();

  constructor(protected readonly facade: UserFacade,
    private readonly route: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.user.id = params.get('id') ?? '';
      }

      this.getById();
    })

    this.facade.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        this.user = clone(result)
      }
    });
  }

  public onChanged() {
    this.validator.validate(this.user);
  }

  private getById() {
    this.facade.getById(this.user.id);
  }
}

