import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgSelectComponent } from './img-select.component';

describe('ImgSelectComponent', () => {
  let component: ImgSelectComponent;
  let fixture: ComponentFixture<ImgSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
