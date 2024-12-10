import React from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { spinWheel } from '../src/redux/wheelSlice';

const Wheel = () => {
  const dispatch = useDispatch();
  const position = useSelector((state) => state.wheel.position);
  const spinValue = new Animated.Value(0);

  const spin = () => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      spinValue.setValue(0);
      dispatch(spinWheel());
    });
  };

  const spinInterpolation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...styles.wheel,
          transform: [{ rotate: spinInterpolation }],
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={styles.segment}>
            <Text style={styles.text}>Segment {i + 1}</Text>
          </View>
        ))}
      </Animated.View>
      <Text>Current Position: {position}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wheel: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  segment: {
    position: 'absolute',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default Wheel;
