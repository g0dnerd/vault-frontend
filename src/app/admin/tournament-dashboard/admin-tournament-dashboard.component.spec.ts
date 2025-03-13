import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTournamentDashboardComponent } from './admin-tournament-dashboard.component';

describe('AdminTournamentDashboardComponent', () => {
  let component: AdminTournamentDashboardComponent;
  let fixture: ComponentFixture<AdminTournamentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTournamentDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTournamentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
