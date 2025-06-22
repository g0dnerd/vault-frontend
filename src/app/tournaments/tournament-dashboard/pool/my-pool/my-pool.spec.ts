import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyPool } from './my-pool';

describe('MyPool', () => {
  let component: MyPool;
  let fixture: ComponentFixture<MyPool>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPool],
    }).compileComponents();

    fixture = TestBed.createComponent(MyPool);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
