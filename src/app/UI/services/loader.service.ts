import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, find, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  page_section: SectionLoading = {
    name: "page",
    ready: false,
  }

  list: BehaviorSubject<SectionLoading[]> = new BehaviorSubject<SectionLoading[]>([this.page_section]);

  constructor(public router: Router) { 


    //  Change Page Ready to False on NavigationEnd
    this.router.events.pipe(
      filter( e => e instanceof NavigationEnd )
    ).subscribe(e => {
      console.log("NavEnd Page Ready");
      // this.changeStatus("page", false);
    });


    this.list.subscribe(list => {
      // console.log("FeedbackList: ", list);
    });

  }

  isLoading(page_name: string): Observable<boolean> {

    let bool = this.list.pipe(
      map( arr => arr.find(i => i.name == page_name)?.ready )
    );

    // console.log("bool", bool, this.list);

    return bool;
  }

  newLoader(name:string){
    let dupe: boolean = this.list.value.find(i=> i.name == name) != undefined;
    if (!dupe){
      let current = this.list.value;
      current.push({name: name, ready: false});
      this.list.next(current);
    }
  }

  changeStatus(name: string, ready: boolean){
    let updated_list = this.list.value.map( item => {
      if ( item.name == name ) {
        item.ready = ready;
      }
      return item;
    });

    // console.log("new List: ", updated_list);
    this.list.next(updated_list);
  }


}



export class SectionLoading {
  name: string;
  ready: boolean;
}
