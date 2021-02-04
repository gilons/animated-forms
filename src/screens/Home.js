import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Home(props) {
  const {navigation} = props;
  function navigateToLogin() {
    navigation.navigate('login');
  }

  function navigateToRegister() {
    navigation.navigate('register');
  }
  function navigateToChangePassword(){
      navigation.navigate('change-password')
  }
  return (
    <View style={styles.mainContainer}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <TouchableOpacity onPress={navigateToRegister} style={styles.button}>
        <Text style={styles.buttonText}>{'Register'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToLogin} style={styles.button}>
        <Text style={styles.buttonText}>{'Login'}</Text>
      </TouchableOpacity>
          <TouchableOpacity onPress={navigateToChangePassword} style={styles.button}>
              <Text style={styles.buttonText}>{'Change Password'}</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    minWidth: 100,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: 'black',
    shadowOpacity: 3,
    shadowRadius: 3,
    backgroundColor: 'white',
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    includeFontPadding: true,
  },
});
