import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import MyEvents from '..//..//app/my-events/page';

describe('MyEvents', () => {
 
    it('does not render the title when user is not authorized', () => {
        const user = { role: 'admin' };
        const isAuth = true;
    
        render(<MyEvents />);
        const title = screen.queryByText('My Created Events');
        expect(title).not.toBeInTheDocument();
      });
  it('does not render the title when user is not authorized', () => {
    const user = { role: 'user' };
    const isAuth = true;

    render(<MyEvents />);
    const title = screen.queryByText('My Created Events');
    expect(title).not.toBeInTheDocument();
  });

  it('does not render the title when user is not logged in', () => {
    const isAuth = false;

    render(<MyEvents />);
    const title = screen.queryByText('My Created Events');
    expect(title).not.toBeInTheDocument();
  });
});