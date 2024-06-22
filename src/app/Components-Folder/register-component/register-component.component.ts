import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services-Folder/auth-service.service';
import { RegisteredUser } from '../../Models/RegisteredUser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponentComponent {

  registeredUser:RegisteredUser={
    username:'',
    password:'',
    confirmPassword:'',
    email:'',
    phoneNumber:0
  }

  constructor(private authService:AuthServiceService, private router:Router){}

  selectedRole:string='';
  responseMessage!:string;
  status!:string;

  register(){
    this.authService.register(this.registeredUser,this.selectedRole).subscribe
    (response=>{
      console.log("Registeration successfull",response);
      this.responseMessage=response.message;
      this.status=response.status;
      alert("user Registered Successfully");
      
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 0);

    },
    (error)=>{
      console.log("Register failed", error);
      this.responseMessage=error.error.message;
      this.status=error.error.status;
    });
  }

}
