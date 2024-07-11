import { Component, OnInit, signal } from '@angular/core';
import { BaseComponent } from '../../../../base.component';
import { MailFacade, MailModel } from '@ss-admin-dashboard/feature';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'ad-dashboard-last-email',
  templateUrl: './dashboard-last-email.component.html',
  styleUrl: './dashboard-last-email.component.scss',
})
export class DashboardLastEmailComponent extends BaseComponent implements OnInit {
  protected email = signal<MailModel | undefined>(undefined);

  constructor(private readonly mailFacade: MailFacade) {
    super();
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.mailFacade.getLastEmail();
    this.mailFacade.item$.pipe(takeUntil(this.unsubscribe$)).subscribe(result => {
      if (result) {
        this.email.set(result);
      }
    });
  }
}

