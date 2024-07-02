import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent, SidebarComponent, categories } from '@ss-admin-dashboard/feature';
import { faker } from '@faker-js/faker';
import { initFlowbite } from 'flowbite';
import { MenuItem } from '@ss-admin-dashboard/util-common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule, HeaderComponent, SidebarComponent],
  selector: 'ad-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {
  public showSidebar = signal(false);

  constructor() {
    // const productIds: string[] = [];
    // for(let i = 0; i < 50; i++) {
    //   productIds.push(faker.string.uuid())
    // }
    // const products = [];
    // const comments = [];
    // for(let i = 0; i < productIds.length; i++) {
    //   products.push(this.generateProductFaker(productIds[i]));
    // }

    // for(let i = 0; i < 1000; i++) {
    //   comments.push(this.generateComments(productIds));
    // }

    // console.log(JSON.stringify(products));
    // console.log(JSON.stringify(comments));
  }

  public ngOnInit(): void {
    initFlowbite();
  }

  protected getMenuItem(id: string) {
    return [
      { text: 'Edit', link: `/users/${id}`, icon: 'edit'},
      { text: 'Delete', link: '', icon: 'delete'}
    ] as MenuItem[];
  }

  generateFaker() {
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
    }
  }

  generateProductFaker(productId: string) {
    return {
      id: productId,
      name: faker.commerce.productName(),
      material: faker.commerce.productMaterial(),
      description: faker.lorem.paragraph({ min: 10, max: 20}),
      price: faker.commerce.price({ max: 999, dec: 0 }),
      discount: faker.number.int({ min: 0, max: 100 }),
      amount: faker.number.int({ min: 0, max: 20 }),
      category: categories[Math.floor(Math.random() * categories.length)].text, //faker.commerce.department(),
      rating: faker.number.int({ min: 1, max: 5 }),
      images: [faker.image.urlLoremFlickr({ category: 'product' }), faker.image.urlLoremFlickr({ category: 'product' }),faker.image.urlLoremFlickr({ category: 'product' })],
      createdAt: faker.date.past(),
    }
  }

  generateComments(productIds: string[]) {
    return {
      id: faker.string.uuid(),
      productId: productIds[Math.floor(Math.random() * productIds.length)],
      name: faker.person.fullName(),
      comment: faker.lorem.sentence(),
      avatar: faker.image.avatar(),
      createdAt: faker.date.past(),
      rating: faker.number.int({ min: 1, max: 5 }),
    }
  }
}

