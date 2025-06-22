import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDraftPanel } from './admin-draft-panel';

describe('AdminDraftPanel', () => {
  let component: AdminDraftPanel;
  let fixture: ComponentFixture<AdminDraftPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDraftPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDraftPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
