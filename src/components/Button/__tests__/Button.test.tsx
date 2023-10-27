import React from 'react';
import {StyleSheet} from 'react-native';

import {render, fireEvent, screen} from 'test-utils';

import {theme} from '@theme';

import {Button, ButtonProps} from '../Button';

function renderComponent(props?: Partial<ButtonProps>) {
  render(<Button title="Teste" {...props} />);

  const titleElement = screen.queryByText(/teste/i);
  const buttonElement = screen.getByTestId('button');
  const loadingElement = screen.queryByTestId('activity-indicator'); // using queryByTestId because this component may not be showed

  return {
    titleElement,
    buttonElement,
    loadingElement,
  };
}
describe('<Button />', () => {
  test('call the onPress function when it is pressed', () => {
    const mockedOnPress = jest.fn();
    const {titleElement, loadingElement} = renderComponent({
      onPress: mockedOnPress,
    });

    fireEvent.press(titleElement!);

    expect(mockedOnPress).toHaveBeenCalled();
    expect(loadingElement).toBeFalsy();
  });
  test('does not call the onPress function when it is disabled', () => {
    const mockedOnPress = jest.fn();
    const {titleElement} = renderComponent({
      onPress: mockedOnPress,
      disabled: true,
    });

    fireEvent.press(titleElement!);

    expect(mockedOnPress).not.toHaveBeenCalled();
  });
  test('the title should be gray if button is disabled', () => {
    const {titleElement} = renderComponent({
      disabled: true,
    });

    const titleStyle = StyleSheet.flatten(titleElement!.props.style);

    expect(titleStyle.color).toEqual(theme.colors.gray2);
  });

  describe('when button is loading', () => {
    test('shows activity indicator', () => {
      const {loadingElement} = renderComponent({loading: true});

      expect(loadingElement).toBeTruthy();
    });
    test('hides button title', () => {
      const {titleElement} = renderComponent({loading: true});

      expect(titleElement).toBeFalsy();
    });
    test('disabled onPress function', () => {
      const mockedOnPress = jest.fn();
      const {buttonElement} = renderComponent({loading: true});

      fireEvent.press(buttonElement);

      expect(mockedOnPress).not.toHaveBeenCalled();
    });
  });
});
