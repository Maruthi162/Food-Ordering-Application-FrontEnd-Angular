import { TestBed } from '@angular/core/testing';

import { FavouriteServicesService } from './favourite-services.service';

describe('FavouriteServicesService', () => {
  let service: FavouriteServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouriteServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
