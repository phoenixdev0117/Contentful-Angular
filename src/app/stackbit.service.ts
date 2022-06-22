import { Injectable, isDevMode, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export class StackbitEvent {
    changedContentTypes: string[];
    changedObjectIds: [];
    currentPageObjectId: string;
    currentUrl: string;
    visibleObjectIds: [];
}

@Injectable()
export class StackbitService {
  public changedObjectIds:  BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public onChange: EventEmitter<StackbitEvent> = new EventEmitter<StackbitEvent>();

  constructor() {
    window.addEventListener('stackbitObjectsChanged', (event: any) => {
      this.changedObjectIds.next(event.detail.changedObjectIds);
      this.onChange.emit({
        changedContentTypes: event.detail.changedContentTypes,
        changedObjectIds: event.detail.changedObjectIds,
        currentPageObjectId: event.detail.currentPageObjectId,
        currentUrl: event.detail.currentUrl, 
        visibleObjectIds: event.detail.visibleObjectIds
      });
      event.preventDefault();
    });
  }
}