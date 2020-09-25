import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  private showAll = false;
  public changed = new EventEmitter<boolean>();

  constructor() { }

  public setShowAll(state: boolean) {
    this.showAll = state;
    this.changed.emit(state);
  }

  public getShowAll(): boolean {
    return this.showAll;
  }

  public toggleShowAll() {
    this.setShowAll(!this.getShowAll());
  }
}
