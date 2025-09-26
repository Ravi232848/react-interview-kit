import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

const paginationProps = {
      totalCount: 100,
      itemPerPage: 15,
      currentPage: 1,
      setCurrentPage: jest.fn(),
    };

describe('Pagination Component', () => {
  
  test('render number of page buttons', () => {
    render(<Pagination {...paginationProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  test('disables previous button on first page', () => {
     render(<Pagination {...paginationProps}  currentPage={1}  />);
    expect(screen.getByLabelText('Previous')).toBeDisabled();
  });

  test('disables next button on last page', () => {
     render(<Pagination {...paginationProps} currentPage={15} />);
    expect(screen.getByLabelText('Next')).toBeDisabled();
  });

  test('calls setCurrentPage when a page is clicked', () => {
     render(<Pagination {...paginationProps} />);
    const setCurrentPage  = paginationProps.setCurrentPage;
    fireEvent.click(screen.getByText('3'));
    expect(setCurrentPage).toHaveBeenCalledWith(6);
  });

  test('does not call setCurrentPage when ellipsis is clicked', () => {
     render(<Pagination {...paginationProps} />);
    const setCurrentPage  = paginationProps.setCurrentPage;
    fireEvent.click(screen.getAllByText('...')[0]);
    expect(setCurrentPage).not.toHaveBeenCalled();
  });
});