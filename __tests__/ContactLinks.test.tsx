import { render, screen } from '@testing-library/react'
import ContactLinks from '@/components/ContactLinks'

describe('ContactLinks', () => {
  it('renders GitHub link with correct href', () => {
    render(<ContactLinks />)
    const github = screen.getByRole('link', { name: /github/i })
    expect(github).toHaveAttribute('href', 'https://github.com/Dominik-esb')
  })

  it('renders LinkedIn link with correct href', () => {
    render(<ContactLinks />)
    const linkedin = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/dominik-eisenberg-93001422b'
    )
  })

  it('opens links in a new tab', () => {
    render(<ContactLinks />)
    const links = screen.getAllByRole('link')
    links.forEach(link => expect(link).toHaveAttribute('target', '_blank'))
  })

  it('sets rel="noopener noreferrer" on all links', () => {
    render(<ContactLinks />)
    const links = screen.getAllByRole('link')
    links.forEach(link =>
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    )
  })
})
