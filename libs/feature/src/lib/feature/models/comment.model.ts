import { DateTime } from "luxon";

export class CommentModel { 
    public id = '';
    public productId = '';
    public name = '';
    public comment = '';
    public avatar = '';
    public rating = 0;
    public createdAt: DateTime | undefined;
}