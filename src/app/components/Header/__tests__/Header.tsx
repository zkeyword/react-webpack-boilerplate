import * as React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Header from '../index'

describe('<Header />', () => {
    it('renders', () => {
        const tree = render(
            <MemoryRouter>
                <Header>
                    <div className="text" />
                </Header>
            </MemoryRouter>
        ).container.firstChild
        expect(tree).toMatchSnapshot()
    })
    it('renders', () => {
        const tree = render(
            <MemoryRouter>
                <Header />
            </MemoryRouter>
        ).container.firstChild
        expect(tree).toMatchSnapshot()
    })
})
