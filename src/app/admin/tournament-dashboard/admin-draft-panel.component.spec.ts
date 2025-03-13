import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDraftPanelComponent } from './admin-draft-panel.component';

describe('AdminDraftPanelComponent', () => {
  let component: AdminDraftPanelComponent;
  let fixture: ComponentFixture<AdminDraftPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDraftPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDraftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
