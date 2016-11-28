import { defaultPosts, requestInitialPostsData } from '../app/shared/reducers/posts'

jest.autoMockOff()

describe('a posts reducer', () => {
  it('has a valid default posts state', () => {
    const posts = defaultPosts()
    expect(posts).toEqual({posts: [], isFetching: false})
  })

  it('can fetch initial posts data for server side rendering purposes', () => {
    const initialState = requestInitialPostsData().then(data => {
      expect(data.posts).toBeDefined()
      expect(data.posts.posts).toBeInstanceOf(Array)
      expect(data.posts.isFetching).toBeFalsey()
    })
  })
})
