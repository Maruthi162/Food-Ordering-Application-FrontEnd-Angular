import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemslistComponent } from './cart-itemslist.component';

describe('CartItemslistComponent', () => {
  let component: CartItemslistComponent;
  let fixture: ComponentFixture<CartItemslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartItemslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
