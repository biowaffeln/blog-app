import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Post } from './post.model';
import * as firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostService {

  readonly path = 'posts';

  constructor(private afs: AngularFirestore) { }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  add(data: Post): Promise<DocumentReference> {
    const timestamp = this.timestamp;
    return this.afs.collection(this.path).add({...data, timestamp});
  }

  delete(id: string) {
    return this.afs.collection(this.path).doc(id).delete();
  }

  getCollection$(): Observable<Post[]> {
    return this.afs.collection<Post>(this.path).snapshotChanges()
    .map(docChangeActions => docChangeActions.map(changeAction => changeAction.payload))
    .map(docChanges => docChanges.map(change => change.doc))
    .map(docs => docs.map(doc => ({ ...doc.data() as Post, id: doc.id })));
  }

}
