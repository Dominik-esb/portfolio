import { render, screen } from '@testing-library/react'
import DronePage from '@/app/drone/page'

// DroneFrameHero uses canvas + scroll APIs unavailable in jsdom
jest.mock('@/components/DroneFrameHero', () => ({
  __esModule: true,
  default: () => (
    <section>
      <h1>Professional Drone Photography</h1>
      <span>DOC Certified Pilot</span>
    </section>
  ),
}))

describe('Drone page', () => {
  it('renders the main headline', () => {
    render(<DronePage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /professional.*drone.*photography/i
    )
  })

  it('renders DOC certified pilot badge', () => {
    render(<DronePage />)
    expect(screen.getByText(/DOC Certified/i)).toBeInTheDocument()
  })

  it('renders both services', () => {
    render(<DronePage />)
    expect(screen.getByText('Real Estate Photography')).toBeInTheDocument()
    expect(screen.getByText('Indoor 360° Mapping')).toBeInTheDocument()
  })

  it('renders equipment tags', () => {
    render(<DronePage />)
    expect(screen.getByText('Mavic 4 Pro')).toBeInTheDocument()
    expect(screen.getByText('Insta360')).toBeInTheDocument()
  })

  it('renders back link to home', () => {
    render(<DronePage />)
    const back = screen.getByRole('link', { name: /back|dominik|home/i })
    expect(back).toHaveAttribute('href', '/')
  })

  it('renders contact links', () => {
    render(<DronePage />)
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
  })
})
