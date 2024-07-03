import { DateTime } from "luxon";

export class OrderModel {
    public id = '';
    public number = '';
    public date: DateTime | undefined;
    public status = '';
    public address = '';
    public phone = '';
    public creditCard = '';
    public creditCardIssuer = '';
    public email = '';
    public name = '';
    public products: OrderProductModel[] = [];
    public createdAt: DateTime | undefined;
}

export class OrderProductModel {
    public productId = '';
    public amount = 0;
}