import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { createWorker } from 'tesseract.js';
@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  private apiUrl = environment.apiUrl;
  
 worker: any
 workerReady= false
 
 private synth!: SpeechSynthesis;
 public voices: Array<SpeechSynthesisVoice> = [];
 public selectedVoice!: SpeechSynthesisUtterance;
   /**
   * @constructor
   * @description  Initialise class with necessary properties for subsequent usage
   * @param {Window} window 
   * @memberOf TextToSpeechService
 */
  constructor() { }

  public async init() {

    // Is support enabled?
    if ('speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
     let arr= this.synth.getVoices()
    //  console.log(arr);
     
    } else {
      console.log('Your browser does NOT support the Web Speech API');
      
      // // If not inform the user :)
      // const alert = await this.alert.create({
      //   header: 'Sorry!',
      //   message: 'Your browser does NOT support the Web Speech API',
      //   buttons: ['Ok']
      // });
      // await alert.present();
    }
  }

  public generateVoices(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
     setTimeout(() => {
      let arr= window.speechSynthesis.getVoices()
      // console.log(arr);
     this.voices = this.synth.getVoices().sort((a: any, b: any) => {
       const aName = a.name.toUpperCase();
       const bName = b.name.toUpperCase();
 
       if (aName < bName) {
         return -1;
       } else if (aName == bName) {
         return 0;
       } else {
         return +1;
       }
     });
 
     resolve(this.voices);
     }, 20000);
    })
  }

  public grabVoice(voice: string): SpeechSynthesisVoice {
    let selectedVoice!: SpeechSynthesisVoice;
    for (let i = 0; i < this.voices.length; i++) {
      if (this.voices[i].name === voice) {
        selectedVoice = this.voices[i];
        break;
      }
    }
    return selectedVoice;
  }
  public speak(selectedText: string,
    selectedVoice: string,
    selectedPitch: number,
    selectedRate: number,
    selectedVolume: number): void {

// Set speech synthesis properties for playback 
this.selectedVoice = new SpeechSynthesisUtterance(selectedText);
this.selectedVoice.voice = this.grabVoice(selectedVoice);
this.selectedVoice.rate = selectedRate;
this.selectedVoice.pitch = selectedPitch;
this.selectedVoice.volume = selectedVolume;

// Event listener for managing selected speech events
this.manageEndOfSpeech();
this.manageErrorWithSpeech();
// Speak out!
this.synth.speak(this.selectedVoice);
}

private manageEndOfSpeech(): void {
  this.selectedVoice.onend = (event: SpeechSynthesisEvent) => {
    console.log('speech has ended', event);
  };
}

private manageErrorWithSpeech(): void {
  this.selectedVoice.onerror = (event: SpeechSynthesisEvent) => {
    console.log('speech encountered an error ended', event);
  };
}

async loadWorker(){
 this.worker= createWorker({
  logger: progress =>{
    // console.log(progress);
  }
})

  await this.worker.load();
  await this.worker.loadLanguage('eng');
  await this.worker.initialize('eng');
  this.workerReady= true
  const { data: { text } } = await this.worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
  // console.log(text);
  // this.textFound= text
  await this.worker.terminate();
  
}

 getTextFromImage(url_image: string){
  let download_url= `${this.apiUrl}/`;
  let url= download_url + url_image
  console.log(url);
  
  return new Promise(async (resolve, reject)=>{
    this.worker= createWorker({
      logger: progress =>{
        console.log(progress);
        
      }
    })
    
      await this.worker.load();
      await this.worker.loadLanguage('eng');
      await this.worker.initialize('eng');
      this.workerReady= true
      const { data: { text } } = await this.worker.recognize(url);
      console.log(text);
      // this.textFound= text
      await this.worker.terminate();
    
    resolve(text)
  })
 
}
}
