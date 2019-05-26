import { Component } from '@angular/core';
import {SmartTableData} from "../../../@core/data/smart-table";
import {LocalDataSource} from "ng2-smart-table";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'view-projects',
  styleUrls: ['./view-projects.component.scss'],
  templateUrl: './view-projects.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ViewProjectsComponent {


  settings = {
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave:true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
       title: {
        title: 'Title',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      status: {
        title: 'Status',
        config: {
          list: [{title: 'Ongoing', value: 'Ongoing'}, {title: 'Completed', value: 'Completed'}]

        },

        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'Ongoing', title: 'Ongoing' }, { value: 'Completed', title: 'Completed' }
            ]
          }
        }
      },
      // createdAt: {
      //   title: 'createdAt',
      //   type: 'string',
      // },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData,private http:HttpClient,private router: Router) {


    this.http.get(environment.API_URL+"/projects").subscribe((res:any)=>{
      console.log(res.filter(data=>{return data.status==="Ongoing"}))

      this.source.load(res.filter(data=>{return data.status==="Ongoing"}));

      console.log(res)
    },error2 => {
      console.log(error2)
      alert(error2.message)
    })
  }
  onUserRowSelect(event){
    // console.log(event)
    this.router.navigate(['/pages/timelogs/view',event.data._id])

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  updateRecord(event) {
    // console.log(event.newData);
    let data = {"status" : event.newData.status,
      "description" : event.newData.description,
      "title" : event.newData.title,
    };
    console.log(event)
    this.http.put(environment.API_URL+"/projects/"+event.newData._id, data).subscribe(
      res => {
        console.log(res);
        event.confirm.resolve(event.newData);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }
  deleteRecord(event){
    console.log(event.data);
    this.http.delete(environment.API_URL+"/projects/"+event.data._id).subscribe(
      res => {
        console.log(res);
        event.confirm.resolve(event.source.data);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
    //event.confirm.resolve(event.source.data);

  }

}
