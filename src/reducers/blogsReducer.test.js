import blogsReducer from './blogsReducer'
import deepFreeze from 'deep-freeze'

const initialBlogs = [
  {
    id: 1,
    title: 'Title 1',
    author: 'Author 1',
    url: 'URL1',
    likes: 3,
    user: 'User1'
  },
  {
    id: 2,
    title: 'Title 2',
    author: 'Author 2',
    url: 'URL2',
    likes: 6,
    user: 'User2'
  },
  {
    id: 3,
    title: 'Title 3',
    author: 'Author 3',
    url: 'URL3',
    likes: 4,
    user: 'User1'
  }
]

describe('blogsReducer', () => {
  test('returns all blogs ordered by likes with action INIT_BLOGS', () => {
    const state = []
    const action = {
      type: 'INIT_BLOGS',
      data: [ ...initialBlogs ]
    }

    deepFreeze(state)

    const newState = blogsReducer(state, action)
    expect(newState).toEqual([
      {
        id: 2,
        title: 'Title 2',
        author: 'Author 2',
        url: 'URL2',
        likes: 6,
        user: 'User2'
      },
      {
        id: 3,
        title: 'Title 3',
        author: 'Author 3',
        url: 'URL3',
        likes: 4,
        user: 'User1'
      },
      {
        id: 1,
        title: 'Title 1',
        author: 'Author 1',
        url: 'URL1',
        likes: 3,
        user: 'User1'
      }
    ])
  })

  test('adds a new blog to blogs with action ADD_NEW_BLOG', () => {
    const state = initialBlogs
    const action = {
      type: 'ADD_NEW_BLOG',
      data: {
        id: 4,
        title: 'Title 4',
        author: 'Author 4',
        url: 'URL4',
        likes: 0,
        user: 'User2'
      }
    }

    deepFreeze(state)
    const newState = blogsReducer(state, action)

    expect(newState).toEqual([
      {
        id: 2,
        title: 'Title 2',
        author: 'Author 2',
        url: 'URL2',
        likes: 6,
        user: 'User2'
      },
      {
        id: 3,
        title: 'Title 3',
        author: 'Author 3',
        url: 'URL3',
        likes: 4,
        user: 'User1'
      },
      {
        id: 1,
        title: 'Title 1',
        author: 'Author 1',
        url: 'URL1',
        likes: 3,
        user: 'User1'
      },
      {
        id: 4,
        title: 'Title 4',
        author: 'Author 4',
        url: 'URL4',
        likes: 0,
        user: 'User2'
      }
    ])
  })

  test('updates given blog with action UPDATE_BLOG', () => {
    const state = initialBlogs
    const action = {
      type: 'UPDATE_BLOG',
      data: {
        id: 1,
        title: 'Title 1',
        author: 'Author 1',
        url: 'URL1',
        likes: 5,
        user: 'User1'
      }
    }

    deepFreeze(state)
    const newState = blogsReducer(state, action)

    expect(newState).toEqual([
      {
        id: 2,
        title: 'Title 2',
        author: 'Author 2',
        url: 'URL2',
        likes: 6,
        user: 'User2'
      },
      {
        id: 1,
        title: 'Title 1',
        author: 'Author 1',
        url: 'URL1',
        likes: 5,
        user: 'User1'
      },
      {
        id: 3,
        title: 'Title 3',
        author: 'Author 3',
        url: 'URL3',
        likes: 4,
        user: 'User1'
      }
    ])
  })

  test('removes a blog with given id with action DELETE_BLOG', () => {
    const state = initialBlogs
    const action = {
      type: 'DELETE_BLOG',
      data: {
        id: 1
      }
    }

    deepFreeze(state)
    const newState = blogsReducer(state, action)

    expect(newState).toEqual([
      {
        id: 2,
        title: 'Title 2',
        author: 'Author 2',
        url: 'URL2',
        likes: 6,
        user: 'User2'
      },
      {
        id: 3,
        title: 'Title 3',
        author: 'Author 3',
        url: 'URL3',
        likes: 4,
        user: 'User1'
      }
    ])
  })

  test('returns current state with an unrecognized action', () => {
    const state = initialBlogs
    const action = {
      type: 'SOME_RANDOM_TYPE'
    }

    deepFreeze(state)
    const newState = blogsReducer(state, action)

    expect(newState).toBe(state)
  })
})