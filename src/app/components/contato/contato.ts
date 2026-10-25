import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ContatoApi } from '../../services/contato-api';
import { PlanoSelecionado } from '../../services/plano-selecionado';

type CampoContato = 'nome' | 'email' | 'mensagem';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-contato',
  styleUrl: './contato.css',
  templateUrl: './contato.html',
})
export class Contato {
  private readonly fb = inject(FormBuilder);
  private readonly api = inject(ContatoApi);
  private readonly planoSelecionado = inject(PlanoSelecionado);

  protected readonly enviando = signal(false);
  protected readonly enviado = signal(false);
  protected readonly erro = signal(false);

  protected readonly form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mensagem: ['', Validators.required],
  });

  constructor() {
    // Quando alguém clica "Quero este" num plano, já escrevemos a mensagem.
    effect(() => {
      const plano = this.planoSelecionado.nome();
      if (plano) {
        this.form.controls.mensagem.setValue(`Olá! Tenho interesse no plano ${plano}.`);
        this.enviado.set(false);
      }
    });
  }

  /** True quando o campo tem erro e a pessoa já mexeu nele (ou tentou enviar). */
  protected invalido(campo: CampoContato) {
    const controle = this.form.controls[campo];
    return controle.invalid && controle.touched;
  }

  protected enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando.set(true);
    this.enviado.set(false);
    this.erro.set(false);

    this.api
      .enviar(this.form.getRawValue())
      .pipe(finalize(() => this.enviando.set(false)))
      .subscribe({
        next: () => {
          this.enviado.set(true);
          this.form.reset();
        },
        error: () => this.erro.set(true),
      });
  }
}
