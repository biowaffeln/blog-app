import * as firebase from 'firebase'

export interface Post {
    title: string;
    content: string;
    timestamp?: firebase.firestore.FieldValue;
    id?: string;
}