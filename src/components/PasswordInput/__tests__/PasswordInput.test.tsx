import React from 'react';

import {fireEvent, render, screen} from 'test-utils';

import {PasswordInput, IconProps} from '@components';

describe('<PasswordInput />', () => {
  test('starts with hidden password', () => {
    const mockedOnChange = jest.fn();
    render(
      <PasswordInput
        label="Password"
        value="123456"
        placeholder="password"
        onChangeText={mockedOnChange}
      />,
    );

    const inputElement = screen.getByPlaceholderText(/password/);

    expect(inputElement.props.secureTextEntry).toBeTruthy();
  });
  test('when pressing the eye icon, it should shows the password, and change to the eye off icon', () => {
    const mockedOnChange = jest.fn();
    render(
      <PasswordInput
        label="Password"
        value="123456"
        placeholder="password"
        onChangeText={mockedOnChange}
      />,
    );

    const eyeOffIcon: IconProps['name'] = 'eyeOff';
    fireEvent.press(screen.getByTestId(eyeOffIcon));

    const eyeIcon: IconProps['name'] = 'eyeOn';
    const eyeIconElement = screen.getByTestId(eyeIcon);

    expect(eyeIconElement).toBeTruthy();

    const inputElement = screen.getByPlaceholderText(/password/);
    expect(inputElement.props.secureTextEntry).toBeFalsy();
  });
});
