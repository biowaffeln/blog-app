import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Post} from './post.model';
import * as firebase from 'firebase/app';
import {QueryFn} from 'angularfire2/firestore/interfaces';
import {Observable} from 'rxjs/Observable';
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable()
export class PostService {

  readonly path = 'posts';

  constructor(private afs: AngularFirestore) { }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  add(data: Post): Promise<DocumentReference> {
    const timestamp = this.timestamp;
    return this.afs.collection<Post>(this.path).add({ ...data, timestamp });
  }

  remove(id: string): Promise<void> {
    return this.afs.collection<Post>(this.path).doc(id).delete();
  }

  update(id: string, data: Partial<Post>): Promise<void> {
    return this.afs.collection<Post>(this.path).doc(id).update(data);
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
