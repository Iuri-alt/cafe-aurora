import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanoCard } from './plano-card';

describe('PlanoCard', () => {
  let component: PlanoCard;
  let fixture: ComponentFixture<PlanoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanoCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('plano', {
      nome: 'Clube',
      preco: 69.9,
      itens: ['500 g por mês'],
      destaque: true,
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mostra o selo quando o plano é destaque', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.selo')?.textContent).toContain('Mais escolhido');
  });

  it('emite o nome do plano ao clicar no botão', () => {
    let escolhido = '';
    component.escolher.subscribe((nome) => (escolhido = nome));
    (fixture.nativeElement as HTMLElement).querySelector('button')!.click();
    expect(escolhido).toBe('Clube');
  });
});
