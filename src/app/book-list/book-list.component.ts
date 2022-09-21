import { Component, OnInit } from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';
import { Router } from '@angular/router';
import { Observable } from "rxjs";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books: Observable<Book[]>;

    constructor(private bookService: BookService,
      private router: Router) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
      this.books = this.bookService.getBooksList();
    }

    deleteBook(id: number) {
      this.bookService.deleteBook(id)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
    }

    bookDetails(id: number){
      this.router.navigate(['details', id]);
    }

     updateBook(id: number){
        this.router.navigate(['update', id]);
      }

     isToRead(status: string): boolean{
        return status=='TO_READ';
     }

     isCurrentlyReading(status: string): boolean{
         return status=='CURRENTLY_READING';
     }

     isAlreadyRead(status: string): boolean {
        return status=='ALREADY_READ';
     }

}
