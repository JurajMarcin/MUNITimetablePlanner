import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  changed = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.changed.subscribe(() => this.changed = true);
    this.api.saved.subscribe(() => this.changed = false);
  }

  openTimetable(files: FileList) {
    const reader = new FileReader();
    reader.onload = () => {
      const timetable = this.api.openTimetable(reader.result.toString());
      if (timetable) {
        this.api.imported.emit(timetable);
      } else {
        alert('Open error');
      }
    };
    reader.readAsText(files[0]);
  }

  downloadTimetable() {
    if (this.changed) {
      alert('Save changes first');
      return;
    }
    this.api.downloadSavedTimetable();
  }

  importFile(files: FileList) {
    const reader = new FileReader();
    reader.onload = () => {
      const timetable = this.api.importISTimetable(reader.result.toString());
      if (timetable) {
        this.api.imported.emit(timetable);
      } else {
        alert('Import error');
      }
    };
    reader.readAsText(files[0]);
  }
}
