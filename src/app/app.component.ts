import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // this is an observable object
  courses$;
  courses: any[];
  course$;
  author$;
  coursesList: AngularFireList<{}>;
  // coursesSub: Subscription;
  constructor(private dbase: AngularFireDatabase) {
    this.courses$ = this.dbase.list('/courses').valueChanges();
    this.course$ = this.dbase.object('/courses/1').valueChanges();
    this.author$ = this.dbase.object('/authors/1').valueChanges();
    this.coursesList = this.dbase.list('/courses');
    // this.coursesSub = dbase
    //   .list("/courses")
    //   .valueChanges()
    //   .subscribe(courses => {
    //     this.courses = courses;
    //     console.log(courses);
    //   });
  }

  // ngOnDestroy() {
  //   this.coursesSub.unsubscribe();
  // }

  addObject(course: HTMLInputElement) {
    this.coursesList.push(
      {
        name: 'Mosh',
        age: 42,
        sex: 'Male',
        title: 'Mr.',
        sections: [
          {title: 'Angular'},
          {title: 'Web'},
          {title: 'Development'},
        ]
      }
    );
    course.value = '';
  }

  update(course) {
    const itemRef = this.dbase.object('/courses/' + course.$key);
    itemRef.set(course + ' UPDATED');
  }

}
