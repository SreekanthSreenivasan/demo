import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared-service.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from '../advanced-filter/add-edit-user/add-edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userDetails: any[] = [];
  // filteredArray: any[] = [];
  constructor(public userService: SharedService, public dialog: MatDialog) {}

  searchData$ = this.userService.searchInput$;

  ngOnInit(): void {
    this.userService.addNewUser.subscribe((data) => {
      if (data) {
        debugger;
        const obj = {
          id: +this.userDetails.length + 1,
          name: data.name,
          address: {
            street: data.address.street,
            city: data.address.city,
            zipcode: data.address.zipcode,
          },
        };
        console.log(obj);
        this.userDetails = [...this.userDetails, obj];
      }
    });

    this.userService.editUser.subscribe((data) => {
      debugger;
      let index = this.userDetails.indexOf(data.userData);
      this.userDetails[index] = { ...data.editedData, id: index + 1 };
    });

    this.searchData$.subscribe((response) => {
      if (response) {
        this.userDetails = this.userDetails.filter((data) =>
          data.name.toLowerCase().startsWith(response.toLowerCase())
        );
      } else {
        this.getAllData();
      }
    });

    this.userService.currentStatusToggle.subscribe((currentStatus) => {
      if (currentStatus) {
        this.userDetails = this.userDetails.filter(
          (fullData) => fullData.id % 2 === 0
        );
      } else {
        this.getAllData();
      }
    });

    this.getAllData();
  }

  getAllData() {
    this.userService.getAllData('users').subscribe((data: any) => {
      this.userDetails = data;
    });
  }

  deleteUser(user: any) {
    const index = this.userDetails.indexOf(user);
    this.userDetails.splice(index, 1);
  }

  editUser(user: any) {
    const obj = {
      id: user.id,
      name: user.name,
      address: {
        street: user.address.street,
        city: user.address.city,
        zipcode: user.address.zipcode,
      },
    };
    this.dialog.open(AddEditUserComponent, {
      data: {
        mode: 'edit',
        header: 'Update',
        fullData: obj,
        userDetails: user,
      },
    });
  }

  // filter by even number
}
