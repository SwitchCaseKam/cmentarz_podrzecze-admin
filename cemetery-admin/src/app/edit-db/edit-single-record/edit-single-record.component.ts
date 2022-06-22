import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataApiService } from '../services/data-api.service';
import { Person } from '../models/person.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-single-record',
  templateUrl: './edit-single-record.component.html',
  styleUrls: ['./edit-single-record.component.css']
})
export class EditSingleRecordComponent implements OnInit {

  protected personFormFields: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private dataApiService: DataApiService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.personFormFields = this.createPersonFormFields();
  }

  private createPersonFormFields(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthDate: ['', Validators.required],
      deathDate: ['', Validators.required],
      sex: ['', Validators.required],
      tombId: ['', Validators.required],
      pictures: ['', Validators.required],
    });
  }

  protected submitData(): void {
    const newPerson: Person = this.personFormFields.value;
    newPerson.tombId = Number(newPerson.tombId);
    newPerson.pictures = newPerson.pictures.toString() === '' ? [] : newPerson.pictures.toString().split(',');
    this.dataApiService.updateDbDate().subscribe(d => console.log('datadb: ', d));
    this.dataApiService.addNewPerson(newPerson).subscribe(d => console.log('newPerson: ', d));
  }

  protected cancelEditData(): void {
    this.router.navigate(['edit-db'])
  }

}
