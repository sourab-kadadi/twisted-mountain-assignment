import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../service/users.service';
import { HeaderComponent } from '../header/header.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { NgxUiLoaderModule} from 'ngx-ui-loader';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [HeaderComponent, MatCardModule, MatIconModule, MatButtonModule,
    NgxUiLoaderModule,
    CommonModule ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  
  userId: string | null = null;
  userData: any
  isLoading = false
  
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private usersService: UsersService,
    private ngxLoader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
    });
    this.fetchUsersData()
  }

  fetchUsersData() {
    try {      
      this.ngxLoader.start('loader-table');
      this.isLoading = true
      this.usersService.getUsersList().subscribe((res: any) => {
        this.ngxLoader.stop('loader-table');
        this.isLoading = false
        if (res.length > 0) {
          this.userData = res.find((item: any) => {
            return item.id == this.userId
          })
        }
      })
    } catch (error) {
      this.isLoading = false
      alert('An error occurred: ' + error);
      this.ngxLoader.stop('loader-table');
    }
  }

  
  goBack() {
    this.router.navigate(['']); 
    

    
  }

}
