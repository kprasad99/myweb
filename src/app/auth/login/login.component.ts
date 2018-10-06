import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faSpinner = faSpinner;
  isInProgress = false;
  returnUrl: string;
  error = '';

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // reset login status
    this.auth.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  onSubmit() {
    if (this.loginForm.controls.username.invalid && this.loginForm.controls.username.invalid) {
      return;
    }
    this.loginForm.setErrors({ loginFailed: false });
    this.isInProgress = true;
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;
    this.auth.login(username, password).subscribe(r => {
      localStorage.setItem('currentUser', JSON.stringify({
        username: username,
        token: r.headers.get('x-auth-token')
      }));
    }, e => {
      console.log(e);
      this.isInProgress = false;
      this.loginForm.setErrors({ loginFailed: true });
    }, () => {
      this.isInProgress = false;
      this.router.navigate([this.returnUrl]);
    });
  }
}
