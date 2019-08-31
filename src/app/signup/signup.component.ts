import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder }  from '@angular/forms';
import { UsersService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUp: FormGroup;
  genderList = [
    {id: 1, name: 'Male'},
    {id: 2, name: 'Female'}
  ]
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

    this.signUp = this.formBuilder.group({
      userName: this.formBuilder.control(null, [Validators.required, Validators.minLength(4)]),
      email: this.formBuilder.control(null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)]),
      gender: this.formBuilder.control(null, [Validators.required]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: this.formBuilder.control(null, [Validators.required]),
    });
  }

  register = () => {
    this.submitted = true;

    if (this.signUp.valid) {
      if (this.signUp.controls['confirmPassword'].value === this.signUp.controls['password'].value) {
        this.usersService.registerUser(this.signUp.value).subscribe((user) => {
          this.isSubmit = true;
          if (user.status) {
            this.submitted = false;
            this.isSubmit = false;
            this.isSuccess = true;
            this.successMessage = user.msg
            this.signUp.reset();
            setTimeout(()=> {
              this.isSuccess = false;
              this.isError = false;
            }, 2000)
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
      } else {
        this.isMismatch = true;
      }
    }
  }

  checkPassword = () => {
    if (this.signUp.controls['confirmPassword'].value === this.signUp.controls['password'].value) {
      this.isMismatch = false;
    } else {
      this.isMismatch = true;
    }
  }

  loginPage(){
    this.router.navigate(['/login']) 
  }

}
