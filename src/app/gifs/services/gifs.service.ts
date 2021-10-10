import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey : string = 'w30G0MYYuUM23LlJ0pmrLRWvnpfllw1t';
  urlEndPoint = 'https://api.giphy.com/v1/gifs'
  //guardar historial de búsqueda
  private _historial:string[] = [];
  public resultadosolicitudApi : Gif[] = [];

  get historial(){
    return [...this._historial];
  }
  
  constructor(private http : HttpClient){

    //seguir mostrando local storage en sidebar: solo nombres de búsqueda
    if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!); 
    }

    //seguir mostrando último resultado de búsqueda
    if(localStorage.getItem('resultado')){
      this.resultadosolicitudApi = JSON.parse(localStorage.getItem('resultado')!);
    }
  }

  //insertar valor de búsqueda
  buscarGifs(query : string =''){ // = '' siempre tenga un valor
    query=query.trim().toLocaleLowerCase();

    //insertar query solo si no exite
    if(!this._historial.includes(query)){
      this._historial.unshift( query );
      //cortar el array cuando sea igual a 10 letras
      this._historial = this._historial.splice(0,10);


      //almacenandolo en local storage
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }

    /*
    //consumiendo una API de forma nativa (fetch)
    fetch('https://api.giphy.com/v1/gifs/search?api_key=w30G0MYYuUM23LlJ0pmrLRWvnpfllw1t&q=dragon ball z&limit=10')
    .then(respond => {
      respond.json().then(data =>{
        console.log(data);
      })
    }) */

    //usando params para manejat más ordenado el endpoint
    const params  = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit','10')
    .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.urlEndPoint}/search/${params}`)
    .subscribe((resp)=> {
      console.log(resp.data);
      this.resultadosolicitudApi = resp.data;
      //almacenando resultados de última búsqueda en local storage
      localStorage.setItem('resultado',JSON.stringify(this.resultadosolicitudApi));
    })
    console.log(this._historial);
  }
}
