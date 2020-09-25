import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './api.service';
import { ShowService } from './show.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  changed = false;
  showAll = false;

  constructor(private api: ApiService, public show: ShowService) { }

  ngOnInit() {
    this.showAll =  this.show.getShowAll();
    this.show.changed.subscribe(state => this.showAll = state);
    this.api.changed.subscribe(() => this.changed = true);
    this.api.saved.subscribe(() => this.changed = false);
    this.api.loaded.subscribe(() => this.changed = false);
  }

  showAllChanged(event: boolean) {
    this.show.setShowAll(event);
  }

  changesSave() {
    this.api.saveTimetable();
  }

  changesDiscard() {
    this.api.loadTimetable();
  }

  downloadTimetable() {
    this.api.downloadTimetable();
  }

  openTimetable(files: FileList) {
    const reader = new FileReader();
    reader.onload = () => {
      this.api.openTimetable(reader.result.toString());
      this.api.changed.emit();
    };
    reader.readAsText(files[0]);
  }

  importFile(files: FileList) {
    const reader = new FileReader();
    reader.onload = () => {
      this.api.importISTimetable(reader.result.toString());
    };
    reader.readAsText(files[0]);
  }
}
