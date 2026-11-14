import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database/database';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerUser: FormGroup;

  constructor(
    private fb: FormBuilder,
    private databaseService: DatabaseService,
  ){
  this.registerUser = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  firstName: ['',Validators.required],
  lastName: ['', Validators.required]
  //private dob: Date;
  });

}

onSubmit() {
  if(this.registerUser.valid){
    this.databaseService.createUser(this.registerUser.value).subscribe({
      next: (response) => {
        console.log("Task success, Registration Complete!", response);
        alert('Registration Successful');
        this.registerUser.reset();
      },
      error: (err) => {
        console.error('Registration failure... ERROR', err);
        alert('Failed to create user. Check the console for details.');
      }
    });
  }
}

}
