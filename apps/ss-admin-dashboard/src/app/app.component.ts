import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent, SidebarComponent } from '@ss-admin-dashboard/feature';
import { faker } from '@faker-js/faker';
import { initFlowbite } from 'flowbite';

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
    // const list = [];
    // for(let i = 0; i < 50; i++) {
    //   list.push(this.generateProductFaker());
    // }

    // console.log(JSON.stringify(list));
  }

  public ngOnInit(): void {
    initFlowbite();
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

  generateProductFaker() {
    return {
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      discount: faker.number.int({ min: 0, max: 100 }),
      amount: faker.number.int({ min: 0, max: 20 }),
      category: faker.commerce.department(),
      rating: faker.number.int({ min: 1, max: 5 }),
      images: [faker.image.urlLoremFlickr({ category: 'product' }), faker.image.urlLoremFlickr({ category: 'product' }),faker.image.urlLoremFlickr({ category: 'product' })],
      createdAt: faker.date.past(),
    }
  }
}

