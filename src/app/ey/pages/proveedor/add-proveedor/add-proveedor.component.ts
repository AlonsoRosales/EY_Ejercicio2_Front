import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EntityService} from "../../../../data/services/entity.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-proveedor',
  templateUrl: './add-proveedor.component.html',
  styleUrls: ['./add-proveedor.component.css']
})
export class AddProveedorComponent implements OnInit {
  /***  Definimos el distintivo entre agregar y editar*/
  public paises: any[] = [
    { nombre: 'Perú', valor: 1 },
    { nombre: 'México', valor: 2 },
    { nombre: 'Colombia', valor: 3 },
    { nombre: 'Argentina', valor: 4 },
    { nombre: 'Chile', valor: 5 },
    { nombre: 'España', valor: 6 },
    { nombre: 'Brasil', valor: 7 },
    { nombre: 'Venezuela', valor: 8 },
    { nombre: 'Ecuador', valor: 9 },
    { nombre: 'Bolivia', valor: 10 },
    { nombre: 'Costa Rica', valor: 11 },
    { nombre: 'Panamá', valor: 12 },
  ];

  urlValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return regex.test(control.value) ? null : { invalidUrl: true };
  };

  numericValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(control.value) ? null : { invalidNumber: true };
  };

  /***  Definimos los campos de los formularios con sus validaciones*/
  public proveedorForm = new FormGroup({
    razonsocial:  new FormControl<string>('',Validators.required),
    nombrecomercial:      new FormControl<string>('',[Validators.required]),
    idtributaria:      new FormControl<string>('',[Validators.required, Validators.minLength(11),Validators.maxLength(11)]),
    telefono:      new FormControl<string>('',[Validators.required, Validators.pattern(/^\d+$/)]),
    correo:      new FormControl<string>('',[Validators.required, Validators.email]),
    web:      new FormControl<string>('',[Validators.required, this.urlValidator]),
    direccion:      new FormControl<string>('',[Validators.required]),
    pais: new FormControl<number>(1, ),
    facturacion:      new FormControl<string>('', [this.numericValidator, Validators.required]),
  });

  constructor(private router: Router, private entityService: EntityService) { }
  ngOnInit(): void {
  }

  /***  Metodo para guardar y actualizar un proveedor*/
  onSubmit():void {
    if(!this.proveedorForm.invalid){
      const {razonsocial, nombrecomercial, idtributaria,
        telefono, correo, web, direccion,
        pais, facturacion} = this.proveedorForm.value;
      let paisSeleccionado = this.paises.find(p => p.valor === pais);
      this.entityService.registroProveedor(String(razonsocial), String(nombrecomercial),String(idtributaria),String(telefono),
          String(correo),String(web), String(direccion), paisSeleccionado.nombre, Number(facturacion)).subscribe(response => {
        if (!response.error) {
          this.showModal(response.msg, "Proveedor agregado correctamente", "success");
        }else {
          this.showModal(response.msg, "Error al agregar el proveedor", "error");
        }
      });
    }
  }

  /***  Metodo para volver a la vista de los proveedores*/
  return(): void{
    this.router.navigate(['/EY/home/proveedores'])
  }

  showModal(titulo: any, texto: any, estado: any) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: estado
    }).then((result) => {
      if(estado == "success"){
        this.router.navigate(['/EY/home/proveedores'])
      }
    })
  }

}
