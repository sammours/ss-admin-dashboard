import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CommentModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  public getByProductId(productId: string) {
    return this.http.get('/assets/mockData/comment-mock.json').pipe(
      map((result) => result as CommentModel[]),
      map((result) => result.filter(x => x.productId === productId)),
    );
  }
}
