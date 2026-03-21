import { render, screen } from '@testing-library/react'
import ITPage from '@/app/it/page'

jest.mock('@/components/ParticleCanvas', () => ({
  __esModule: true,
  default: () => <div data-testid="particle-canvas" />,
}))

describe('IT page', () => {
  it('renders the main headline', () => {
    render(<ITPage />)
    expect(screen.getByText('Infrastructure & DevOps')).toBeInTheDocument()
  })

  it('renders all skill badges', () => {
    render(<ITPage />)
    expect(screen.getByText('Kubernetes')).toBeInTheDocument()
    expect(screen.getByText('Grafana')).toBeInTheDocument()
    expect(screen.getByText('Prometheus')).toBeInTheDocument()
    expect(screen.getByText('Mimir')).toBeInTheDocument()
    expect(screen.getByText('CI/CD')).toBeInTheDocument()
  })

  it('renders back link to home', () => {
    render(<ITPage />)
    const back = screen.getByRole('link', { name: /back|dominik|home/i })
    expect(back).toHaveAttribute('href', '/')
  })
})
