import { Component, OnInit } from '@angular/core';
import {Book} from '../book';
import {BookService} from '../book.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {

  id: number;
    book: Book;

    constructor(private route: ActivatedRoute,private router: Router, private bookService: BookService) { }

    ngOnInit() {
      this.book = new Book();

      this.id = this.route.snapshot.params['id'];

      this.bookService.getBook(this.id)
        .subscribe(data => {
          console.log(data)
          this.book = data;
        }, error => console.log(error));
    }

    updateBook() {
      this.bookService.updateBook(this.id, this.book)
        .subscribe(data => {
          console.log(data);
          this.book = new Book();
          this.gotoList();
        }, error => console.log(error));
    }

    onSubmit() {
      this.updateBook();
    }

    gotoList() {
      this.router.navigate(['/books']);
    }

}
