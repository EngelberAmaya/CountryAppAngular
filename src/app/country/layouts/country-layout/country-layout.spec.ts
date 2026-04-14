import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryLayout } from './country-layout';

describe('CountryLayout', () => {
  let component: CountryLayout;
  let fixture: ComponentFixture<CountryLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
