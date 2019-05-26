import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'add-timelog',
  styleUrls: ['./add-timelog.component.scss'],
  templateUrl: './add-timelog.component.html',
})
export class AddTimelogComponent {
  projects;
  constructor(private http:HttpClient) {
    this.http.get(environment.API_URL+"/projects").subscribe((res:any)=>{
      this.projects = res.filter(data=>{return data.status==="Ongoing"});
      console.log(this.projects)
      // this.source.load(res.filter(data=>{return data.status==="Ongoing"}));

      console.log(res)
    },error2 => {
      console.log(error2)
      alert(error2.message)
    })
  }

  createProject(form) {
    console.log(form.value);
    this.http.post(environment.API_URL+"/timelogs", form.value, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe((res)=>{
      console.log(res);
      alert("Timelog added");
      form.reset();
    },error2 => {
      console.log(error2)
      alert(error2.message)
    })
  }
}
