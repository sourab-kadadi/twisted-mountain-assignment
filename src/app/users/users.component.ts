import { Component, ViewChild } from '@angular/core';
import { UsersService } from '../service/users.service';
import { HeaderComponent } from '../header/header.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HeaderComponent, MatTableModule, MatIconModule, MatButtonModule,
    MatPaginatorModule, MatSortModule, MatInputModule, CommonModule, MatInputModule, 
    CapitalizePipe, FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  usersList: any = []
  colHeading: any = []
  displayedColumns: any
  dataSource: any
  editableRow: any = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  editProcess = false
  
  constructor(
    private usersService: UsersService, 
    private router: Router,
  ) { }

  async ngOnInit() {
    this.fetchUsersData()
    this.getData()
  }

  async fetchUsersData() {
    try {
      this.usersList = []
      this.colHeading = []
      this.usersService.getUsersList().subscribe((res: any) => {
        if (res.length > 0) {
          this.usersList = res
          const uniqueHeader = [...new Set(this.usersList.flatMap(Object.keys))];
          let colsData: any = []
          colsData = uniqueHeader.map(field => ({ field }));
          this.colHeading = colsData
          this.displayedColumns = [...this.colHeading.map((col: any) => col.field), 'action'];
          this.dataSource = new MatTableDataSource(this.usersList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
    } catch (error) {
      alert('An error occurred: ' + error);
    }
  }

  editRow(element: any): void {
    this.editableRow = element;
  }

  saveRow(): void {
    this.editableRow = null;
  }

  cancelEdit(): void {
    this.editableRow = null;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  onButtonClick(element: any) {
    if (this.editProcess && this.editableRow !== element) {
      alert('Please complete editing the current row before selecting another.');
    } else if (!this.editProcess) {
      this.router.navigate(['/user-detail'], { queryParams: { id: element.id } });
    }
  }

  getData() {
    try {
      const a = ''

      let b = a.includes('a')
      throw new Error()
    } catch (e) {
    }
  }

}


