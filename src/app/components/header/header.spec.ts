import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Header (menu)', () => {
  it('abre e fecha o menu ao clicar no botão', async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(Header);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const botao = el.querySelector<HTMLButtonElement>('.botao-menu')!;

    expect(botao.getAttribute('aria-expanded')).toBe('false');
    botao.click();
    await fixture.whenStable();
    expect(botao.getAttribute('aria-expanded')).toBe('true');
    expect(el.querySelector('.menu')!.classList).toContain('aberto');
  });
});
