import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DraftPanelComponent } from './draft-panel.component';

describe('DraftPanelComponent', () => {
  let component: DraftPanelComponent;
  let fixture: ComponentFixture<DraftPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
