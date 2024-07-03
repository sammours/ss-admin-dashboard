import { AfterViewChecked, Component, ElementRef, Input, ViewChild, computed, signal, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonComponent, IconComponent, LineComponent } from '@ss-admin-dashboard/ui-common';
import { UserMenuComponent } from '../user-menu/user-menu.component';
import { CommonModule } from '@angular/common';
import { faker } from '@faker-js/faker';
import { combineLatest } from 'rxjs';
import { DateTime } from 'luxon';

interface Chat {
  message: string;
  owner: 'me' | 'you';
  date: Date;
}

@Component({
  standalone: true,
  imports: [CommonModule, IconComponent, LineComponent, ButtonComponent],
  selector: 'ad-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer: ElementRef | undefined;

  protected openChat = false;
  protected avatar = signal<string>('https://ipfs.io/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/989.jpg');
  protected fullName = signal<string>('Auer, Germaine');

  protected chats = signal<Chat[]>([
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'me' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'you' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'me' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'me' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'me' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'you' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'you' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'me' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'me' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'me' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'you' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'me' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'me' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'me' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'me' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'you' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'me' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'you' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'you' },
    { message: faker.lorem.sentence(), date: faker.date.past(), owner: 'you' },
  ]);

  public ngAfterViewChecked() {
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    }
  }
}
