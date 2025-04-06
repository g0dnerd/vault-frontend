import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCubeComponent } from './create-cube.component';

describe('CreateCubeComponent', () => {
  let component: CreateCubeComponent;
  let fixture: ComponentFixture<CreateCubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCubeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
