import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder }  from '@angular/forms';
import { UsersService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  isSubmit = false;
  submitted = false;
  isSuccess = false;
  isError = false;
  isMismatch = false;
  successMessage = ''
  errorMessage = ''

  constructor(public formBuilder: FormBuilder,
    private usersService: UsersService,
    private router:Router) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(6)]),
    });
  }


  login = () => {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.usersService.loginUser(this.loginForm.value).subscribe((user) => {
        this.isSubmit = true;
        if (user.status) {
          this.submitted = false;
          this.isSubmit = false;
          localStorage.setItem('user', JSON.stringify(user.result[0]));
          this.router.navigate(['/']) 
        } else {
          this.submitted = false;
          this.isSubmit = false;
          this.isError = true;
          this.errorMessage = user.msg
          setTimeout(()=> {
            this.isError = false;
            this.isSuccess = false;
          }, 2000)
        }
      }, (error) => {
        this.submitted = false;
        this.isSubmit = false;
        this.isError = true;
        this.errorMessage = error.error.msg
          setTimeout(()=> {
            this.isError = false;
            this.isSuccess = false;
          }, 2000)
      });
    }
  }

}
