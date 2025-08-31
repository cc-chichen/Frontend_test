import { render, screen, fireEvent } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders the main heading', () => {
    render(<App />);

    const heading = screen.getByRole('heading', {
      name: /hello react & tailwind!/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-4xl', 'font-bold');
  });

  it('renders the count button with initial value', () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /count: 0/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      'bg-sky-300',
      'px-3',
      'py-2',
      'rounded',
      'hover:bg-sky-400',
    );
  });

  it('increments count when button is clicked', () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /count: 0/i });

    fireEvent.click(button);

    expect(
      screen.getByRole('button', { name: /count: 1/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /count: 0/i }),
    ).not.toBeInTheDocument();
  });

  it('increments count multiple times', () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /count: 0/i });

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(
      screen.getByRole('button', { name: /count: 3/i }),
    ).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    render(<App />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'gap-8',
      'py-16',
      'max-w-[1280px]',
      'mx-auto',
    );
  });

  it('has accessible button', () => {
    render(<App />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAccessibleName();
  });

  it('maintains count state correctly', () => {
    render(<App />);

    const initialButton = screen.getByRole('button', { name: /count: 0/i });
    expect(initialButton).toBeInTheDocument();

    fireEvent.click(initialButton);

    const updatedButton = screen.getByRole('button', { name: /count: 1/i });
    expect(updatedButton).toBeInTheDocument();

    fireEvent.click(updatedButton);

    expect(
      screen.getByRole('button', { name: /count: 2/i }),
    ).toBeInTheDocument();
  });

  it('has correct layout structure', () => {
    render(<App />);

    const main = screen.getByRole('main');
    const heading = screen.getByRole('heading');
    const button = screen.getByRole('button');

    expect(main).toContainElement(heading);
    expect(main).toContainElement(button);

    const buttonParent = button.closest('.flex');
    expect(buttonParent).toHaveClass(
      'flex',
      'flex-row',
      'items-center',
      'gap-6',
    );
  });
});
