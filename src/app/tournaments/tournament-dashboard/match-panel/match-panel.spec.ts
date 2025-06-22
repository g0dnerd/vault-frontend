import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchPanel } from './match-panel';

describe('MatchPanel', () => {
  let component: MatchPanel;
  let fixture: ComponentFixture<MatchPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
