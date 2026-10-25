import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Contato } from './contato';
import { ContatoApi } from '../../services/contato-api';
import { PlanoSelecionado } from '../../services/plano-selecionado';

describe('Contato', () => {
  let fixture: ComponentFixture<Contato>;
  let el: HTMLElement;
  const api = { enviar: vi.fn(() => of({})) };

  beforeEach(async () => {
    api.enviar.mockClear();
    await TestBed.configureTestingModule({
      imports: [Contato],
      providers: [{ provide: ContatoApi, useValue: api }],
    }).compileComponents();

    fixture = TestBed.createComponent(Contato);
    el = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  function preencher(id: string, valor: string) {
    const campo = el.querySelector<HTMLInputElement>(`#${id}`)!;
    campo.value = valor;
    campo.dispatchEvent(new Event('input'));
  }

  it('não envia e mostra erros quando o formulário está vazio', async () => {
    el.querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    expect(api.enviar).not.toHaveBeenCalled();
    expect(el.querySelectorAll('small').length).toBe(3);
  });

  it('envia quando o formulário está válido', async () => {
    preencher('nome', 'Ana');
    preencher('email', 'ana@exemplo.com');
    preencher('mensagem', 'Oi!');
    el.querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();
    expect(api.enviar).toHaveBeenCalledWith({
      nome: 'Ana',
      email: 'ana@exemplo.com',
      mensagem: 'Oi!',
    });
    expect(el.querySelector('.sucesso')).toBeTruthy();
  });

  it('preenche a mensagem quando um plano é escolhido', async () => {
    TestBed.inject(PlanoSelecionado).selecionar('Clube');
    await fixture.whenStable();
    const mensagem = el.querySelector<HTMLTextAreaElement>('#mensagem')!;
    expect(mensagem.value).toContain('plano Clube');
  });
});
