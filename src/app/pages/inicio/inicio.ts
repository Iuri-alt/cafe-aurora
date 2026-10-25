import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Diferenciais } from '../../components/diferenciais/diferenciais';
import { Planos } from '../../components/planos/planos';
import { Contato } from '../../components/contato/contato';

@Component({
  imports: [Hero, Diferenciais, Planos, Contato],
  selector: 'app-inicio',
  styleUrl: './inicio.css',
  templateUrl: './inicio.html',
})
export class Inicio {}
