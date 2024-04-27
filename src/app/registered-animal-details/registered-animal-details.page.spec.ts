import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisteredAnimalsPage } from './registered-animal-details.page';

describe('RegisteredAnimalsPage', () => {
  let component: RegisteredAnimalsPage;
  let fixture: ComponentFixture<RegisteredAnimalsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisteredAnimalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
