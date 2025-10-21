import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PinStyleItem from '../../../src/components/common/PinStyleItem';

describe('PinStyleItem', () => {
  it('should render pin style name and call onSelect', () => {
    const onSelect = jest.fn();
    const { getByText } = render(
      <PinStyleItem
        id="red"
        name="Red Pin"
        icon="location-pin"
        selected={false}
        onSelect={onSelect}
      />,
    );

    expect(getByText('Red Pin')).toBeTruthy();
    fireEvent.press(getByText('Red Pin'));
    expect(onSelect).toHaveBeenCalledWith('red');
  });

  it('should render in selected state', () => {
    const { getByText } = render(
      <PinStyleItem
        id="blue"
        name="Blue Pin"
        icon="location-pin"
        selected={true}
      />,
    );

    expect(getByText('Blue Pin')).toBeTruthy();
  });
});
