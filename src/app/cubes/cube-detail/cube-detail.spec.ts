import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CubeDetail } from './cube-detail';

describe('CubeDetail', () => {
  let component: CubeDetail;
  let fixture: ComponentFixture<CubeDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CubeDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(CubeDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
