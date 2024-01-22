import { Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import {fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators'
// import { createWorker } from 'tesseract.js';
import { RequestService } from 'src/app/services/request.service';
import { SpeechtotextService } from 'src/app/services/speechtotext.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent implements OnInit {
  /**
   * @public
   * @property textContent
   * @type IonTextArea
   * @memberOf HomePage
   */
@ViewChild('textContent') public textContent!: any;
@ViewChild('pitch') public pitch!: any;
@ViewChild('rate') public rate!: any;
@ViewChild('volume') public volume!: any;
@ViewChild('myDiv') public myDiv!: ElementRef;
@ViewChild('modal') public modal!: ElementRef;
@ViewChild('value') public value!: ElementRef;


public voices: Array<any> = [];
public selectedVoice!: string;
uploadSub: any
worker: any
workerReady= false
textFound= ''
fileName = '';
langSelect: any
texteToPlay: any;
image= 'https://tesseract.projectnaptha.com/img/eng_bw.png'
  lang= 'de'
  texte: any= ''
  @ViewChild('input') input: any;
  data: any
  objRandom= {}

  constructor(private textToSpeech: TextToSpeechService, private request: RequestService, public speech: SpeechtotextService) { }

  ngOnInit(): void {
    this.init()
    this.textToSpeech.loadWorker()
   
   
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

  ngAfterViewInit() {
    // server-side search
    // setTimeout(() => {
    //   this.bar(45)
    // }, 8000);
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

  selectLanguage(ev: any){
   console.log(ev.target.value);
  this.langSelect= ev.target.value
  let lang= this.langSelect.split('-')[0]
  // let found= this.voices.filter((v) => v.)
  this.translateWithLangSelect(lang)
  }
 
translateWithLangSelect(lang: any){
 
  
  if (this.data) {
    this.data['lng']= 'de'
    console.log(lang);
    
    console.log(this.data);
    this.request.posData('texte',this.data).subscribe((res: any) =>{
      let node = document.getElementById('translate')
      if (node) {
        node.innerText= res.text
      }
      
    })
  }
  
}

public play(): void {
  // this.textContent= this.textFound
  if (this.textFound) {
    this.texteToPlay = this.textFound
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

onFileSelected(event: any) {
  const file:File = event.target.files[0];
  if (file) {
      this.upload_file(file)
      
  }
}

readFile(file: any) {
  const reader = new FileReader();
  reader.addEventListener('load', (event: any) => {
    const url = event.target.result;
    console.log(url);
    this.image= url
    // this.getTexte(url)
    // Do something with result
  });
  reader.readAsDataURL(file);
}


upload_file(file: any) {
  let type= file.name.split('.')[1]
  console.log(type);
  
  if (type == 'pdf') {
    this.bar(1)
    setTimeout(() => {
      this.bar(20)
    }, 1500);
    setTimeout(() => {
      this.bar(40)
    }, 3500);
    setTimeout(() => {
      this.bar(60)
    }, 6500);
    setTimeout(() => {
      this.bar(80)
    }, 9000);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("lng", 'fr');
      formData.append("ext_name", type);
      formData.append("content", 'contenu ici');
      formData.append("author_id", '4');
      
      const upload$ = this.request.posData('file',formData)

     this.uploadSub= upload$.subscribe((data: any) =>{
        // this.textFound= data.text
         console.log(data);
         this.bar(100)
        setTimeout(() => {
          this.modal.nativeElement.style.display= 'none'
        }, 2000);
         this.request.download(data.text)
         
        if (data.texte) {
          // this.data= {content: texte, author_id: '4', lng: lng}
          let node = document.getElementById('translate')
          if (node) {
            node.innerText= data.texte
            this.texteToPlay= data.texte
          }

        }
        
      }, err =>{
        console.log(err);
        this.modal.nativeElement.style.display= 'none'
      });
      
  }else{
   this.postImage(file)
  }
}
startService(){
  this.speech.start()
}

stopService(){
  this.speech.stop()
}
load_tanslate(){
   this.postText('de', this.speech.text)
}

postText(lng="fr", text= this.textFound){
  let url= 'http://localhost:8000/api/texte/'

  let data= {
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

scanImage(file: any) {
  const reader = new FileReader();
  reader.addEventListener('load', (event: any) => {
    const url = event.target.result;
    console.log(url);
    this.image= url
    // this.getTexte(url)
    // Do something with result
  });
  reader.readAsDataURL(file);
}

async getTexte(url: any){
 let text= await this.textToSpeech.getTextFromImage(url)
  console.log(text)
  
}

postImage(file: any){
  const formData = new FormData();
  formData.append("image", file);
  formData.append("author_id", '4');
  
  const upload$ = this.request.posData('image',formData)

 this.uploadSub= upload$.subscribe(async(data: any) =>{
    // this.textFound= data.text
     console.log(data);
     let res: any= await this.textToSpeech.getTextFromImage(data.image)
     console.log(res);
     this.speech.text= res
     this.postText('de', res)
     
    //  this.request.download(data.text)
     
    // if (data.texte) {
    //   // this.data= {content: texte, author_id: '4', lng: lng}
    //   let node = document.getElementById('translate')
    //   if (node) {
    //     node.innerText= data.texte
    //     this.texteToPlay= data.texte
    //   }
    // }
    
  }, err =>{
    console.log(err);
    
  });
}

bar (index= 1, action = "Loading ...") {
  // var progressCircular = document.getElementById(".progress-circular-c");
  // console.log(progressCircular);
  console.log(this.myDiv);
  this.modal.nativeElement.style.display= 'block'
  
  if (this.value) {
    this.value.nativeElement.textContent = `${index}%`;
  }
 

  if (index > 0) {
    // pbm!.style.display = "block";
    // div_val!.style.display = "flex";
    this.myDiv!.nativeElement.style.background = `conic-gradient(#ff8f0c ${
      index * 3.6
    }deg, #ededed 0deg)`;
    // progressTitle!.innerHTML = action;
  } else {
    this.myDiv!.nativeElement.style.background = `conic-gradient(#ff8f0c ${
      0 * 3.6
    }deg, #ededed 0deg)`;
    // progressTitle!.innerHTML = action;
    // document.getElementById("pbm").style.display = "none";
  }
};

}
