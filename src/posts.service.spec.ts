import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    // Arrange
    const initialPostsCount = postsService['posts'].length;

    // Act
    const createdPost = postsService.create(post);

    // Assert
    expect(postsService['posts']).toHaveLength(initialPostsCount + 1);
    expect(createdPost.text).toBe(post.text);
    expect(createdPost.id).toBeDefined();
    expect(createdPost.date).toBeDefined();
    expect(typeof createdPost.id).toBe('string');
    expect(typeof createdPost.date).toBe('string');
  });

  it('should find a post', () => {
    // Arrange
    const createdPost = postsService.create(post);
    const postId = createdPost.id;

    // Act
    const foundPost = postsService.find(postId);

    // Assert
    expect(foundPost).toBeDefined();
    expect(foundPost).toEqual(createdPost);
    expect(foundPost?.id).toBe(postId);
    expect(foundPost?.text).toBe(post.text);
  });
});