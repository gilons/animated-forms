import {Formik} from 'formik';
import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {object, ref, string} from 'yup';
import AuthLayout from '../components/AuthLayout';
import styles from '../services/auth_styles';

export default function Register(props) {
  const {navigation} = props;
  const validationSchema = object().shape({
    first_name: string().required().label('First Name'),
    last_name: string().required().label('Last Name'),
    email: string().email().required().label('Email'),
    password: string().required().min(8).label('Password'),
    password_confirmation: string().oneOf(
      [ref('password'), null],
      'Passwords must match',
    ).label('Password Confirmation'),
  });
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  function navigateToLogin(){
	  navigation.navigate('login')
  }

  function onSubmitForm(values, actions) {
    console.warn(values);
  }
  return (
    <View>
      <AuthLayout maxHeight={300} goBack={navigation.goBack} title={'Register'}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitForm}
          validationSchema={validationSchema}>
          {(formProps) => (
            <React.Fragment>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={'First Name'}
                  onChangeText={formProps.handleChange('first_name')}
                  value={formProps.values['first_name']}
                />
                <Text style={styles.error}>
                  {formProps.errors['first_name']}
                </Text>
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={'Last Name'}
                  onChangeText={formProps.handleChange('last_name')}
                  value={formProps.values['last_name']}
                />
                <Text style={styles.error}>
                  {formProps.errors['last_name']}
                </Text>
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={'Your Email'}
                  onChangeText={formProps.handleChange('email')}
                  value={formProps.values['email']}
                />
                <Text style={styles.error}>{formProps.errors['email']}</Text>
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={'Password'}
                  secureTextEntry
                  onChangeText={formProps.handleChange('password')}
                  value={formProps.values['password']}
                />
                <Text style={styles.error}>{formProps.errors['password']}</Text>
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  placeholder={'Confirm Password'}
                  onChangeText={formProps.handleChange('password_confirmation')}
                  value={formProps.values['password_confirmation']}
                />
                <Text style={styles.error}>
                  {formProps.errors['password_confirmation']}
                </Text>
              </View>
              <View style={styles.actionsContainer}>
                <View style={styles.extraText}>
                  <Text>{'Already have an account ? '}</Text>
                  <TouchableOpacity onPress={navigateToLogin} style={styles.loginTextContainer}>
                    <Text style={styles.loginText}>{'Login'}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={formProps.submitForm}
                  style={styles.button}>
                  <Text style={styles.buttonText}>{'Register'}</Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}
        </Formik>
      </AuthLayout>
    </View>
  );
}
