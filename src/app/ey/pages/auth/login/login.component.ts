import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {AuthService} from "../../../../data/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public submit: boolean = false;
  public myForm: FormGroup;

  /** Inicializamos requerimientos para los inputs*/
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      username: [, [Validators.required]],
      password: [, [Validators.required,  Validators.minLength(5)]],
    })
  }

  ngOnInit(): void {
  }

  /** Funcion de login */
  login() {
    if(!this.myForm.invalid){
      const { username, password } = this.myForm.value;
      this.authService.login(username, password).subscribe(response => {
        if(!response.error){
          sessionStorage.setItem("token", response.token);
          this.showModal("Inicio de sesión exitoso", "Autenticación correcta", "success");
        }else{
          this.showModal("Error de autenticación", "El username o contraseña son inválidos", "error");
        }
      });
    }else{
      this.submit = true;
      setTimeout(() => {
        this.submit = false;
      }, 3000);
    }
  }

  showModal(titulo: any, texto: any, estado: any) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: estado
    }).then((result) => {
      if(estado == "success"){
        this.router.navigate(['/home/proveedores']);
      }
    })
  }
}
