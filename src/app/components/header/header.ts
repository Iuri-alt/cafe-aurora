import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkMenu } from '../../models/link-menu';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.css',
  templateUrl: './header.html',
})
export class Header {
  protected readonly menuAberto = signal(false);

  protected readonly links: LinkMenu[] = [
    { rotulo: 'Diferenciais', ancora: 'diferenciais' },
    { rotulo: 'Planos', ancora: 'planos' },
    { rotulo: 'Contato', ancora: 'contato' },
  ];

  protected alternarMenu() {
    this.menuAberto.update((aberto) => !aberto);
  }

  protected fecharMenu() {
    this.menuAberto.set(false);
  }
}
