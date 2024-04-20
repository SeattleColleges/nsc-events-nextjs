import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
 
describe('Page', () => {
  const queryClient = new QueryClient
  it('renders a heading', () => {
    render(
    <QueryClientProvider client={queryClient}>
      <Page />
    /</QueryClientProvider>
  )
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})