import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefooditemComponent } from './updatefooditem.component';

describe('UpdatefooditemComponent', () => {
  let component: UpdatefooditemComponent;
  let fixture: ComponentFixture<UpdatefooditemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatefooditemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatefooditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
