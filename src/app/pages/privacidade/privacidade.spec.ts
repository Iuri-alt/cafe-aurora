import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Privacidade } from './privacidade';

describe('Privacidade', () => {
  let component: Privacidade;
  let fixture: ComponentFixture<Privacidade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Privacidade],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Privacidade);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
