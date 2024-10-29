import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptDialogComponentComponent } from './prompt-dialog-component.component';

describe('PromptDialogComponentComponent', () => {
  let component: PromptDialogComponentComponent;
  let fixture: ComponentFixture<PromptDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
