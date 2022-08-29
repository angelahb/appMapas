import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.css']
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    const map = new mapboxgl.Map({
    container: 'mapa', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-70.60729805966281, -33.4531053001536], // starting position [lng, lat]
    zoom: 16, // starting zoom
    // projection: 'globe' // display the map as a 3D globe
    });

    // map.on('style.load', () => {
    // map.setFog({}); // Set the default atmosphere style
    // });

  }

}
