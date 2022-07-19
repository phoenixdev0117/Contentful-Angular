import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class StackbitEvent {
  changedContentTypes: string[];
  changedObjectIds: [];
  currentPageObjectId: string;
  currentUrl: string;
  visibleObjectIds: [];
}

@Injectable()
export class StackbitService {
  public contentChanged = new Subject<StackbitEvent>();

  constructor() {
    window.addEventListener('stackbitObjectsChanged', (event: any) => {
      this.contentChanged.next({
        changedContentTypes: event.detail.changedContentTypes,
        changedObjectIds: event.detail.changedObjectIds,
        currentPageObjectId: event.detail.currentPageObjectId,
        currentUrl: event.detail.currentUrl,
        visibleObjectIds: event.detail.visibleObjectIds
      });

      event.preventDefault();
    }, { passive: false });
  }
}