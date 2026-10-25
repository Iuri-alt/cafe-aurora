import { Component, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { PlanoCard } from '../plano-card/plano-card';
import { Plano } from '../../models/plano';
import { PlanoSelecionado } from '../../services/plano-selecionado';

@Component({
  imports: [PlanoCard],
  selector: 'app-planos',
  styleUrl: './planos.css',
  templateUrl: './planos.html',
})
export class Planos {
  private readonly planoSelecionado = inject(PlanoSelecionado);
  private readonly scroller = inject(ViewportScroller);

  protected readonly planos: Plano[] = [
    { nome: 'Degustação', preco: 39.9, itens: ['250 g por mês', '1 origem'] },
    {
      nome: 'Clube',
      preco: 69.9,
      itens: ['500 g por mês', '2 origens', 'Frete grátis'],
      destaque: true,
    },
    {
      nome: 'Barista',
      preco: 119.9,
      itens: ['1 kg por mês', '3 origens', 'Frete grátis', 'Guia de preparo'],
    },
  ];

  protected aoEscolher(nome: string) {
    this.planoSelecionado.selecionar(nome);
    this.scroller.scrollToAnchor('contato');
  }
}
