import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  private showAll = false;
  public changed = new EventEmitter<boolean>();

  constructor() {
    const showAll = window.localStorage.getItem('showAll');
    if (showAll != null) {
      this.setShowAll(showAll === 'true');
    }
  }

  public setShowAll(state: boolean) {
    this.showAll = state;
    window.localStorage.setItem('showAll', String(state));
    this.changed.emit(state);
  }

  public getShowAll(): boolean {
    return this.showAll;
  }

  public toggleShowAll() {
    this.setShowAll(!this.getShowAll());
  }
}
