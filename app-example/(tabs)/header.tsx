import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 173,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100, // Ajuste conforme necessário
    height: 100, // Ajuste conforme necessário
    resizeMode: 'contain',
  },
});

export default Header;
