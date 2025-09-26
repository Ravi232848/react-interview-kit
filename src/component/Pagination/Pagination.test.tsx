import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

const paginationProps = {
      totalCount: 150,
      itemPerPage: 15,
      currentPage: 1,
      setCurrentPage: jest.fn(),
    };

describe('Pagination Component', () => {
  
  test('render number of page buttons', () => {
    render(<Pagination {...paginationProps} />);
    expect(screen.getByText((content) => /^1$/.test(content))).toBeInTheDocument();
    expect(screen.getByText((content) => /^...$/.test(content))).toBeInTheDocument();
    expect(screen.getByText((content) => /^10$/.test(content))).toBeInTheDocument();
  });

  test('disables previous button on first page', () => {
     render(<Pagination {...paginationProps}  currentPage={1}  />);
     expect(screen.getByRole('button', {name: /Previous/i})).toBeDisabled();
  });

  test('disables next button on last page', () => {
     render(<Pagination {...paginationProps} currentPage={15} />);
    expect(screen.getByRole('button', {name: /next/i})
).toBeDisabled();
  });

  test('calls setCurrentPage when a page is clicked', () => {
     render(<Pagination {...paginationProps} />);
    const setCurrentPage  = paginationProps.setCurrentPage;
    fireEvent.click(screen.getByRole('button', {name: /3/i}));
    expect(setCurrentPage).toHaveBeenCalledWith(3);
  });

  test('does not call setCurrentPage when ellipsis is clicked', () => {
     render(<Pagination {...paginationProps} />);
    const setCurrentPage  = paginationProps.setCurrentPage;
    fireEvent.click(screen.getByText((content) => /^...$/.test(content)))
    expect(setCurrentPage).not.toHaveBeenCalled();
  });
});