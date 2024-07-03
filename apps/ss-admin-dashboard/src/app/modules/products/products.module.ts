import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { productsRoutes } from "./products.routes";
import { BreadcrumbComponent, ButtonComponent, CarouselComponent, HighlightPipe, IconComponent, LineComponent, MenuComponent, PaginatorComponent, RatingComponent, TruncatePipe } from "@ss-admin-dashboard/ui-common";
import { UtilCommonModule } from "@ss-admin-dashboard/util-common";
import { FormsModule } from "@angular/forms";
import { ProductListComponent } from "./pages/product-list/product-list.component";
import { ProductEditComponent } from "./pages/product-edit/product-edit.component";
import { ProductListFilterComponent } from "./components/product-list-filter/product-list-filter.component";
import { ProductPreviewComponent } from "./components/product-preview/product-preview.component";
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      RouterModule.forChild(productsRoutes),
      MenuComponent,
      IconComponent, 
      UtilCommonModule,
      PaginatorComponent,
      BreadcrumbComponent,
      ButtonComponent,
      CarouselComponent,
      HighlightPipe,
      TruncatePipe,
      MatDialogModule,
      RatingComponent,
      LineComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [ProductListComponent, ProductListFilterComponent, ProductEditComponent, ProductPreviewComponent]
  })
  export class ProductsModule { }