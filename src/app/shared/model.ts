export class Book {
    title: string;
    author: string;
    metadata: Metadata;
    users: User[];
    constructor(data) {
        this.title = data.title;
        this.author = data.author;
        this.metadata = new Metadata(data.metadata);
        this.users = data.users;
   }
}
export class User {
    id: number;
    name: string;
}
export class Metadata {
    type: string;
    isbin: string;
    genre: string;
    reserved: string;
    date: Date;
    constructor(data: string) {
        this.type = data.substring(0, 1);
        this.isbin = data.substring(1, 18);
        this.genre = data.substring(18, 30);
        this.reserved = data.substring(30, 50);
        this.date = new Date(parseInt(data.substring(50, 65), 0) * 1000);
   }
}
export interface JsonResponse {
    books: Book[];
}
