import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  currentStatusToggle = new Subject<any>();
  addNewUser = new Subject<any>();
  editUser = new Subject<any>();
  SearchInput = new Subject<any>();
  searchInput$ = this.SearchInput.asObservable();

  selectedStatus$ = this.currentStatusToggle.asObservable();

  baseUrl: string = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) {}
  getAllData(type: string) {
    return this.http.get(`${this.baseUrl}/${type}`);
  }

  toggleId(currentStatus: string) {
    this.currentStatusToggle.next(currentStatus);
  }

  public SearchData(value: any) {
    this.SearchInput.next(value);
  }
}
