import { Component } from '@angular/core';
import { NoteService } from './service';
NoteService
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'note';

    note = {
      title: '',
      content: ''
    };
  
    notes: any[] = [];
  
    constructor(private noteService: NoteService) {}
  
    ngOnInit() {
      // Fetch all notes on init
      this.getNotes();
    }
  
    getNotes() {
      this.noteService.getNotes().subscribe(
        (data) => {
          this.notes = data;
        },
        (error) => {
          console.error('Error fetching notes', error);
        }
      );
    }
  
    onSubmit() {
      if (this.note.title ) {
        // Call the addNote service to post data
        this.noteService.addNote(this.note).subscribe(
          (response) => {
            console.log('Note added', response);
            // Clear the form fields
            this.note = { title: '', content: '' };
            // Fetch the updated list of notes
            this.getNotes();
          },
          (error) => {
            console.error('Error adding note', error);
          }
        );
      }
    }

  deleteNote(id: number) {
    this.noteService.deleteNote(id).subscribe(
      () => {
        console.log('Note deleted');
        // Fetch the updated list of notes
        this.getNotes();
      },
      (error) => {
        console.error('Error deleting note', error);
      }
    );
  }
}
