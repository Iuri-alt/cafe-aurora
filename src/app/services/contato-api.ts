import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MensagemContato } from '../models/mensagem-contato';

@Injectable({ providedIn: 'root' })
export class ContatoApi {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://formspree.io/f/mnqvydqk';

  enviar(dados: MensagemContato) {
    return this.http.post(this.url, dados);
  }
}
