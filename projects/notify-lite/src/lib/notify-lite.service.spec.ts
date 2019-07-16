import { TestBed } from '@angular/core/testing';

import { NotifyLiteService } from './notify-lite.service';

describe('NotifyLiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotifyLiteService = TestBed.get(NotifyLiteService);
    expect(service).toBeTruthy();
  });
});
