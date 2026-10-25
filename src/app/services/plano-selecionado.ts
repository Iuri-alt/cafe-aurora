import { Injectable, signal } from '@angular/core';

/** Guarda o plano que a pessoa escolheu, para outros componentes (ex.: Contato) usarem. */
@Injectable({ providedIn: 'root' })
export class PlanoSelecionado {
  private readonly _nome = signal<string | null>(null);
  readonly nome = this._nome.asReadonly();

  selecionar(nome: string) {
    this._nome.set(nome);
  }
}
