import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateForm from './CreateForm'

describe('<CreateForm />', () => {
  let component

  const handleCreate = jest.fn()

  beforeEach(() => {
    component = render(
      <CreateForm handleCreate={handleCreate} />
    )
  })

  test('form component calls blog creation with correct information', () => {
    let titleField = component.container.querySelector('#title')
    fireEvent.change(titleField, { target: { value: 'unit-test-title' } })

    let authorField = component.container.querySelector('#author')
    fireEvent.change(authorField, { target: { value: 'test author' } })

    let urlField = component.container.querySelector('#url')
    fireEvent.change(urlField, { target: { value: 'unit-test-url' } })

    let form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(handleCreate).toHaveBeenCalledTimes(1)
    expect(handleCreate).toHaveBeenCalledWith({
      title: 'unit-test-title',
      author: 'test author',
      url: 'unit-test-url'
    })
  })
})