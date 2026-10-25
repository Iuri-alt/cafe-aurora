import { Component } from '@angular/core';
import { Diferencial } from '../../models/diferencial';

@Component({
  selector: 'app-diferenciais',
  styleUrl: './diferenciais.css',
  templateUrl: './diferenciais.html',
})
export class Diferenciais {
  protected readonly diferenciais: Diferencial[] = [
    {
      icone: '🌱',
      titulo: 'Grãos selecionados',
      texto: 'Selecionamos os melhores grãos para garantir a qualidade do seu café.',
    },
    {
      icone: '🔥',
      titulo: 'Torrado na hora',
      texto: 'Seu café é torrado semanalmente, garantindo frescor e sabor incomparáveis.',
    },
    {
      icone: '🤝',
      titulo: 'Sem fidelidade',
      texto: 'Assine quando quiser e cancele quando quiser, sem compromissos.',
    },
  ];
}
