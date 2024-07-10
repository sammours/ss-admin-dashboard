import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ChatComponent,
  HeaderComponent,
  SidebarComponent,
  categories,
  mailFolders,
  orderStatus,
} from '@ss-admin-dashboard/feature';
import { faker } from '@faker-js/faker';
import { initFlowbite } from 'flowbite';
import { MenuItem } from '@ss-admin-dashboard/util-common';
import { productIds } from '../assets/mockData/productids-mock';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent, SidebarComponent, ChatComponent],
  selector: 'ad-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  public showSidebar = signal(false);

  constructor() {
    // // Add Users
    // const users = [];
    // for(let i = 0; i < 100; i++) {
    //   users.push(this.generateUserFaker());
    // }
    // console.log(JSON.stringify(users));

    // // Add Products
    // const products = [];
    // for(let i = 0; i < productIds.length; i++) {
    //   products.push(this.generateProductFaker(productIds[i]));
    // }
    // console.log(JSON.stringify(products));

    // // Add Comments
    // const comments = [];
    // for(let i = 0; i < 1000; i++) {
    //   comments.push(this.generateComments(productIds));
    // }
    // console.log(JSON.stringify(comments));

    // // Add Orders
    // const orders = [];
    // for(let i = 0; i < 100; i++) {
    //   orders.push(this.generateOrders(productIds));
    // }
    // console.log(JSON.stringify(orders));

    // // Add Mails
    // const mails = [];
    // for(let i = 0; i < 100; i++) {
    //   mails.push(this.generateMails());
    // }
    // console.log(JSON.stringify(mails));
  }

  public ngOnInit(): void {
    initFlowbite();
  }

  protected getMenuItem(id: string) {
    return [
      { text: 'Edit', link: `/users/${id}`, icon: 'edit' },
      { text: 'Delete', link: '', icon: 'delete' },
    ] as MenuItem[];
  }

  private generateUserFaker() {
    return {
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      jobTitle: faker.person.jobTitle(),
      country: faker.location.country(),
      city: faker.location.city(),
      street: faker.location.streetAddress(),
      zipCode: faker.location.zipCode(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      birthDate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
      blocked: faker.datatype.boolean(),
      active: faker.datatype.boolean(),
    };
  }

  private generateMails() {
    return {
      id: faker.string.uuid(),
      sender: faker.person.fullName(),
      subject: faker.lorem.sentence(),
      body: this.getBody(),
      folder: mailFolders[Math.floor(Math.random() * mailFolders.length)],
      date: faker.date.past(),
      avatar: faker.image.avatar(),
      isRead: faker.datatype.boolean(),
      from: faker.internet.email()
    };
  }

  private generateProductFaker(productId: string) {
    return {
      id: productId,
      name: faker.commerce.productName(),
      material: faker.commerce.productMaterial(),
      description: faker.lorem.paragraph({ min: 10, max: 20 }),
      price: faker.commerce.price({ min: 1, max: 999, dec: 0 }),
      discount: faker.number.int({ min: 0, max: 100 }),
      amount: faker.number.int({ min: 1, max: 20 }),
      category: categories[Math.floor(Math.random() * categories.length)].text,
      rating: faker.number.int({ min: 1, max: 5 }),
      images: [
        faker.image.urlLoremFlickr({ category: 'product' }),
        faker.image.urlLoremFlickr({ category: 'product' }),
        faker.image.urlLoremFlickr({ category: 'product' }),
      ],
      createdAt: faker.date.past(),
    };
  }

  private generateComments(productIds: string[]) {
    return {
      id: faker.string.uuid(),
      productId: productIds[Math.floor(Math.random() * productIds.length)],
      name: faker.person.fullName(),
      comment: faker.lorem.sentence(),
      avatar: faker.image.avatar(),
      createdAt: faker.date.past(),
      rating: faker.number.int({ min: 1, max: 5 }),
    };
  }

  private generateOrders(productIds: string[]) {
    const products = [];
    for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
      products.push({
        productId: productIds[Math.floor(Math.random() * productIds.length)],
        amount: faker.number.int({ min: 0, max: 20 }),
      });
    }

    return {
      id: faker.string.uuid(),
      number: faker.string.alphanumeric({ length: { min: 10, max: 12 } }),
      date: faker.date.past(),
      status: orderStatus[Math.floor(Math.random() * orderStatus.length)].text,
      address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
      phone: faker.phone.number(),
      creditCard: faker.finance.creditCardNumber(),
      creditCardIssuer: faker.finance.creditCardIssuer(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      products: products,
      createdAt: faker.date.past(),
    };
  }

  private getBody(): string {
    const sentences = [
      `<p>${faker.lorem.paragraph({ min: 10, max: 20 })}</p>`,
      '<br />',
      '<br />',
      `<i>${faker.lorem.paragraph({ min: 20, max: 30 })}</i>`,
    ];
    return sentences.join(' ');
}

}
