import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {
  //directiva para buscar elementos del input y limpiarlo
  @ViewChild('txtBuscar') txtBuscar! : ElementRef<HTMLInputElement>;

  // usando servicio de buscar gift
  constructor(private gifsService: GifsService ) { }

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    // no permitir espacios en blanco en el arreglo
    if(valor.trim().length === 0) {
      return ; //es como decir que no haga nada
    }
    //insertando historial de búsqueda
    this.gifsService.buscarGifs(valor);

    
    this.txtBuscar.nativeElement.value = '';
  }
  
  ngOnInit(): void {
  }

}
