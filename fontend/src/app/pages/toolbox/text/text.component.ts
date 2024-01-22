import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent {

  @Input() numberOfInputCharacter: number = 0;

  countInputCharacter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.numberOfInputCharacter = inputValue.length;
  }

}
