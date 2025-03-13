import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailableTournamentsComponent } from './available-tournaments.component';

describe('AvailableTournamentsComponent', () => {
  let component: AvailableTournamentsComponent;
  let fixture: ComponentFixture<AvailableTournamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableTournamentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailableTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
