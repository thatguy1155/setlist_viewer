import {
  act, render, screen, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import SearchForm from '../Components/SearchForm';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

describe('My SearchPage', () => {
  const callback = jest.fn();
  const history = createMemoryHistory();
  history.push('/');
  const component = renderer.create(
    <Router>
      <SearchForm artistName="" search={callback} />
    </Router>,
  );

  it('should render the Search Page', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  // it('asks to seach for artist', () => {
  //   // await screen.findByText(/Signed in as/);
  //   render(<SearchPage artistName="" search={callback} />);
  //   expect(
  //     screen.getByText(/Search For An Artist/),
  //   ).toBeInTheDocument();
  // });
  // it('asks to seach for song', () => {
  //   // await screen.findByText(/Signed in as/);
  //   render(<SearchPage search={callback} />);
  //   expect(
  //     screen.getByText(/Search For An Song by Bob Dylan/),
  //   ).toBeInTheDocument();
  //   // unmount();
  // });
  it('should return string ready for the API', () => {
    const form = render(<SearchForm value="" search={callback} />);
    fireEvent.change(form.getByTestId('artist'), {
      target: { value: 'Grateful Dead' },
    });
    fireEvent.change(form.getByTestId('song'), {
      target: { value: 'truckin' },
    });
    act(() => {
      userEvent.click(screen.getByRole('button'));
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ artist: 'grateful%20dead', song: 'truckin' });
  });
});
