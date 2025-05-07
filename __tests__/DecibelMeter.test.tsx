import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DecibelMeter from '../src/components/DecibelMeter';

describe('DecibelMeter Component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<DecibelMeter />);
    expect(getByTestId('decibel-meter')).toBeTruthy();
  });

  it('displays initial decibel reading', () => {
    const { getByTestId } = render(<DecibelMeter />);
    const reading = getByTestId('decibel-reading');
    expect(reading).toBeTruthy();
  });

  it('updates reading when sound level changes', () => {
    const { getByTestId } = render(<DecibelMeter />);
    const reading = getByTestId('decibel-reading');
    // Simulate sound level change
    fireEvent(reading, 'onChange', { nativeEvent: { value: 75 } });
    expect(reading.props.value).toBe(75);
  });
}); 