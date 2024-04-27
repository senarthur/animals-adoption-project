import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkSendedPage } from './link-sended.page';

describe('LinkSendedPage', () => {
  let component: LinkSendedPage;
  let fixture: ComponentFixture<LinkSendedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LinkSendedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
