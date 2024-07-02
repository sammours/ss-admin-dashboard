import { ProductModel } from "../models";

export class ProductUtil {
    public static getFinalPrice(product: ProductModel) {
        const finalPrice = product.discount === 0 ? product.price : product.price * ((100 - product.discount) / 100);
    return Math.round(finalPrice*100)/100;
    }
}