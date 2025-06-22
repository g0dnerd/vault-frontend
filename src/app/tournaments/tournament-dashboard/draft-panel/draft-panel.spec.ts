import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DraftPanel } from './draft-panel';

describe('DraftPanel', () => {
  let component: DraftPanel;
  let fixture: ComponentFixture<DraftPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DraftPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(DraftPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
