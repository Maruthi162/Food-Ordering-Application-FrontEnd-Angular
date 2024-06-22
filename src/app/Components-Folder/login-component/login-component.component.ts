import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services-Folder/auth-service.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialUIModule } from '../../../Material-UI';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MaterialUIModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent {

  credentials={
    email:'',
    password:''
  }
  
  loginError='';
  constructor(private authServie:AuthServiceService, private router:Router){}

  login(){
    this.authServie.login(this.credentials).subscribe(response=>{
      if(response){
        const userRole=this.authServie.getUserRole();
      
        console.log("Role:",userRole);
        if(userRole==='Admin'){
          this.router.navigate(['/admin-dashboard']);
        }
        else if(userRole==='Customer'){
          this.router.navigate(['/customer-dashboard']);
        }
        else if(userRole==='Owner'){
          this.router.navigate(['owner-dashboard']);
        }
        console.log("login sucess");
      }
      else{
        this.loginError='Invalid Email or Password';
      }
    },
    error=>{
      console.error('login error', error);
      this.loginError='error occured during login';
    }
    );
  }

  logout(){
    this.authServie.logOut();
    this.router.navigate(['login']);
  }

  isLoggedIn(){
    return this.authServie.isLoggedIn();
  }
  
}
