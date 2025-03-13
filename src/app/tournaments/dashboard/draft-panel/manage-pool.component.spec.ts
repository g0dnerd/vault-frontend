import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagePoolComponent } from './manage-pool.component';

describe('ManagePoolComponent', () => {
  let component: ManagePoolComponent;
  let fixture: ComponentFixture<ManagePoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePoolComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagePoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
