import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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
  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
  }


  obtenerDatos(){
    this.http.get<any>('https://practicaintegracion.herokuapp.com/pc/listar_alumnos?codalu='+this.codigo).subscribe(x=>{
      this.data=x
      this.enabled=true
      this.data.curso.forEach((e:any) => {
        this.sumnota= e.nota*e.credito
        this.sumcredito=e.credito
        
      });
      this.promedio=this.sumnota/this.sumcredito
    });
  }

}
