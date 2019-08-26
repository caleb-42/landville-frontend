import { Component, OnInit } from '@angular/core';
import { RegisterServiceService } from '../../services/register/register-service.service';
import { User } from '../../models/register/user';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registeruser: User[];
  returnUrl: string;


  constructor(
    private registerServiceService: RegisterServiceService,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.titleService.setTitle(data.title);
      this.metaService.addTags(data.tags);
    });

  }

  registerUser(register: User) {
    this.spinner.show();
    this.registerServiceService.registerUser(register).subscribe(
      response => {
        this.toastrService.success(response.data.message);
        this.spinner.hide();
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.toastrService.error(error.error.errors.email[0]);
        this.spinner.hide();
      }
    );

  }

}
