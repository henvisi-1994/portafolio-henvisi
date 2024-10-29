/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  OnChanges,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ColumnDefinition } from '../../shared/interfaces/ColumDefinition';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { acciones } from '../../config/Utils';
import { Model } from '../../shared/interfaces/Model';
import { EntidadAuditable } from '../../shared/domain/EntidadAuditable';
import { DataManager } from '../../shared/aplications/DataManager';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-material-table',
  templateUrl: './MaterialTable.component.html',
  styleUrls: ['./MaterialTable.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialTableComponent<T extends EntidadAuditable>
  implements AfterViewInit, OnChanges
{
  @Input() columns: ColumnDefinition[] = [];
  @Input() data: any[] = [];
  @Input() Form!: FormGroup; // Estado de carga
  @Input() tabGroup!: MatTabGroup; // Estado de carga
  @Input() endpoint: string = ''; // Estado del endpoint para guardar/actualizar los datos
  @Output() disabled: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() accion: EventEmitter<Model<T>> = new EventEmitter<Model<T>>();

  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dataManager: DataManager<T>) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    this.displayedColumns = this.columns.map((c) => c.def);
    this.displayedColumns.push('actions'); // Agregar la columna de acciones
    this.dataSource.data = this.data;
  }

  visualizar(element: any) {
    this.tabGroup.selectedIndex = 0;
    this.Form.patchValue(element);
    this.disabled.emit(true);
    this.accion.emit({ model: element, action: acciones.CONSULTAR });
  }

  editar(element: any) {
    this.tabGroup.selectedIndex = 0;
    this.Form.patchValue(element);
    this.disabled.emit(false);
    this.accion.emit({ model: element, action: acciones.EDITAR });
  }

  eliminar(element: T) {
    console.log(element);

    Swal.fire({
      title: "¿Realmente quiere borrarlo?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Si",
      denyButtonText: `No`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const index = this.data.indexOf(element);
        if (index > -1 && element.id) {
          this.dataManager.eliminar(element.id, this.endpoint).subscribe(() => {
            this.data.splice(index, 1);
            this.dataSource.data = [...this.data]; // Actualizar la tabla
          });
        }
      }
    });
  }
}
