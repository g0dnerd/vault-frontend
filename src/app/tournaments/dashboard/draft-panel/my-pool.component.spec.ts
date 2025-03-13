import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyPoolComponent } from './my-pool.component';

describe('MyPoolComponent', () => {
  let component: MyPoolComponent;
  let fixture: ComponentFixture<MyPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPoolComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
