import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
@Component({
  selector: 'app-advanced-filter',
  templateUrl: './advanced-filter.component.html',
  styleUrls: ['./advanced-filter.component.scss'],
})
export class AdvancedFilterComponent implements OnInit {
  currentStatus: string = 'Show Even Ids';
  constructor(private sharedService: SharedService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.sharedService.addNewUser.subscribe((data: any) => {
      data.address.value;

      if ((data.name !== '' && data.address.city !== '', data.address.street)) {
        this.dialog.closeAll();
      }
    });

    this.sharedService.editUser.subscribe((data: any) => {
      this.dialog.closeAll();
    });
  }

  changeStatus(status: any) {
    console.log(status.checked);
    // debugger;
    // status == 'Show All'
    //   ? (this.currentStatus = 'Show Even Ids')
    //   : (this.currentStatus = 'Show All');

    this.sharedService.toggleId(status.checked);
  }

  addNewUser() {
    this.dialog.open(AddEditUserComponent, {
      data: { mode: 'add', header: 'Add New' },
    });
  }
}
