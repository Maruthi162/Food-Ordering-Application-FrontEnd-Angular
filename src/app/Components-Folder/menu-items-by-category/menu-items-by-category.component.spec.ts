import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemsByCategoryComponent } from './menu-items-by-category.component';

describe('MenuItemsByCategoryComponent', () => {
  let component: MenuItemsByCategoryComponent;
  let fixture: ComponentFixture<MenuItemsByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemsByCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuItemsByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
