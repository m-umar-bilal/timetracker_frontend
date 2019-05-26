import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'create-projects',
  styleUrls: ['./create-projects.component.scss'],
  templateUrl: './create-projects.component.html',
})
export class CreateProjectsComponent {

  constructor(private http:HttpClient) {

  }

  createProject(form) {
    console.log(form.value);
    this.http.post(environment.API_URL+"/projects", form.value, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe((res)=>{
      console.log(res)
      alert("Project Created");
      form.reset();
    },error2 => {
      console.log(error2)
      alert(error2.message)
    })
  }
}
