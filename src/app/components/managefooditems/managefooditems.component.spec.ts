import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagefooditemsComponent } from './managefooditems.component';

describe('ManagefooditemsComponent', () => {
  let component: ManagefooditemsComponent;
  let fixture: ComponentFixture<ManagefooditemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagefooditemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagefooditemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
