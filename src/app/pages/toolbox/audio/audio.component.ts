import { Component, OnInit, ViewChild } from '@angular/core';
import {fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';
import { SpeechtotextService } from 'src/app/services/speechtotext.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  @ViewChild('input') input: any;

  public voices: Array<any> = [];
  textFound= '';
  texteToPlay: any;
  lang= 'de';
  langSelect: any;
  data: any;

  constructor(private textToSpeech: TextToSpeechService,
              public speech: SpeechtotextService,
              private request: RequestService) {

  }

  ngOnInit(): void {
    this.init();
    this.textToSpeech.loadWorker();
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement,'keyup')
      .pipe(
          filter(Boolean),
          debounceTime(2000),
          distinctUntilChanged(),
          tap((text) => {
            console.log(this.input.nativeElement.value)
            let texte= this.input.nativeElement.value
            let lng= this.lang
            if (this.langSelect) {
              lng= this.langSelect.split('-')[0]
            }
            if (texte.length) {
              console.log(lng);
              this.data= {content: texte, author_id: '4', lng: lng}
              this.request.posData('texte',this.data).subscribe((res: any) =>{
                console.log(res);
                let node = document.getElementById('translate')
                if (node) {
                  node.innerText= res.text
                  this.texteToPlay= res.text
                }
              
                
              })
            }
          
          })
      )
      .subscribe();
  }

  public init(): void {
    this.speech.init()
    this.textToSpeech.init();
    this.textToSpeech.generateVoices().then((arr) =>{
      this.voices = arr
    });
    if (this.voices.length == 0) {
    }
  }

  public play(): void {
    // this.textContent= this.textFound
    if (this.textFound) {
      this.texteToPlay = this.textFound;
    }
    if (!this.langSelect) {
      this.langSelect= 'Google Deutsch'
    }
    if (this.texteToPlay && this.langSelect) {
      let selectedVoice = this.langSelect;
      const rate = 1; //Number(this.rate.value);
      const pitch = 1; //Number(this.pitch.value);
      const volume = 1; //Number(this.volume.value);
      console.log(selectedVoice);
     
      this.textToSpeech
        .speak(
          this.texteToPlay,
          selectedVoice,
          pitch,
          rate,
          volume);
  
    }else if( this.texteToPlay){
      if (!this.langSelect) {
        this.langSelect= 'Google Deutsch'
      }
      let selectedVoice = this.lang;
      const rate = 1; //Number(this.rate.value);
      const pitch = 1; //Number(this.pitch.value);
      const volume = 1; //Number(this.volume.value);
      console.log(selectedVoice);
     
      this.textToSpeech
        .speak(
          this.texteToPlay,
          selectedVoice,
          pitch,
          rate,
          volume);
  
    }
  }

  startService(){
    this.speech.start()
  }
  
  stopService(){
    this.speech.stop()
  }
  load_tanslate(){
     this.postText('de', this.speech.text);
  }

  postText(lng="fr", text= this.textFound){
    let url= 'http://localhost:8000/api/texte'
  
    let data= {
      author_id: '4',
      content: text,
      lng: lng
    }
   console.log(data);
   
    this.request.posData('texte', data).subscribe((res: any) =>{
      console.log(res);
      
      this.textFound= res.text;
      console.log(this.textFound);
      
    }, err =>{
      console.log(err);
      
    })
  
  }

}
