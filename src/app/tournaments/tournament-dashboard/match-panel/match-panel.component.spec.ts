import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatchPanelComponent } from './match-panel.component';

describe('MatchPanelComponent', () => {
  let component: MatchPanelComponent;
  let fixture: ComponentFixture<MatchPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
