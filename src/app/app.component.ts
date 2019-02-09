import { Component, OnDestroy } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  DatabaseSnapshot
} from '@angular/fire/database';
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
    this.courses$ = this.dbase.list('/courses').snapshotChanges();
    this.course$ = this.dbase.object('/courses/1').snapshotChanges();
    this.author$ = this.dbase.object('/authors/1').snapshotChanges();
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
      course.value
      // {
      //   name: 'Mosh',
      //   age: 42,
      //   sex: 'Male',
      //   title: 'Mr.',
      //   sections: [
      //     {title: 'Angular'},
      //     {title: 'Web'},
      //     {title: 'Development'},
      //   ]
      // }
    );
    course.value = '';
  }

  update(course) {
    const itemRef = this.dbase.object('/courses/' + course.payload.key);
    itemRef.update({ isLive: true, price: 150 });
  }

  delete(course) {
    this.dbase
      .object('/courses/' + course.payload.key)
      .remove()
      .then(x => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      });
  }
}
