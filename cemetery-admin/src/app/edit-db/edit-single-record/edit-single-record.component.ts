import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataApiService } from '../services/data-api.service';
import { Person } from '../services/models/person.model';

@Component({
  selector: 'app-edit-single-record',
  templateUrl: './edit-single-record.component.html',
  styleUrls: ['./edit-single-record.component.css']
})
export class EditSingleRecordComponent implements OnInit {

  protected personFormFields: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private dataApiService: DataApiService
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
    console.log('xxxx');
    console.log('submit data: ', this.personFormFields.value);
    const newPerson: Person = this.personFormFields.value;
    // newPerson.id = Math.floor(Math.random()*100+1000);
    this.dataApiService.updateDbDate().subscribe(d => console.log('datadb: ', d));
    this.dataApiService.addNewPerson(newPerson).subscribe(d => console.log('newPerson: ', d));
  }

}
