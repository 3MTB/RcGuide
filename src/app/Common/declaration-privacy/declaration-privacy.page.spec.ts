import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeclarationPrivacyPage } from './declaration-privacy.page';

describe('DeclarationPrivacyPage', () => {
  let component: DeclarationPrivacyPage;
  let fixture: ComponentFixture<DeclarationPrivacyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarationPrivacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
