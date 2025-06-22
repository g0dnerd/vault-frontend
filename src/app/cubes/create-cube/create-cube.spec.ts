import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCube } from './create-cube';

describe('CreateCubeComponent', () => {
  let component: CreateCube;
  let fixture: ComponentFixture<CreateCube>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCube],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateCube);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
