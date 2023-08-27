import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryAspService {
  categorySource = new Subject<string>();
  category$ = this.categorySource.asObservable();

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get('http://localhost:5075/api/Categories').pipe(
      // change category.id to category.nameIdentificator for compatibility with code that early relied on firebase.
      switchMap((categories) => {
        (<any[]>categories).forEach((category) => {
          category.id = category.nameIdentificator;
        });

        return of(categories);
      })
    );
  }

  getByNameIdentificator(nameIdentificator: string) {
    return this.http.get(
      'http://localhost:5075/api/Categories/' + nameIdentificator
    );
  }
}
