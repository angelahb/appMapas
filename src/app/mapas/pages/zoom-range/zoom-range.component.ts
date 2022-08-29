import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-70.60729805966281, -33.4531053001536] // Latitud y longitud 

  constructor() { }

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

    ngAfterViewInit(): void {
      this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: this.center, // starting position [lng, lat]
      zoom: this.zoomLevel, // starting zoom
      // projection: 'globe' // display the map as a 3D globe
      });
  
      this.mapa.on('zoom', (event) => {
        this.zoomLevel = this.mapa.getZoom();
      })

      this.mapa.on('zoomend', (event) => {
        if (this.mapa.getZoom() > 18) {
          this.mapa.zoomTo(18)
        }        
      })
      
      this.mapa.on('move', (event) => {
        // console.log(event);
        const target = event.target;
        const  {lng, lat} = target.getCenter();
        this.center = [lng, lat];
      })
  }



  zoomOut(){
    // console.log('zoom out');
    this.mapa.zoomOut(); 
  }

  zoomIn(){
    // console.log('zoom In');
    this.mapa.zoomIn(); 
  }

  zoomCambio(valor: string){
    console.log(valor);
    this.mapa.zoomTo(Number(valor));
  }

}
