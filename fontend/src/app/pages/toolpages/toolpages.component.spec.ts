import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolpagesComponent } from './toolpages.component';

describe('ToolpagesComponent', () => {
  let component: ToolpagesComponent;
  let fixture: ComponentFixture<ToolpagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolpagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
