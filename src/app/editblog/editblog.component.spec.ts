import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditblogComponent } from './editblog.component';

describe('EditblogComponent', () => {
  let component: EditblogComponent;
  let fixture: ComponentFixture<EditblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditblogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
