import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {TerceraFuente} from "../../../../data/interfaces/tercerafuente";
import {MatTableDataSource} from "@angular/material/table";
import {EntityService} from "../../../../data/services/entity.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PrimeraFuente} from "../../../../data/interfaces/primerafuente";
import {SegundaFuente} from "../../../../data/interfaces/segundafuente";

@Component({
  selector: 'app-screening-proveedor',
  templateUrl: './screening-proveedor.component.html',
  styleUrls: ['./screening-proveedor.component.css']
})
export class ScreeningProveedorComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public hits: number = 0;
  public fuente: number = 0;
  public entidad: string = "";
  public isDataLoaded: boolean = false;

  /***  Definimos la lista de proveedores*/
  public resultadosPrimeraFuente:PrimeraFuente[] = [];
  public dataSourcePrimeraFuente: MatTableDataSource<PrimeraFuente>;
  public displayedColumnsPrimeraFuente: string[] = ['entity', 'jurisdiction', 'linkedto', 'datafrom'];

  public resultadosSegundaFuente:SegundaFuente[] = [];
  public dataSourceSegundaFuente: MatTableDataSource<SegundaFuente>;
  public displayedColumnsSegundaFuente: string[] = ['firmdate', 'address', 'country', 'fromdate', 'todate', 'grounds'];

  public resultadosTerceraFuente:TerceraFuente[] = [];
  public dataSourceTerceraFuente: MatTableDataSource<TerceraFuente>;
  public displayedColumnsTercerFuente: string[] = ['name', 'address', 'type', 'programs', 'list', 'score'];

  /***  Inicializamos la tabla*/
  constructor(private route: ActivatedRoute,private router: Router, private entidadService: EntityService) {
    this.dataSourcePrimeraFuente = new MatTableDataSource(this.resultadosPrimeraFuente);
    this.dataSourceSegundaFuente = new MatTableDataSource(this.resultadosSegundaFuente);
    this.dataSourceTerceraFuente = new MatTableDataSource(this.resultadosTerceraFuente);
  }

  ngOnInit(): void {
    const nombre = this.route.snapshot.paramMap.get('entidad');
    const selectedFuente = this.route.snapshot.paramMap.get('fuente');
    // @ts-ignore
    this.entidad = nombre;

    // @ts-ignore
    this.entidadService.screeningProveeedor(nombre, selectedFuente).subscribe((r) => {
      if (Array.isArray(r.msg)) {
        if(selectedFuente == '1'){
          this.fuente = 1;
          this.resultadosPrimeraFuente = r.msg.map((elemento: any) => {
            return {
              Entity: elemento.Entity,
              Jurisdiction: elemento.Jurisdiction,
              LinkedTo: elemento['Linked To'],
              DataFrom: elemento['Data From']
            };
          });
          this.dataSourcePrimeraFuente.data = this.resultadosPrimeraFuente;
        }else if(selectedFuente == '2'){
          this.fuente = 2;
          this.resultadosSegundaFuente = r.msg.map((elemento: any) => {
            return {
              FirmName: elemento['Firm Name'],
              Address: elemento.Address,
              Country: elemento.Country,
              FromDate: elemento['From Date (Ineligibility Period)'],
              ToDate: elemento['To Date (Ineligibility Period)'],
              Grounds: elemento.Grounds
            };
          });
          this.dataSourceSegundaFuente.data = this.resultadosSegundaFuente;
        }else if(selectedFuente == '3'){
          this.fuente = 3;
          this.resultadosTerceraFuente = r.msg.map((elemento: any) => {
            return {
              Name: elemento.Name,
              Address: elemento.Address,
              Type: elemento.Type,
              Programs: elemento["Program(s)"],
              List: elemento.List,
              Score: parseInt(elemento.Score)
            };
          });
          this.dataSourceTerceraFuente.data = this.resultadosTerceraFuente;
        }
      }else{
        this.dataSourcePrimeraFuente.data = [];
        this.dataSourceSegundaFuente.data = [];
        this.dataSourceTerceraFuente.data = [];
      }

      this.isDataLoaded = true;
      this.hits = r.hitsFuente;
    }, error => {
      this.isDataLoaded = true;
    })

  }

  /***  Inicializamos la paginacion y el filtro de ordenamiento*/
  ngAfterViewInit(): void {
    if (this.paginator && this.sort) {
      this.dataSourcePrimeraFuente.paginator = this.paginator;
      this.dataSourcePrimeraFuente.sort = this.sort;

      this.dataSourceSegundaFuente.paginator = this.paginator;
      this.dataSourceSegundaFuente.sort = this.sort;

      this.dataSourceTerceraFuente.paginator = this.paginator;
      this.dataSourceTerceraFuente.sort = this.sort;

      this.paginator._intl.getRangeLabel = this.getRangeDisplayText;
      this.paginator._intl.itemsPerPageLabel = "Proveedores por página";
    }
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


}
