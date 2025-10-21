import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../../src/components/common/Button';

describe('ApplyButton', () => {
  it('should render with default title and handle press', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress} />);

    expect(getByText('Apply')).toBeTruthy();
    fireEvent.press(getByText('Apply'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should render with custom title', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button title="Save Changes" onPress={onPress} />,
    );

    expect(getByText('Save Changes')).toBeTruthy();
  });

  it('should not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button onPress={onPress} disabled={true} />,
    );

    fireEvent.press(getByText('Apply'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
