import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})

export class AppComponent implements OnInit {
  title = "spMgAngDocker";
  constructor(private http: HttpClient) {}
  data: any = [];
  newItemText: string = '';

  ngOnInit() {
    this.getData();
  }

  getData() {
    let url = "http://localhost:8080/getItems";
    this.http.get(url).subscribe((res) => {
      console.log(res);
      this.data = res;
    });
  }

  addItem() {
    if (!this.newItemText.trim()) return;
    
    let url = "http://localhost:8080/addItem";
    let data = { itemName: this.newItemText };
    this.http
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .subscribe((res) => {
        console.log(res);
        this.getData();
        this.newItemText = ''; // Clear the input after adding
      });
  }
}
