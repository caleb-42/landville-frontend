import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { profileServiceSpy, resetSpies, toastServiceSpy } from 'src/app/helpers/spies';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { mockProfileForm, mockProfileFormErrorResponse, mockProfileResponse } from 'src/app/shared/mocks';

import { PersonalInformationComponent } from './personal-information.component';

describe('PersonalInformationComponent', () => {
  let component: PersonalInformationComponent;
  let fixture: ComponentFixture<PersonalInformationComponent>;
  let de: DebugElement;

  beforeAll(() => {
    resetSpies([ profileServiceSpy, toastServiceSpy ]);
    profileServiceSpy.userProfile$ = of(mockProfileResponse);
  });
  afterEach(() => resetSpies([ profileServiceSpy, toastServiceSpy ]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NgxSpinnerModule, BrowserAnimationsModule
      ],
      declarations: [ PersonalInformationComponent ],
      providers: [
        {
          provide: ProfileService,
          useValue: profileServiceSpy
        },
        {
          provide: ToastrService,
          useValue: toastServiceSpy
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorage.clear();
    fixture = TestBed.createComponent(PersonalInformationComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should get the user profile', () => {
    profileServiceSpy.getProfile.and.returnValue(of(mockProfileResponse));
    component.setProfile();

    expect(profileServiceSpy.userProfile$).toBeDefined();
  });
  it('should submit form', async(() => {
    const profileForm = mockProfileForm as NgForm;
    profileServiceSpy.updateProfile.and.returnValue(of(mockProfileResponse));
    component.saveProfile();
    expect(component.saveProfile).toBeTruthy();
  }));
  it('should trigger form submission if button is clicked', () => {
    fixture.detectChanges();
    spyOn(component, 'saveProfile');
    const el = fixture.debugElement.query(By.css('.btn-form-blue-profile'))
      .nativeElement;
    el.click();
    expect(component.saveProfile).toHaveBeenCalledTimes(1);
  });

  it('Should show a toast message when the response from server returns form validation error', async(() => {
    const profileForm = mockProfileForm as NgForm;
    profileServiceSpy.updateProfile.and.returnValue(
      throwError(mockProfileFormErrorResponse)
    );
    component.saveProfile();
    const errorMessage = `Could not update your profile.
              phone: Phone number must be of the format +234 123 4567890`;
    expect(toastServiceSpy.error).toHaveBeenCalledWith(errorMessage);
  }));
});