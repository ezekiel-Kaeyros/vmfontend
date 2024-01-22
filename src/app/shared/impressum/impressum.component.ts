import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from '../footer/footer.component';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  styleUrls: ['./impressum.component.css']
})
export class ImpressumComponent {

  constructor(private dialog: MatDialog) { }

  openDialog() {
    let dialogRef = this.dialog.open(MapComponent, {data: {name: 'Zur Vielfalt 21, 44147 Dortmund'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
