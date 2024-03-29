import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {EntityService} from "../../../../data/services/entity.service";
import Swal from "sweetalert2";
import {Proveedor} from "../../../../data/interfaces/proveedor.interface";

@Component({
  selector: 'app-new-proveedor',
  templateUrl: './new-proveedor.component.html',
  styleUrls: ['./new-proveedor.component.css']
})
export class NewProveedorComponent implements OnInit {
  /***  Definimos el distintivo entre agregar y editar*/
  public id:string = "";
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
  private proveedorOriginal: Proveedor | null = null;


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

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private entityService: EntityService) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((segments) => {
      const id = segments[segments.length - 1].path;
      this.id = id;
    });

    this.entityService.infoProveedor(this.id).subscribe((proveedor) => {
      if (proveedor != null) {
        this.proveedorOriginal = {...proveedor};
        const paisSeleccionado = this.paises.find(p => p.nombre === proveedor.pais);
        const valorPais = paisSeleccionado ? paisSeleccionado.valor : null;

        this.proveedorForm.patchValue({
          razonsocial:  proveedor.razonSocial,
          nombrecomercial: proveedor.nombreComercial,
          idtributaria: String(proveedor.idTributaria),
          telefono: String(proveedor.telefono),
          correo: proveedor.correo,
          web: proveedor.web,
          direccion: proveedor.direccion,
          pais: valorPais,
          facturacion:  String(proveedor.facturacion),
        });
      }
    });
  }

  /***  Metodo para guardar y actualizar un proveedor*/
  onSubmit():void {
    if(!this.proveedorForm.invalid){
      const {razonsocial, nombrecomercial, idtributaria,
        telefono, correo, web, direccion,
        pais, facturacion} = this.proveedorForm.value;
      let paisSeleccionado = this.paises.find(p => p.valor === pais);

      if(this.proveedorOriginal?.razonSocial == String(razonsocial) && this.proveedorOriginal?.nombreComercial == String(nombrecomercial)
      && this.proveedorOriginal?.idTributaria == Number(idtributaria) && this.proveedorOriginal?.telefono == Number(telefono)
      && this.proveedorOriginal?.correo == String(correo) && this.proveedorOriginal?.web == String(web)
      && this.proveedorOriginal?.direccion == String(direccion) && this.proveedorOriginal?.pais == paisSeleccionado.nombre
      && this.proveedorOriginal?.facturacion == Number(facturacion)){
        this.showModal("Ningún parámetro ha sido cambiado", "No hubo modificaciones", "info");
      }else{
        this.entityService.actualizarProveedor(this.id, String(razonsocial), String(nombrecomercial),String(idtributaria),String(telefono),
            String(correo),String(web), String(direccion), paisSeleccionado.nombre, Number(facturacion)).subscribe(response => {
          if (!response.error) {
            this.showModal(response.msg, "Proveedor editado correctamente", "success");
          }else {
            this.showModal(response.msg, "Error al editar el proveedor", "error");
          }
        });
      }
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
