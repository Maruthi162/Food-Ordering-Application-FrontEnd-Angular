import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteRestaurantsComponent } from './favorite-restaurants.component';

describe('FavoriteRestaurantsComponent', () => {
  let component: FavoriteRestaurantsComponent;
  let fixture: ComponentFixture<FavoriteRestaurantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteRestaurantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
