import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdermsgdisplayComponent } from './ordermsgdisplay.component';

describe('OrdermsgdisplayComponent', () => {
  let component: OrdermsgdisplayComponent;
  let fixture: ComponentFixture<OrdermsgdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdermsgdisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdermsgdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
