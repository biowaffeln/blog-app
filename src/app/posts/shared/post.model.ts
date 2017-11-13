import * as firebase from 'firebase';

export interface Post {
  title: string;
  content: string;
  likes: number;
  timestamp?: firebase.firestore.FieldValue;
  id?: string;
}
