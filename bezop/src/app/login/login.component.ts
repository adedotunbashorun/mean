import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  msg = '';
  success = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  moveToRegister() {
    this.router.navigate(['/register']);
  }

  login() {
    if (!this.loginForm.valid) {
      console.log({'msg': 'invalid inputs'});
      this.msg = 'Invalid Inputs';
    } else {
      this.userService.login(JSON.stringify(this.loginForm.value))
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/dashboard']);
          this.success = 'Login Successfull';
        },
        error => {console.log(error); this.msg = error.error.message; }
      );
    }
  }

}
