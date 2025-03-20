import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CubeDetailComponent } from './cube-detail.component';

describe('CubeDetailComponent', () => {
  let component: CubeDetailComponent;
  let fixture: ComponentFixture<CubeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CubeDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CubeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
