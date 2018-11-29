import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
// import { FormArray } from '@angular/forms';
import { CustomerProfile } from './customer-profile.model';
import { MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerProfileComponent implements OnInit {
  customerProfileForm: FormGroup;
  primaryAndBillingContactForm: FormGroup;
  primaryInstruction: FormGroup;
  argCustomerProfile: CustomerProfile;
  items: MenuItem[];
  masterData: {};
  cols; colsPrimaryandBilling; colsPrimaryInstruction; colsNotification; colsBilling; colsImage; colsImageUpload;


  public isModalVisible: boolean;
  isPrimryInstVisible: boolean;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // mobile : number; //when we select customertype as individual
    this.masterData = {};
    this.getMasterJSON();
    this.colsPrimaryandBilling = [
      { field: 'name', header: 'Name' },
      { field: 'dept', header: 'Dept' },
      { field: 'phone', header: 'Phone' },
      { field: 'ext', header: 'Ext' },
      { field: 'fax', header: 'Fax' },
      { field: 'mobile', header: 'Mobile' },
      { field: 'email', header: 'Email' }
    ];
    this.colsPrimaryInstruction = [
      { field: 'typeCode', header: 'TypeCode' },
      { field: 'typeDesc', header: 'TypeDesc' },
      { field: 'comment', header: 'Comments' },
    ];

    this.colsNotification = [
      { field: 'notifyTypeName', header: 'Notify Type Name' },
      { field: 'template', header: 'Template' },
      { field: 'method', header: 'Method' },
      { field: 'primaryContact', header: 'Primary Contact' },
      { field: 'billContact', header: 'Bill Contact' }
    ];

    this.colsBilling = [
      { field: 'fedexAccount', header: 'FEDEX A/C' },
      { field: 'comments', header: 'COMMENTS' },
      { field: 'creditStatus', header: 'Credit Status' },
      { field: 'paymentType', header: 'Payment Type' },
      { field: 'bankRecFlag', header: 'Bank Rec Flag' },
      { field: 'defaultBilling', header: 'Default Billing' }
    ];

    this.colsImage = [
      { field: 'no', header: 'No' },
      { field: 'source', header: 'Source' },
      { field: 'docType', header: 'Doc Type' },
      { field: 'status', header: 'Status' },
      { field: 'annotation', header: 'Annotation' },
      { field: 'created', header: 'Created' },
      { field: 'contactValid', header: 'Contact valid' },
      { field: 'customsValid', header: 'Customs Valid' },
      { field: 'action', header: 'Action' },
      { field: 'expiry', header: 'Expiry' }
    ];

    this.customerProfileForm = this.fb.group({
      role: ['', Validators.required],
      customerType: [''],
      primaryDetails: this.fb.group({
        name: [''],
        address: [''],
        city: [''],
        state: [''],
        country: [''],
        zip: [''],
        mobile: [''],
        phone: [''],
        fax: [''],
        email: [''],
        url: [''],

        // Country Specific
        // Country Specific fields(Aus)
      }),
      countrySpecific: this.fb.group({
        fedexAccount: [''],
        creditStat: [''],
        ccid: [''],
        abn: [''],
        cac: [''],
        bsb: ['']
      }),
      primaryContactList: this.fb.array([{
        name: [''],
        dept: [''],
        phone: [''],
        ext: [''],
        fax: [''],
        mobile: [''],
        email: ['']
      }]),
      billContactList: this.fb.array([{ // form array
        name: [''],
        dept: [''],
        phone: [''],
        ext: [''],
        fax: [''],
        mobile: [''],
        email: ['']
      }]),
      primaryInstructionList: this.fb.array([{ // form array
        typeCode: [''],
        typeDesc: [''],
        comment: ['']
      }]),
      freetextinstruction: [''],
      notificationList: this.fb.array([{// form array
        notifyTypeName: [''],
        template: [''],
        method: [''],
        primaryContact: [''],
        billContact: ['']
      }]),
      billingList: this.fb.array([]),
      imageList: this.fb.array([])
    });

    this.primaryAndBillingContactForm = this.fb.group({
      name: [''],
      dept: [''],
      phone: [''],
      ext: [''],
      fax: [''],
      mobile: [''],
      email: ['']
    });
    this.primaryInstruction = this.fb.group({
      typeCode: [''],
      typeDesc: [''],
      comment: ['']
    });
    // this.argCustomerProfile = this.customerProfileForm.getRawValue();
  }

  ngOnInit() {
  }

  getMasterJSON() {
    const url = 'https://sujithdubbudu.github.io/fieldMasterData/masterdata.json';
    this.http.get(url).subscribe(result => {
      this.masterData = result;
      console.log(result);
    }, error => console.error(error));
  }




  showModal(event) {
    this.isModalVisible = true;
  }
  modalAccept() {
    this.isModalVisible = false;
  }
  modalCancel() {
    this.isModalVisible = false;
  }
}
