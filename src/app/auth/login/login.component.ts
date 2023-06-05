import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userDetails: any = [];
  errorMsg: any;

  constructor(private fb: FormBuilder, private service: LoginService, private _router: Router) {
    this.service.loadUsers().subscribe(data => {

      this.userDetails = data;
    });

  }
  ngOnInit() {

    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  submitForm() {
    let username = this.loginForm.controls['userName'].value;
    let password = this.loginForm.controls['password'].value;
    const user = this.userDetails.find((u: any) => u.username === username && u.password === password)
    console.log(user);
    if (user) {
      localStorage.setItem('currentUser', user);
      this._router.navigateByUrl("/user");
    } else {
      this.errorMsg = 'Please enter the valid Username and Password'
    }

  }
}
