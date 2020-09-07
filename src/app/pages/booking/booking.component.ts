import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

import { ListsService } from "../lists.service";

import { List } from "../list.model";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, OnDestroy {

  @Input() lists: List[] = [];
  moviesInfo = [];

  private listsSub: Subscription;

  constructor(public listsService: ListsService, private router: Router ) {
    // this.moviesInfo = [
    //   {id:1,image:"https://www.bing.com/th?id=AMMS_fc13b208146d1cf0d5db18c8b8701898&w=120&h=180&c=7&rs=1&qlt=80&cdv=1&pid=16.1", availableSeats:20, },
    //   {id:2,image:"https://www.bing.com/th?id=AMMS_0a74d610eeb3b65a61a8ebceb9f78bda&w=120&h=180&c=7&rs=1&qlt=80&cdv=1&pid=16.1", availableSeats:20, },
    //   {id:3,image:"https://www.bing.com/th?id=AMMS_4e1941352f1b50e71c6931c2688e8c17&w=113&h=170&c=7&rs=1&qlt=80&pcl=f9f9f9&cdv=1&pid=16.1", availableSeats:20, },
    //   {id:4,image:"https://i.pinimg.com/originals/19/b3/b4/19b3b4eec1be9f8966c9a343bdfdeee0.jpg", availableSeats:20, },
    //   {id:5,image:"https://www.bing.com/th?id=AMMS_6344bf6c93279d1e8e2796593d0c1fa5&w=120&h=180&c=7&rs=1&qlt=80&cdv=1&pid=16.1", availableSeats:20, },
    //   {id:6,image:"https://www.bing.com/th?id=AMMS_8151192eef92608c9869c1628ed9c122&w=120&h=180&c=7&rs=1&qlt=80&cdv=1&pid=16.1", availableSeats:20, },
    //   {id:7,image:"https://th.bing.com/th/id/OIP.8wcqL-Y5p5mkxAzihmMssQHaLk?w=115&h=180&c=7&o=5&pid=1.7", availableSeats:20, },
    //   {id:8,image:"https://th.bing.com/th/id/OIP.kjLm40rB8O5MPV1-GQtxSgHaJQ?w=129&h=180&c=7&o=5&pid=1.7", availableSeats:20, }
    // ];
    this.moviesInfo = this.listsService.getAllMovies();
  }

  ngOnInit(): void {
    this.listsService.getLists()
    this.listsSub = this.listsService.getListUpdateListener()
    .subscribe((lists: List[]) => { this.lists = lists });
  }
  ngOnDestroy() {
    this.listsSub.unsubscribe();
  }
  bookTickets(item) {
    this.router.navigate(['Booking', item.id]);
  }
}
