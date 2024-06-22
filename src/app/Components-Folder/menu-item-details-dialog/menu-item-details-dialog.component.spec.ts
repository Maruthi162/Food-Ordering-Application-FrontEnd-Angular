import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemDetailsDialogComponent } from './menu-item-details-dialog.component';

describe('MenuItemDetailsDialogComponent', () => {
  let component: MenuItemDetailsDialogComponent;
  let fixture: ComponentFixture<MenuItemDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuItemDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuItemDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
