import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// declare var mapboxgl: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: number;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

  openDialog() {
    let dialogRef = this.dialog.open(MapComponent, {data: {name: 'Zur Vielfalt 21, 44147 Dortmund'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string}) {}

  ngOnInit(): void {
    // mapboxgl.accessToken = 'pk.eyJ1IjoiYmVybmFyZGdlcmF1ZCIsImEiOiJjbGpqcnVyeTAwZWNvM3FwajJjZ24wYXZoIn0.BgISZBfSkTbDp9veEmCb9A';
    // const map = new mapboxgl.Map({
    //   container: 'map', // container ID
    //   style: 'mapbox://styles/mapbox/streets-v12', // style URL
    //   center: [7.435973907030457, 51.51163727815693], // starting position [lng, lat]
    //   zoom: 17 // starting zoom 51.51203125122729, 7.436177768518164
    // });
    // if (map) console.log(map);
  }
}
