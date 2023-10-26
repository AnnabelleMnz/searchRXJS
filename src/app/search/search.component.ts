import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

products$:Observable<any> = this.service.products$;

searchByTerm(value: string) {
this.service.searchByText(value);
}

constructor(private service : SearchService){}
}
