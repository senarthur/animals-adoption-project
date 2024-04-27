import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdoptedAnimalsPage } from './adopted-animals.page';

describe('AdoptedAnimalsPage', () => {
  let component: AdoptedAnimalsPage;
  let fixture: ComponentFixture<AdoptedAnimalsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdoptedAnimalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
