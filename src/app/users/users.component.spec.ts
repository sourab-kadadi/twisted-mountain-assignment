import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { UsersService } from '../service/users.service';
import { MockUsersService } from '../service/mock-users.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterTestingModule } from '@angular/router/testing';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        RouterTestingModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        NoopAnimationsModule,
        CapitalizePipe
      ],
      providers: [
        { provide: UsersService, useClass: MockUsersService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user data on init', fakeAsync(() => {
    const service = TestBed.inject(UsersService);
    const spy = spyOn(service, 'getUsersList').and.callThrough();
    component.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalled();
    expect(component.usersList.length).toBe(3);
    expect(component.colHeading.length).toBeGreaterThan(0);
  }));

  it('should set usersList and colHeading after data is fetched', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.usersList.length).toBe(3);
    expect(component.colHeading.length).toBeGreaterThan(0);
  }));

  it('should edit the selected row', () => {
    const element = component.usersList[0];
    component.editRow(element);
    expect(component.editableRow).toEqual(element);
  });

  it('should save the edited row', () => {
    component.editableRow = component.usersList[0];
    component.saveRow();
    expect(component.editableRow).toBeNull();
  });

  it('should cancel editing the row', () => {
    component.editableRow = component.usersList[0];
    component.cancelEdit();
    expect(component.editableRow).toBeNull();
  });

  it('should apply filter to the dataSource', () => {
    component.dataSource.filter = '';
    component.applyFilter({ target: { value: 'Adeel' } } as Event);
    expect(component.dataSource.filter).toBe('adeel');
  });

  it('should alert when trying to navigate while in edit mode', () => {
    const element = component.usersList[0];
    spyOn(window, 'alert');
    component.editProcess = true;
    component.onButtonClick(element);
    expect(window.alert).toHaveBeenCalledWith('Please complete editing the current row before selecting another.');
  });

  it('should navigate to user detail page when a row is clicked and not in edit mode', () => {
    const router = TestBed.inject(RouterTestingModule);
    const spy = spyOn(router, 'navigate');
    component.editProcess = false;
    component.onButtonClick({ id: 'V59OF92YF627HFY0' });
    expect(spy).toHaveBeenCalledWith(['/user-detail'], { queryParams: { id: 'V59OF92YF627HFY0' } });
  });
});
