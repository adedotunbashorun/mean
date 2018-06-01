import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    fullname: new FormControl(null, [Validators.required]),
    username: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
    cpass: new FormControl(null, [Validators.required])
  });

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  moveToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    if (!this.registerForm.valid) {
      console.log({'msg': 'invalid inputs'});
      return {'msg': 'invalid inputs'};
    } else if (this.registerForm.controls.password.value !== this.registerForm.controls.cpass.value) {
      console.log({'msg': 'Password and confirm password do not match!'});
      return {'msg': 'Password and confirm password do not match!'};
    }
    this.userService.register(JSON.stringify(this.registerForm.value))
    .subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/login']);
      },
      error => console.log(error)
    );
  }

}
