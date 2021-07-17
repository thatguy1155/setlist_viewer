import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import ErrorPage from './ErrorPage';

describe('My SearchPage', () => {
  const component = renderer.create(
    <Router>
      <ErrorPage />
    </Router>,
  );

  it('should render the Search Page', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
