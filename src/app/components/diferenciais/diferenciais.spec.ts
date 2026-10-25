import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Diferenciais } from './diferenciais';

describe('Diferenciais', () => {
  let component: Diferenciais;
  let fixture: ComponentFixture<Diferenciais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Diferenciais],
    }).compileComponents();

    fixture = TestBed.createComponent(Diferenciais);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
