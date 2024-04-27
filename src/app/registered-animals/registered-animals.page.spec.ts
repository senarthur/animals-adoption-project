import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterAnimalsPage } from './registered-animals.page';

describe('RegisteredAnimalsPage', () => {
  let component: RegisterAnimalsPage;
  let fixture: ComponentFixture<RegisterAnimalsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterAnimalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
