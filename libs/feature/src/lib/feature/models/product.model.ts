import { DateTime } from "luxon";

export class ProductModel { 
    public id = '';
    public name = '';
    public description = '';
    public price = 0;
    public discount = 0;
    public amount = 0;
    public category = '';
    public material = '';
    public rating = 0;
    public images: string[] = [];
    public createdAt: DateTime | undefined;
}