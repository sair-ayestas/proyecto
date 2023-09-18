import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../core/service/auth.service";
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit
{
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  public user : any = {};
  public usuario : any = {};
  public token : any = '';

  constructor(
    private router: Router,
    private admin: AuthService
  ){
    this.token = this.admin.getToken();
  }

  ngOnInit() {
    console.log(this.token);
    if (this.token) {
      this.router.navigate(['/dashboard']);
    }else{
      //mantiene en el componente
    }
  }

  login(loginForm:any){
    this.error = '';
    if (loginForm.valid) {
      let data = {
        correo: this.user.correo,
        password: this.user.password
      }
      this.admin.login_admin(data).subscribe(
        response=>{
          console.log(response);
          if (response.data == undefined) {
            this.error = response.message;
          }else{
            this.usuario = response.data;
            localStorage.setItem('token',response.token);
            localStorage.setItem('_id',response.data._id);
            this.router.navigate(['/dashboard']);
          }
        },
        error=>{
          console.log(error);
        }
      );
    }else{
      this.error = 'Ingrese los datos correspondientes!';
    }
  }
}
