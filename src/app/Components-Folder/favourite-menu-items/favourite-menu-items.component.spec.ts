import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteMenuItemsComponent } from './favourite-menu-items.component';

describe('FavouriteMenuItemsComponent', () => {
  let component: FavouriteMenuItemsComponent;
  let fixture: ComponentFixture<FavouriteMenuItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteMenuItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouriteMenuItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
