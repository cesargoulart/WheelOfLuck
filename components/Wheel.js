import React from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';
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
    outputRange: ['0deg', '1440deg'], // Spin 4 full rotations
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
          <View 
            key={i} 
            style={[
              styles.segment,
              {
                transform: [
                  { rotate: `${i * 90}deg` }
                ],
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][i]
              }
            ]}
          >
            <Text style={[styles.text, { transform: [{ rotate: `${-i * 90}deg` }] }]}>
              {i + 1}
            </Text>
          </View>
        ))}
      </Animated.View>
      <TouchableOpacity 
        style={styles.button}
        onPress={spin}
      >
        <Text style={styles.buttonText}>SPIN!</Text>
      </TouchableOpacity>
      <Text style={styles.resultText}>Result: {position + 1}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  wheel: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: '#333',
    position: 'relative',
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
  segment: {
    position: 'absolute',
    width: '50%',
    height: '50%',
    left: '50%',
    top: 0,
    transformOrigin: '0% 100%',
    borderWidth: 1,
    borderColor: '#333',
  },
  text: {
    position: 'absolute',
    left: '40%',
    top: '40%',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '500',
  }
});

export default Wheel;
