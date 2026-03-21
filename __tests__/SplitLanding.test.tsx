import { render, screen } from '@testing-library/react'
import SplitLanding from '@/components/SplitLanding'

describe('SplitLanding', () => {
  it('renders the Dominik brand name', () => {
    render(<SplitLanding />)
    expect(screen.getByText('Dominik')).toBeInTheDocument()
  })

  it('renders drone link pointing to /drone', () => {
    render(<SplitLanding />)
    const droneLink = screen.getByRole('link', { name: /drone/i })
    expect(droneLink).toHaveAttribute('href', '/drone')
  })

  it('renders IT link pointing to /it', () => {
    render(<SplitLanding />)
    const itLink = screen.getByRole('link', { name: /it/i })
    expect(itLink).toHaveAttribute('href', '/it')
  })
})
