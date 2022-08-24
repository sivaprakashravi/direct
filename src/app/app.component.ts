import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Chart } from './model/chart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'direct';
  dataArray: Chart[] = [];
  constructor(private http: HttpClient) {
    this.http.get('assets/data/data.csv', {responseType: 'text'})
    .subscribe(
        data => {
          this.dataArray = this.csvJSON(data);
        },
        error => {
            console.log(error);
        }
    );
  }

  csvJSON(csv: string) {
    const lines = csv.split('\n')
    const result = []
    const headers = lines[0].split(',')

    for (let i = 1; i < lines.length; i++) {        
        if (!lines[i])
            continue
        const obj: any = {};
        const currentline = lines[i].split(',')

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = JSON.parse(currentline[j])
        }
        result.push(obj)
    }
    return result;
}
}
