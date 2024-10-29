/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificacionesService } from './Notificaciones.service';

describe('Service: Notificaciones', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificacionesService]
    });
  });

  it('should ...', inject([NotificacionesService], (service: NotificacionesService) => {
    expect(service).toBeTruthy();
  }));
});
