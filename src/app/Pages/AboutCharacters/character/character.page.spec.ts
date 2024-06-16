import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterPage } from './character.page';

describe('CharacterPage', () => {
  let component: CharacterPage;
  let fixture: ComponentFixture<CharacterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
