import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  user_data = {name: '', email: ''};
  id: String;
  constructor(private route: ActivatedRoute, private router: Router, private user: UserService) {

   }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getActivate(this.id);
  }

  getActivate(user_id: any) {
      this.user.activate(user_id).subscribe(
        data => this.getDetails(data),
        error => this.router.navigate(['/login'])
      );
  }

  getDetails(data) {
    this.user_data.name = data.fullname;
  }

}
