import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CubeList } from './cube-list';

describe('CubeList', () => {
  let component: CubeList;
  let fixture: ComponentFixture<CubeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CubeList],
    }).compileComponents();

    fixture = TestBed.createComponent(CubeList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
