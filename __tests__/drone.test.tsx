import { render, screen } from '@testing-library/react'
import DronePage from '@/app/drone/page'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

describe('Drone page', () => {
  it('renders the main headline', () => {
    render(<DronePage />)
    expect(screen.getByText('Professional Drone Photography')).toBeInTheDocument()
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
})
