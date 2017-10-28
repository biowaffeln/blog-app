import { TestBed, inject } from '@angular/core/testing';

import { PostService } from './post.service';

describe('FirestoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService]
    });
  });

  it('should be created', inject([PostService], (service: PostService) => {
    expect(service).toBeTruthy();
  }));
});
