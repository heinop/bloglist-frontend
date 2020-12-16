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
  })

  test('renders also url and likes after clicking view button', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    component.debug()

    expect(component.container).toHaveTextContent(
      'Test blog title'
    )

    expect(component.container).toHaveTextContent(
      'Test Author'
    )

    expect(component.container).toHaveTextContent(
      'http://test.blog'
    )
    const urlElement = component.getByText('http://test.blog')
    expect(urlElement).toBeDefined()

    expect(component.container).toHaveTextContent(
      'likes 1'
    )
  })
})