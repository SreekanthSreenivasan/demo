import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {}
  search(term: string): void {
    this.sharedService.SearchData(term);
  }
}
