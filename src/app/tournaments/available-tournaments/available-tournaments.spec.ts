import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvailableTournaments } from './available-tournaments';

describe('AvailableTournaments', () => {
  let component: AvailableTournaments;
  let fixture: ComponentFixture<AvailableTournaments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableTournaments],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailableTournaments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
