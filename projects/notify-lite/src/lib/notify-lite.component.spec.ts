import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyLiteComponent } from './notify-lite.component';

describe('NotifyLiteComponent', () => {
  let component: NotifyLiteComponent;
  let fixture: ComponentFixture<NotifyLiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifyLiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifyLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
