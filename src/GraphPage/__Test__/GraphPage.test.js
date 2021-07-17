import {
  act, render, screen, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GraphPage from '../GraphPage';
import ExtraSong from '../Components/ExtraSong';
import AppContextProvider from '../../Context/Context';
import TestRenderer from 'react-test-renderer';

describe('My GraphPage', () => {
  const callback = jest.fn();
  const tally = [{ song: ['20-11-1990'] }];
  const isLoaded = true;
  test('non-shallow render', () => {
    // eslint-disable-next-line new-cap
    const element = new TestRenderer.create(
      <AppContextProvider value={{ tally, isLoaded }}>
        <GraphPage />
      </AppContextProvider>,
    );
    expect(element.toJSON()).toMatchSnapshot();
  });

  it('should return string ready for the API', () => {
    const form = render(<ExtraSong value="" search={callback} />);
    fireEvent.change(form.getByTestId('song'), {
      target: { value: 'truckin' },
    });
    act(() => {
      userEvent.click(screen.getByRole('button'));
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith({ song: 'truckin' });
  });

  //   it('should show an altered name', () => {
  //     //await screen.findByText(/Signed in as/);
  //     render(<NameDisplay name={'Slim Shady'} setName={() => {}}/>);
  //     expect(screen.queryByText(/Searches for Slim Shady/)).toBeNull();

  //     userEvent.type(screen.getByRole('textbox'), 'Slim Shady');

  //     expect(
  //       screen.getByText(/my name is Slim Shady/),
  //     ).toBeInTheDocument();
  // });
});
