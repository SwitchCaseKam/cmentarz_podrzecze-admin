import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataApiService } from '../services/data-api.service';
import { Person } from '../models/person.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-single-record',
  templateUrl: './edit-single-record.component.html',
  styleUrls: ['./edit-single-record.component.css']
})
export class EditSingleRecordComponent implements OnInit {

  protected personFormFields: FormGroup = new FormGroup({});
  private personId: number = 0;
  private person: Person = {id: 0, name: '', surname: '', birthDate: '', deathDate: '', sex: '', tombId: 0, pictures: []};
  protected requestStatusMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private dataApiService: DataApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.person = this.router.getCurrentNavigation()?.extras.state as Person;
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => {
      if (p['id']) { this.personId = p['id']; }
      this.personFormFields = this.createPersonFormFields();
    });
  }

  private createPersonFormFields(): FormGroup {
    if (!this.person) {
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

    const tombId = this.person.tombId === 0 ? '' : this.person.tombId.toString();
    const pictures = this.person.pictures.length === 0 ? '' : this.person.pictures.join(',');
    return this.formBuilder.group({
      name: [this.person.name, Validators.required],
      surname: [this.person.surname, Validators.required],
      birthDate: [this.person.birthDate, Validators.required],
      deathDate: [this.person.deathDate, Validators.required],
      sex: [this.person.sex, Validators.required],
      tombId: [tombId, Validators.required],
      pictures: [pictures, Validators.required],
    });
  }

  protected submitData(): void {
    const newPerson: Person = this.personFormFields.value;
    newPerson.tombId = Number(newPerson.tombId);
    newPerson.pictures = newPerson.pictures.toString() === '' ? [] : newPerson.pictures.toString().split(',');
    this.dataApiService.updateDbDate().subscribe(d => console.log('datadb: ', d));
    if (this.personId) {
      this.dataApiService.editPerson(newPerson, this.personId).subscribe(
        d => {
          this.requestStatusMessage = 'Dane zostały zaktualizowane';
          setTimeout(() => this.router.navigate(['edit-db', 'edit']), 1500);
        },
        error => this.requestStatusMessage = `Wystąpił błąd. Spróbuj ponownie za chwilę. ${error}`);
    } else {
      this.dataApiService.addNewPerson(newPerson).subscribe(
        d => {
          this.requestStatusMessage = 'Nowe dane zostały dodane poprawnie';
          setTimeout(() => this.router.navigate(['edit-db']), 1500);
        
        },
        error => this.requestStatusMessage = `Wystąpił błąd. Spróbuj ponownie za chwilę. ${error?.status}, ${error?.message}`
      );
    }
  }

  protected cancelEditData(): void {
    if (this.person) {
      this.router.navigate(['edit-db', 'edit']);
      return;
    }
    this.router.navigate(['edit-db']);
  }

}
