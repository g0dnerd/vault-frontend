import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDraft } from './create-draft';

describe('CreateDraft', () => {
  let component: CreateDraft;
  let fixture: ComponentFixture<CreateDraft>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDraft],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateDraft);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
