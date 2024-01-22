import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';

@Component({
  selector: 'app-img-select',
  templateUrl: './img-select.component.html',
  styleUrls: ['./img-select.component.css']
})
export class ImgSelectComponent {

  constructor(private router: Router,
              private additionalMethods: AdditionalMethodsService) {}

  displayImageContent() {
    this.router.navigate(['/toolbox/image/img-content']);
  }

  onFileSelected(event: any) {
    const file:File = event.target.files[0];
    if (file) {
        this.upload_file(file)
        
    }
  }

  upload_file(file: any) {
    let type= file.name.split('.')[1];
    console.log(type);
    
    if (type == 'pdf') {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("lng", 'fr');
      formData.append("ext_name", type);
      formData.append("content", 'contenu ici');
      formData.append("author_id", '4');
      
      /*
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
      }); */
        
    }else{
      this.additionalMethods.getImageFile(file);
      this.router.navigate(['/toolbox/image/img-content']);
    //  this.postImage(file)
    }
  }

}
