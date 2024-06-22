import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauarantCategoriesComponent } from './restauarant-categories.component';

describe('RestauarantCategoriesComponent', () => {
  let component: RestauarantCategoriesComponent;
  let fixture: ComponentFixture<RestauarantCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestauarantCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RestauarantCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
