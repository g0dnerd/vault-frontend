import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportResultForm } from './report-result-form';

describe('ReportResultForm', () => {
  let component: ReportResultForm;
  let fixture: ComponentFixture<ReportResultForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportResultForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportResultForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
