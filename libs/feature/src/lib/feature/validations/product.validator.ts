import { Rule, Validator } from "@ss-admin-dashboard/util-common";
import { ProductModel } from "../models";

export class ProductValidator extends Validator<ProductModel> {
    constructor() {
        super(
            new ProductNameMustBeDefinedRule(),
            new ProductDescriptionMustBeDefinedRule(),
            new ProductCategoryMustBeDefinedRule(),
            new ProductPriceMustNotBeZeroRule()
        );
    }
}


class ProductNameMustBeDefinedRule extends Rule<ProductModel>  {
    constructor() {
        super(x => x.name != null && x.name !== '', 'name', 'Name cannot be empty');
    }
}

class ProductDescriptionMustBeDefinedRule extends Rule<ProductModel>  {
    constructor() {
        super(x => x.description != null && x.description !== '', 'description', 'Description cannot be empty');
    }
}

class ProductCategoryMustBeDefinedRule extends Rule<ProductModel>  {
    constructor() {
        super(x => x.category != null && x.category !== '', 'category', 'Category cannot be empty');
    }
}

class ProductPriceMustNotBeZeroRule extends Rule<ProductModel>  {
    constructor() {
        super(x => x.price !== 0, 'price', 'Price cannot be 0');
    }
}
