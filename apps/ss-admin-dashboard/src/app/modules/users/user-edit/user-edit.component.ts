import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFacade, UserModel, UserModelUtil, UserValidator } from '@ss-admin-dashboard/feature';
import { Breadcrumb, clone } from '@ss-admin-dashboard/util-common';
import { BaseComponent } from '../../../base.component';
import { takeUntil } from 'rxjs';
import { DateTime } from 'luxon';

@Component({
  selector: 'ad-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent extends BaseComponent implements OnInit {
  @Input() id = '';
  protected user = new UserModel();
  protected UserModelUtil = UserModelUtil;

  protected breadcrumbs: Breadcrumb[] = [
    { text: 'Users', link: '/users', icon: 'users'},
    { text: 'Edit', link: ''}
  ];

  protected editMode = false;

  protected validator = new UserValidator();
  protected birthDate = '';

  constructor(protected readonly facade: UserFacade,
    private readonly route: ActivatedRoute,
    private ref: ChangeDetectorRef
  ) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.user.id = this.id;
    this.getById();

    this.facade.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        this.user = clone(result);
        if (this.user.birthDate) {
          this.birthDate = this.user.birthDate.toFormat('dd.MM.yyyy');
        }
      }
    });
  }

  public onDateChanged(value: string) {
    this.user.birthDate = DateTime.fromFormat(value, 'dd.MM.yyyy');
    this.validator.validate(this.user);
  }

  public onChanged() {
    this.validator.validate(this.user);
  }

  private getById() {
    this.facade.getById(this.user.id);
  }
}

