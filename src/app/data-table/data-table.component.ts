import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable } from '@angular/material';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;

  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // selection = new SelectionModel<PeriodicElement>(true, []);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['position', 'name', 'weight', 'symbol'];

  ngOnInit() {
    this.dataSource = new DataTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
 /** Whether the number of selected elements matches the total number of rows. */
 isAllSelected() {
  const numSelected = this.dataSource.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}
/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.dataSource.selection.clear() :
      this.dataSource.data.forEach(row => this.dataSource.selection.select(row));
}
/** The label for the checkbox on the passed row */
checkboxLabel(row?: DataTableItem): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.dataSource.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}
}
