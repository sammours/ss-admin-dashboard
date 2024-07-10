import { Component, OnInit, signal } from '@angular/core';
import { FilterOptionsFactory, MailFacade, MailFolder, MailModel, MailPaginatedList } from '@ss-admin-dashboard/feature';
import { Breadcrumb, FilterOptions, clone } from '@ss-admin-dashboard/util-common';
import { BaseComponent } from '../../../../base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'ad-inbox',
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
})
export class InboxComponent extends BaseComponent implements OnInit {
  protected result = new MailPaginatedList();

  protected breadcrumbs: Breadcrumb[] = [
    { text: 'Mailbox', link: '', icon: 'inbox'}
  ];

  protected activeFolder = signal<MailFolder>('inbox');
  protected activeEmail = signal<MailModel>(new MailModel());
  protected filter = new FilterOptions();
  protected filterFactory = new FilterOptionsFactory();
  protected page = 0;
  protected hasReachedMax = false;

  constructor(private readonly facade: MailFacade
  ) {
    super();
    this.filterFactory.filter(this.filter, 'folder', this.activeFolder());
    this.filter.skip = 0;
    this.hasReachedMax = false;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getAll();
    this.facade.list$.pipe(takeUntil(this.unsubscribe$)).subscribe((result) => {
      if (result) {
        this.result = result;
        this.hasReachedMax = this.getMaxMailInFolder() === result.items.length;
      }
    });
  }

  protected onLoadMoreClicked() {
    this.page++;
    this.filter.skip = this.filter.take * this.page;
    this.getAll();
  }

  protected onEmailSelected(mail: MailModel) {
    this.activeEmail.set(mail);
  }

  protected onSortClicked() {
    this.filterFactory.sort(this.filter, 'date');
    this.getAll();
  }

  protected onPageChanged(page: number) {
    this.filterFactory.paginate(this.filter, page);
    this.getAll()
  }

  protected onFolderChanged(value: MailFolder) {
    this.page = 0;
    this.activeEmail.set(new MailModel());
    this.filter.skip = this.filter.take * this.page;
    this.activeFolder.set(value);
    this.filterFactory.filter(this.filter, 'folder', value);
    this.getAll();
  }

  private getMaxMailInFolder() {
    switch(this.activeFolder()) {
      case 'inbox': return this.result.inboxCount;
      case 'junk': return this.result.junkCount;
      case 'flagged': return this.result.flaggedCount;
      case 'drafts': return this.result.draftsCount;
      default: return this.result.inboxCount;
    }
  }

  private getAll() {
    this.facade.getAll(clone(this.filter));
  }
}

