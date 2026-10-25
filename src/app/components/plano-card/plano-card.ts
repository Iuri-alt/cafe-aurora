import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Plano } from '../../models/plano';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-plano-card',
  styleUrl: './plano-card.css',
  templateUrl: './plano-card.html',
})
export class PlanoCard {
  readonly plano = input.required<Plano>();
  readonly escolher = output<string>();
}
