import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  codigo:string=""
  data:any
  enabled:boolean=false
  sumnota:number=0;
  sumcredito:number=0;
  promedio:number=0;
  mensaje:any
  isError:boolean=false
  isLoad:boolean=false
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
  }


  obtenerDatos(){
    this.promedio=0;
    this.sumnota=0
    this.sumcredito=0
    this.isError=false
    this.isLoad=true
    this.api().subscribe(x=>{

        this.data=x
        if(this.data.curso.length===0){
          this.promedio=0
          this.mensaje="El alumno no ha sido matriculado en ningun curso"
        this.isError=true
        this.enabled=true
        this.isLoad=false
        }else{
        this.enabled=true
        this.data.curso.forEach((e:any) => {
          this.sumnota= e.nota*e.credito
          this.sumcredito=e.credito
        });
        this.promedio=this.sumnota/this.sumcredito
        this.isLoad=false
      }
      
    
    })
  }

  api(){
    return this.http.get<any>('https://practicaintegracion.herokuapp.com/pc/listar_alumnos?codalu='+this.codigo).pipe(
      catchError((e:any)=>{
        this.mensaje="El código no existe"
        this.isError=true
        this.isLoad=false
        this.enabled=false
        return throwError(e);
      })
    );
  }

}
