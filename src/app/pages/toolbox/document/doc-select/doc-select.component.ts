import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-doc-select',
  templateUrl: './doc-select.component.html',
  styleUrls: ['./doc-select.component.css']
})
export class DocSelectComponent {

  @ViewChild('myDiv') public myDiv!: ElementRef;
  @ViewChild('modal') public modal!: ElementRef;
  @ViewChild('value') public value!: ElementRef;
  uploadSub: any;
  texteToPlay: any;

  constructor(private router: Router,
    private additionalMethods: AdditionalMethodsService,
    private request: RequestService) {}

  displayImageContent() {
    this.router.navigate(['/toolbox/image/img-content']);
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
      this.upload_file(file);
    }
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
    //  this.postImage(file)
    }
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
