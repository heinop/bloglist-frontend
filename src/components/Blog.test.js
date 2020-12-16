import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'Test blog title',
    author: 'Test Author',
    url: 'http://test.blog',
    likes: 1,
    user: { name: 'Test User' }
  }

  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        showRemove={true}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
      />
    )
  })

  test('renders blog title and author by default but not url or likes', () => {

    component.debug()

    expect(component.container).toHaveTextContent(
      'Test blog title'
    )

    expect(component.container).toHaveTextContent(
      'Test Author'
    )

    expect(component.container).not.toHaveTextContent(
      'http://test.blog'
    )

    expect(component.container).not.toHaveTextContent(
      'likes 1'
    )
    // const titleElement = component.getByText('Test blog title')
    // expect(titleElement).toBeDefined()

    // const authorElement = component.getByText('Test Author')
    // expect(authorElement).toBeDefined()

    // const urlElement = component.getByText('http://test.blog')
    // expect(urlElement).not.toBeDefined()

    // const likesElement = component.getByText('likes 1')
    // expect(likesElement).not.toBeDefined()
  })

})