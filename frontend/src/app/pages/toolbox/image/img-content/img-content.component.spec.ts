import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgContentComponent } from './img-content.component';

describe('ImgContentComponent', () => {
  let component: ImgContentComponent;
  let fixture: ComponentFixture<ImgContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
