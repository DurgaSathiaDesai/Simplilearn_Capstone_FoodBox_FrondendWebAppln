import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfooditemComponent } from './addfooditem.component';

describe('AddfooditemComponent', () => {
  let component: AddfooditemComponent;
  let fixture: ComponentFixture<AddfooditemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfooditemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfooditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
