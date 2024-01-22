import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { RequestService } from 'src/app/services/request.service';
import { SpeechtotextService } from 'src/app/services/speechtotext.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';

@Component({
  selector: 'app-img-content',
  templateUrl: './img-content.component.html',
  styleUrls: ['./img-content.component.css']
})
export class ImgContentComponent implements OnInit {

  uploadSub: any;
  @ViewChild('modal') public modal!: ElementRef;
  texteToPlay: any;
  @ViewChild('value') public value!: ElementRef;
  textFound= '';
  imageFile: File;

  @Input() numberOfInputCharacter: number = 0;

  constructor(private request: RequestService,
              private textToSpeech: TextToSpeechService,
              public speech: SpeechtotextService,
              private additionalMethods: AdditionalMethodsService) {}

  ngOnInit(): void {
    this.imageFile = this.additionalMethods.imageFile;
    this.postImage(this.imageFile);
  }

  countInputCharacter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.numberOfInputCharacter = inputValue.length;
  }

  postImage(file: any){
    const formData = new FormData();
    formData.append("image", file);
    formData.append("author_id", '4');
    
    const upload$ = this.request.posData('image',formData)
  
   this.uploadSub= upload$.subscribe(async(data: any) =>{
      // this.textFound= data.text
       console.log(data);
       let res: any= await this.textToSpeech.getTextFromImage(data.image);
       console.log(res);
       this.speech.text= res;
       this.postText('de', res);
      
    }, err =>{
      console.log(err);
      
    });
  }

  postText(lng="fr", text= this.textFound){
    let url= 'http://localhost:8000/api/texte/';
  
    let data = {
      author_id: '4',
      content: text,
      lng: lng
    }
   console.log(data);
   
    this.request.posData('texte', data).subscribe((res: any) =>{
      console.log(res);
      
      this.textFound= res.text
      
    }, err =>{
      console.log(err);
      
    })
  
  }

}
