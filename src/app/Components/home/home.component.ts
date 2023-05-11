import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { NoteService } from 'src/app/Core/services/note.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userData: any;
  notes: any[] = [];
  value: string = '';
  updateFlag: boolean = false;
  isDisabled: boolean = true;
  noteTitle: string = '';
  noteDesc: string = '';
  noteID: string = '';
  noNotes: boolean = true;
  titleInp: string = '';
  descInp: string = '';


  constructor(private _fb: FormBuilder, private _NoteService: NoteService, private _ToastrService: ToastrService) { }

  dataForm!: FormGroup;


  ngOnInit(): void {
    this.createForm();
    this.userData = jwtDecode(localStorage.getItem('userToken')!);
    this.getNotes();
    if (!this.notes.length) {
      this.noNotes = true;
    }
  }

  createForm(): void {
    this.dataForm = this._fb.group({
      title: ['', [Validators.required]],
      desc: ['', [Validators.required]],
      token: localStorage.getItem('userToken')
    })
  }

  sendData(dataForm: FormGroup): void {
    if (this.dataForm.valid) {
      if (!this.updateFlag) {
        this.addNote(dataForm.value);
        // this.dataForm.reset();
        console.log('helloAdd');
        // console.log(this.dataForm.value);
      } else {
        console.log('helloUpdate');
        this.updateNote(dataForm.value, this.noteID);
        // console.log(dataForm.value);
      }
    }
  }

  addNote(note: any): void {
    const data = {
      token: localStorage.getItem('userToken'),
      title: note.title,
      desc: note.desc,
      citizenID: this.userData._id
    }

    this.notes.push(data)
    // console.log(data);

    this._NoteService.addNote(data).subscribe({
      next: (response) => {
        this.getNotes();
        console.log(response);
      },
      error: (err) => {
        // console.log(err);
      },
      complete: () => {
        this._ToastrService.success('The Note is added successfully');
      }
    })
  }

  getNotes(): void {
    const model = {
      token: localStorage.getItem('userToken'),
      userID: this.userData._id
    }

    this._NoteService.getUserNotes(model).subscribe({
      next: (response) => {
        if (response.message === 'success') {
          this.notes = response.Notes;
          this.noNotes = false;
        } else if (response.message === "no notes found") {
          this.noNotes = true;
        }
        console.log(response);
      }
    })
  }

  deleteNote(id: string, index: number): void {
    // console.log('hello', id);
    const model = {
      token: localStorage.getItem('userToken'),
      NoteID: id
    }

    this._NoteService.deleteNote(model).subscribe({
      next: (response) => {
        // console.log(response);
        if (response.message === 'deleted') {
          // this.getNotes();  => this will work, but I want to reduce the no. of requests
          this.notes.splice(index, 1);
          this.notes = [...this.notes]
        }
      }
    })
  }

  openUpdate(note: any) {
    this.updateFlag = true;
    this.isDisabled = true;
    console.log('Button locked');
    this.noteID = note._id;
    this.titleInp = note.title!;
    this.descInp = note.desc!;
  }

  updateButtonState(): void {
    const titleInp = document.getElementById('titleToBeUpdated') as HTMLInputElement;
    const descInp = document.getElementById('descToBeUpdated') as HTMLInputElement;

    if (this.titleInp || this.descInp) {
      this.isDisabled = false;
      console.log('Button unlocked');
    } else {
      this.isDisabled = true;
    }
  }

  closeUpdate(): void {
    this.dataForm.reset();
    this.updateFlag = false;
    this.isDisabled = true;
  }

  updateNote(note: any, id: string): void {
    const model = {
      token: localStorage.getItem('userToken'),
      title: note.title,
      desc: note.desc,
      NoteID: id
    }
    this._NoteService.updateNote(model).subscribe({
      next: (response) => {
        console.log(response);
        if (response.message === 'updated') {
          this.notes = [...this.notes]
          this.getNotes();
        }
      }, error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.updateFlag = false;
        this.isDisabled = true;
        this.dataForm.reset();
      }
    })
  }
}
