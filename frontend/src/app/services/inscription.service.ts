import { Injectable } from '@angular/core';
import { HttpRequestsConfigService } from './http-requests-config.service';
import { Inscription } from '../models/inscription.model';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private httpRequestConfig: HttpRequestsConfigService) { }

  createInscription(inscription: Inscription) {
    return this.httpRequestConfig.post<Inscription>('/inscription/add', inscription);
  }
}
