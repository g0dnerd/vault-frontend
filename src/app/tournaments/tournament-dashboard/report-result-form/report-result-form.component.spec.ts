import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportResultFormComponent } from './report-result-form.component';

describe('ReportResultFormComponent', () => {
  let component: ReportResultFormComponent;
  let fixture: ComponentFixture<ReportResultFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportResultFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportResultFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
