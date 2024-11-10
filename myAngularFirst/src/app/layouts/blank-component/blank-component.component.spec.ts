import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankComponentComponent } from './blank-component.component';

describe('BlankComponentComponent', () => {
  let component: BlankComponentComponent;
  let fixture: ComponentFixture<BlankComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlankComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
