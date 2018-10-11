import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Post} from './post.model';
import * as firebase from 'firebase/app';
import {QueryFn} from '@angular/fire/firestore/interfaces';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable()
export class PostService {

  readonly path = 'posts';

  constructor(private afs: AngularFirestore) { }

  add(data: Post): Promise<DocumentReference> {
    return this.afs.collection<Post>(this.path).add({...data, created: new Date()});
  }

  remove(id: string): Promise<void> {
    return this.afs.doc<Post>(`${this.path}/${id}`).delete();
  }

  update(id: string, data: Partial<Post>): Promise<void> {
    return this.afs.doc<Post>(`${this.path}/${id}`).update(data);
  }

  getCollection$(ref?: QueryFn): Observable<Post[]> {
    return this.afs.collection<Post>(this.path, ref)
      .snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
  }

}
