import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor ( private gifs : GifsService){}
  
  get historial(){
  
    return this.gifs.historial;
    
  }

  //buscar gifs desde el historial de búsqueda
  buscar(termino : string){
    return this.gifs.buscarGifs(termino);
  }

  ngOnInit(): void {
  }

}
