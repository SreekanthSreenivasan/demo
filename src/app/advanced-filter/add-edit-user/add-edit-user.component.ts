import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
})
export class AddEditUserComponent implements OnInit {
  Formdata!: FormGroup;
  editData: any;
  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.Formdata = this.fb.group({
      name: ['', [Validators.required]],
      address: new FormGroup({
        street: new FormControl(),
        city: new FormControl(),
        zipcode: new FormControl(),
      }),
    });

    if (this.data.mode === 'edit') {
      console.log(this.data.fullData);
      this.editData = this.data.fullData;
      this.Formdata.patchValue(this.editData);
    }
  }
  addNewUser() {
    console.log(this.Formdata.value);
    this.sharedService.addNewUser.next(this.Formdata.value);
  }

  editUser() {
    this.sharedService.editUser.next({
      userData: this.data.userDetails,
      editedData: this.Formdata.value,
    });
  }
}
