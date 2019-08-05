import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultNotifyTemplateComponent } from './default-notify-template.component';

describe('DefaultNotifyTemplateComponent', () => {
  let component: DefaultNotifyTemplateComponent;
  let fixture: ComponentFixture<DefaultNotifyTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultNotifyTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultNotifyTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
