import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecuisinesComponent } from './managecuisines.component';

describe('ManagecuisinesComponent', () => {
  let component: ManagecuisinesComponent;
  let fixture: ComponentFixture<ManagecuisinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagecuisinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagecuisinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
