import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

constructor(private http : HttpClient) { }
searchTermSubject = new Subject<string>();

#API = 'https://dummyjson.com/products/search';

products$: Observable<any> = this.searchTermSubject.pipe(
  debounceTime(500),
  distinctUntilChanged(),
  filter((termSearch)=> termSearch.trim().length >2),
  tap((searchTerm)=> console.log(`the search term: ${searchTerm}`)),
  switchMap((searchTerm)=> this.fetchProducts(searchTerm)),
  map((response: any)=> response.products)
);

  searchByText(term : string){
    this.searchTermSubject.next(term.trim())
  }

  private fetchProducts(searchTerm : string){
    const apiUrl = `${this.#API}?q=${searchTerm}`;
    return this.http.get(apiUrl).pipe(
      catchError((error)=> {
        console.error('Error getting Products',error);
        return of([]);
      })
    );

  }
}
