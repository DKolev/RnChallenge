import React from 'react';
import { render } from '@testing-library/react-native';
import CustomMarker from '../../../src/components/common/CustomMarker';
import { mockPins } from '../../mocks/mockData';

describe('CustomMarker', () => {
  it('should render with coordinate', () => {
    const { root } = render(
      <CustomMarker
        coordinate={{ latitude: mockPins[1].latitude, longitude: mockPins[1].longitude }} 
      />,
    );
    expect(root).toBeTruthy();
  });

  it('should render with custom size', () => {
    const { root } = render(
      <CustomMarker
        coordinate={{ latitude: mockPins[1].latitude, longitude: mockPins[1].longitude }}
        size={40}
      />,
    );
    expect(root).toBeTruthy();
  });
});
