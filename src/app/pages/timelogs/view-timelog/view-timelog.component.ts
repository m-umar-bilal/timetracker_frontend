import { Component } from '@angular/core';
import {SmartTableData} from "../../../@core/data/smart-table";
import {LocalDataSource} from "ng2-smart-table";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'view-timelogs',
  styleUrls: ['./view-timelog.component.scss'],
  templateUrl: './view-timelog.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class ViewTimelogsComponent {
  title;

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
      startTime: {
        title: 'Start Time',
        type: 'date',
        valuePrepareFunction: (date) => {
          if (date) {
            var datePipe = new DatePipe("en-US");
            date = datePipe.transform(date, 'short');
            return date;
          }
          return null;
        },
      },
      endTime: {
        title: 'End Time',
        valuePrepareFunction: (date) => {
          if (date) {
            var datePipe = new DatePipe("en-US");
            date = datePipe.transform(date, 'short');
            return date;
          }
          return null;
        },
      },
      duration:{
        title: 'Duration (Hour)',
        valuePrepareFunction: (cell, row) => {
          let eventStartTime = new Date(row.startTime);
          let eventEndTime = new Date(row.endTime);
          let duration = eventEndTime.valueOf() - eventStartTime.valueOf();
          return this.convertToString(duration)
        }
      },
      description: {
        title: 'Description',
        type: 'string',
      }
      // createdAt: {
      //   title: 'createdAt',
      //   type: 'string',
      // },
    },
  };


  source: LocalDataSource = new LocalDataSource();
  private projectId: any;

  constructor(private service: SmartTableData,private http:HttpClient, private route: ActivatedRoute) {

    this.projectId = this.route.snapshot.params.projectId;
    this.http.get(environment.API_URL+"/projects/"+this.projectId).subscribe((res:any)=>{
      this.title = res.title;
      this.source.load(res.timelogs);

      console.log(res.timelogs)
    },error2 => {
      console.log(error2)
      alert(error2.message)
    })
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
 convertToString(ms, delim = " : ") {
    const showWith0 = value => (value < 10 ? `0${value}` : value);
    const hours = showWith0(Math.floor((ms / (1000 * 60 * 60)) % 60));
    const minutes = showWith0(Math.floor((ms / (1000 * 60)) % 60));
    const seconds = showWith0(Math.floor((ms / 1000) % 60));
    return `${parseInt(hours) ? `${hours}${delim}` : ""}${minutes}${delim}${seconds}`;
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
