import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolMethodenkofferComponent } from './tool-methodenkoffer.component';

describe('ToolMethodenkofferComponent', () => {
  let component: ToolMethodenkofferComponent;
  let fixture: ComponentFixture<ToolMethodenkofferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolMethodenkofferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolMethodenkofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
