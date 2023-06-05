import { ChangeDetectionStrategy, Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChangeDetectorRef } from '@angular/core';
import { User } from '../user-model';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'address', 'state', 'city', 'actions'];
  dataSource!: User[];
  public modalRef!: BsModalRef;
  UserForm!: FormGroup;
  EditForm!: FormGroup;
  errorMsg: any;
  edittedUser: any;
  editedFormError: any
  constructor(private ref: ChangeDetectorRef, private _service: UserService, private modalService: BsModalService, private fb: FormBuilder) { }
  ngOnInit() {
    this._service.fetchData().subscribe(
      (data) => {
        this.dataSource = data;
        console.log(this.dataSource)
        this.dataSource = [...this.dataSource];
        this.ref.detectChanges();

      },
      (error) => {
        console.error('Error loading data:', error);
      }
    );
    this.UserForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],

    });
    this.EditForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],

    });
  }

  deleteUser(userId: number): void {
    console.log(userId)
    const index = this.dataSource.findIndex((user) => user.id === userId);
    console.log(index)
    if (index !== -1) {

      this.dataSource.splice(index, 1)
      console.log(this.dataSource)

      this.dataSource = [...this.dataSource];
      this.ref.detectChanges();
    }

  }
  showPopup(template: TemplateRef<any>) {

    this.modalRef = this.modalService.show(template, { backdrop: 'static', class: 'modal-md' });



  }
  submitAddForm() {
    if (this.UserForm.valid) {
      const newUser: User = {
        id: this.dataSource.length + 1,
        name: this.UserForm.controls['name'].value,
        phone: this.UserForm.controls['phone'].value,
        address: this.UserForm.controls['address'].value,
        state: this.UserForm.controls['state'].value,
        city: this.UserForm.controls['city'].value
      };
      this.dataSource.push(newUser);
      this.dataSource = [...this.dataSource]
      this.ref.detectChanges();
      console.log(this.dataSource)
      this.modalRef.hide();
    } else {
      this.errorMsg = 'Please Enter the valid Inputs'
    }

  }
  showEditUser(template: TemplateRef<any>, user: any) {
    this.modalRef = this.modalService.show(template, { backdrop: 'static', class: 'modal-md' });
    this.EditForm.patchValue({
      id: user.id,
      name: user.name,
      phone: user.phone,
      address: user.address,
      state: user.state,
      city: user.city,
    });
    this.edittedUser = user;

  }
  submitEditForm() {


    if (this.EditForm.valid) {

      console.log(this.dataSource);
      console.log(this.edittedUser);
      for (let i = 0; i < this.dataSource.length; i++) {
        if (this.dataSource[i].id === this.edittedUser.id) {
          this.dataSource[i].name = this.EditForm.controls['name'].value;
          this.dataSource[i].phone = this.EditForm.controls['phone'].value;
          this.dataSource[i].address = this.EditForm.controls['address'].value;
          this.dataSource[i].state = this.EditForm.controls['state'].value;
          this.dataSource[i].city = this.EditForm.controls['city'].value;
        }
      }
      this.modalRef.hide();

    } else {
      this.editedFormError = 'Please Enter the valid Inputs'
    }
  }

}
