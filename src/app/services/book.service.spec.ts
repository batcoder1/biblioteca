import { AppModule } from './../app.module';
import { TestBed, inject } from '@angular/core/testing';

import { BookService } from './book.service';
import { APP_BASE_HREF } from '@angular/common';

describe('BookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [AppModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
  });

  it('should be created', inject([BookService], (service: BookService) => {
    expect(service).toBeTruthy();
  }));

  it('should create books', () => {
    const service: BookService = TestBed.get(BookService);
    service.getBooks().subscribe(
      books => {
        expect(books[0].title).toEqual('Cien años de soledad');
      }
    );
  });
});
