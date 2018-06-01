import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  user_data = {name: '', email: ''};
  Authenticated = false;
  constructor(private router: Router, private user: UserService) {
    setInterval(() => {
      this.user.getUser()
      .subscribe(
        data => { this.Authenticated = true; this.getDetails(data); },
        error => {this.Authenticated = false; console.log(error); }
      );
    }, 5000);

   }

  getDetails(data) {
    this.user_data.name = data.fullname;
    this.Authenticated = true;
  }

  logout() {
    this.user.Logout()
    .subscribe(
      data => {console.log(data); this.Authenticated = false; this.router.navigate(['/login']); },
      error => console.log(error)
    );
  }

}
