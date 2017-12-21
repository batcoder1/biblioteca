import { AppModule } from './../../app.module';
import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import {Pipe, PipeTransform} from '@angular/core';
import { Book, Filter } from '../../shared/model';
const books: Book[] = [
  {
   title: 'Cien años de soledad',
   author: 'Gabriel García Márquez',
   metadata: {
     type: 'L',
     isbin: '978-3-598-21455-1',
     genre: 'novela',
     reserved: '',
     date: '000000221184000'
   },
   users: [{id: 1, name: 'Isidro Pérez'}, { id: 2, name: 'José Manuel Santos'}, {id: 3, name: 'Trinidad Alonso'}]

 },
  {
   title: 'Aventuras de un soldado',
   author: 'Maribel Ramos',
   metadata: {
     type: 'L',
     isbin: '978-3-598-21500-1',
     genre: 'aventuras',
     reserved: '',
     date: '000000221184000'
   },
   users: [{id: 1, name: 'Isidro Pérez'}, { id: 2, name: 'José Manuel Santos'}, {id: 3, name: 'Trinidad Alonso'}]

  }];

  const booksExpect: Book[] = [
    {
      title: 'Aventuras de un soldado',
      author: 'Maribel Ramos',
      metadata: {
        type: 'L',
        isbin: '978-3-598-21500-1',
        genre: 'aventuras',
        reserved: '',
        date: '000000221184000'
      },
      users: [{id: 1, name: 'Isidro Pérez'}, { id: 2, name: 'José Manuel Santos'}, {id: 3, name: 'Trinidad Alonso'}]
   }
  ];

@Pipe({name: 'pipename'})
class MockPipe implements PipeTransform {
  transform(books: Book[], filters: Filter): any {
    return books.filter(item => {
        filters.title = filters.title || '';
        filters.author = filters.author || '';
        filters.genre = filters.genre || '';
        filters.isbin = filters.isbin || '';

        return (item.title.toLowerCase().indexOf(filters.title.toLowerCase()) >= 0 &&
        item.author.toLowerCase().indexOf(filters.author.toLowerCase()) >= 0 &&
        item.metadata.isbin.toLowerCase().indexOf(filters.isbin.toLowerCase()) >= 0 &&
        item.metadata.genre.toLowerCase().indexOf(filters.genre.toLowerCase()) >= 0 );
    });
}
}

describe('FilterPipe', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockPipe
      ],
      imports: [AppModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents();
  }));
  it('filterpipe must filter by title: Aventura and get book: Aventuras de un soldado',  () => {
    const pipe = new MockPipe();
    const filter: Filter = { title: 'Aventuras', author: '', genre: '', isbin: ''};

    expect(pipe.transform(books, filter)).toEqual(booksExpect);

  });

  it('filterpipe must filter by Author: Maribel and get book: Aventuras de un soldado',  () => {
    const pipe = new MockPipe();
    const filter: Filter = { title: '', author: 'Maribel', genre: '', isbin: ''};

    expect(pipe.transform(books, filter)).toEqual(booksExpect);

  });
  it('filterpipe must filter by género: aventuras and get book: Aventuras de un soldado',  () => {
    const pipe = new MockPipe();
    const filter: Filter = { title: '', author: '', genre: 'aventuras', isbin: ''};

    expect(pipe.transform(books, filter)).toEqual(booksExpect);

  });
  it('filterpipe must filter by  isbin= 21500  and get book: Aventuras de un soldado',  () => {
    const pipe = new MockPipe();
    const filter: Filter = { title: '', author: '', genre: '', isbin: '978-3-598-21500-1'};

    expect(pipe.transform(books, filter)).toEqual(booksExpect);

  });
  it('filterpipe must filter by part of isbin= 21500  and get book: Aventuras de un soldado',  () => {
    const pipe = new MockPipe();
    const filter: Filter = { title: '', author: '', genre: '', isbin: '21500'};

    expect(pipe.transform(books, filter)).toEqual(booksExpect);

  });
 
});
