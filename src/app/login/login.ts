import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database/database';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  userDetails: FormGroup;

  constructor(
    private fb: FormBuilder,
    private databaseService: DatabaseService,
  ) {
    this.userDetails = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.userDetails.valid) {
      this.databaseService.getUser(this.userDetails.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          alert('Login Successful');
          this.userDetails.reset();
        },
        error: (err) => {
          console.error('Login failure... ERROR', err);
          alert('Incorrect email or password.');
        }
      });
    }
  }

}