import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnrollPanelComponent } from './enroll-panel.component';

describe('EnrollPanelComponent', () => {
  let component: EnrollPanelComponent;
  let fixture: ComponentFixture<EnrollPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
