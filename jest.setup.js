import '@testing-library/jest-native/extend-expect';

// Mock react-native-sensors
jest.mock('react-native-sensors', () => ({
  accelerometer: {
    subscribe: jest.fn(() => ({
      unsubscribe: jest.fn(),
    })),
  },
}));

// Mock react-native
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  return {
    ...rn,
    NativeModules: {
      ...rn.NativeModules,
      Sound: {
        setCategory: jest.fn(),
        setMode: jest.fn(),
        setActive: jest.fn(),
      },
    },
  };
}); 