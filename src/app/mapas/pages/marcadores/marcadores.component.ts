import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

interface marcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit {

  constructor() { }

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-70.60729805966281, -33.4531053001536] // Latitud y longitud 
  marcadores: marcadorColor[] = [] //Arreglo de Marcadores
  


  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
    container: this.divMapa.nativeElement, // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: this.center, // starting position [lng, lat]
    zoom: this.zoomLevel, // starting zoom
    // projection: 'globe' // display the map as a 3D globe
    });

    this.leerLocalStorage();

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola!'

    // new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);

  } 

  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16)); //Para obtener un color aleatorio
  // console.log(color);
    
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
    .setLngLat(this.center)
    .addTo(this.mapa);

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend', () => {
      // console.log('drag');
      this.guardarMarcadoresLocalStorage();
      
    })
  }

  irMarcador(marker: mapboxgl.Marker ){
    this.mapa.flyTo({
      center: marker.getLngLat()
    })
  }

  guardarMarcadoresLocalStorage(){

    const lngLatArr: marcadorColor[] = [];

    this.marcadores.forEach( m => {
      const color = m.color;
      const {lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color: color,
        centro: [lng, lat]
      });
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }


  leerLocalStorage(){
    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: marcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);
  console.log(lngLatArr);
   lngLatArr.forEach( m => {
    const newMarker = new mapboxgl.Marker({
      color: m.color,
      draggable: true
    })
    .setLngLat(m.centro!)
    .addTo(this.mapa);

    this.marcadores.push({
      marker: newMarker, 
      color: m.color
    });

    newMarker.on('dragend', () => {
      // console.log('drag');
      this.guardarMarcadoresLocalStorage();
      
    })
   })
  }


  borrarMarcador(i: number){
    // console.log('Borrando marcador');
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1);
    this.guardarMarcadoresLocalStorage();
  }
}