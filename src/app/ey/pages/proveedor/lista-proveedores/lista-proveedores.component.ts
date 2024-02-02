import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Proveedor} from "../../../../data/interfaces/proveedor.interface";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {EntityService} from "../../../../data/services/entity.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /***  Definimos la lista de proveedores*/
  public proveedores:Proveedor[] = [];
  public dataSource: MatTableDataSource<Proveedor>;
  public displayedColumns: string[] = ['razonsocial', 'nombrecomercial', 'idtributaria', 'telefono', 'correo',
    'web', 'direccion', 'pais', 'facturacion', 'fechaedicion','action'];

  /***  Inicializamos la tabla*/
  constructor(private router: Router, private entidadService: EntityService) {
    this.dataSource = new MatTableDataSource(this.proveedores);
  }

  /***  Inicializo la lista de proveedores*/
  ngOnInit(): void {
    this.entidadService.listaProveedores().subscribe(
        (proveedores) => {
          if (proveedores !== null) {
            this.proveedores = proveedores;
          }else{
            this.proveedores = [];
          }
          this.dataSource.data = this.proveedores;
        },
        (error) => {
          this.proveedores = [];
          this.dataSource.data = this.proveedores;
        }

    );
  }

  /***  Inicializamos la paginacion y el filtro de ordenamiento*/
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    this.paginator._intl.getRangeLabel =  this.getRangeDisplayText;
    this.paginator._intl.itemsPerPageLabel="Proveedores por página";
  }

  /***  Metodo para modificar el texto de la tabla*/
  getRangeDisplayText = (page: number, pageSize: number, length: number) => {
    const initialText = `Mostrando proveedores`;
    if (length == 0 || pageSize == 0) {
      return `${initialText} 0 of ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${initialText} ${startIndex + 1} hasta ${endIndex} de ${length}`;
  };

  /***  Metodo para screening*/
  onScreeningOperacion(nombre: string):void {
    let selectedFuente = "";
    const inputOptions = {
      '1': 'Offshore Leaks Database',
      '2': 'The World Bank',
      '3': 'OFAC'
    };
    Swal.fire({
      title: "Seleccione una fuente para hacer screening",
      input: 'select',
      confirmButtonColor: '#14308b',
      cancelButtonColor: '#ff3131',
      confirmButtonText: 'Escoger',
      cancelButtonText: 'Cancelar',
      inputOptions:inputOptions,
      inputPlaceholder: 'Escoja una fuente',
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === '') {
            resolve('Debes seleccionar una fuente')
          }
          selectedFuente = value;
          resolve()
        })
      }
    }).then((result) => {
      if(selectedFuente != null){
        const url = `/EY/home/proveedores/screening/${nombre}/${selectedFuente}`;
        const windowFeatures = 'width=800,height=600,left=100,top=100,menubar=no,toolbar=no,location=no,status=no';
        window.open(url, '_blank', windowFeatures);
      }
    })
  }

  /***  Metodo para eliminar un proveedorw*/
  onDeleteOperacion(id: string):void {
    Swal.fire({
      title: "Está seguro de eliminar el proveedor?",
      confirmButtonColor: '#ff3131',
      cancelButtonColor: '#14308b',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
    }).then((result) => {
      if(result.isConfirmed){
        this.entidadService.eliminarProveedor(id).subscribe(
            (result) => {
              this.router.navigate(['/EY/home/proveedores'])
            },
            (error) =>{}
        );
      }
    })
  }

}
