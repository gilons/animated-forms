import {Formik} from 'formik';
import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {object, ref, string} from 'yup';
import AuthLayout from '../components/AuthLayout';
import styles from '../services/auth_styles';

export default function ForgotPassword(props) {
  const {navigation} = props;
  const validationSchema = object().shape({
    email: string().email().required().label('Email'),
  });

  const initialValues = {
    password: '',
    password_confirmation: '',
  };
  const title = 'Reset your password';
  function onSubmitForm(values, actions) {
    console.warn(values);
  }

  return (
    <View>
      <AuthLayout maxHeight={600} goBack={navigation.goBack} title={title}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitForm}
          validationSchema={validationSchema}>
          {(formProps) => (
            <React.Fragment>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={'Enter your email'}
                  secureTextEntry
                  onChangeText={formProps.handleChange('email')}
                  value={formProps.values['email']}
                />
                <Text style={styles.error}>{formProps.errors['email']}</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={formProps.submitForm}
                  style={styles.button}>
                  <Text style={styles.buttonText}>{title}</Text>
                </TouchableOpacity>
              </View>
            </React.Fragment>
          )}
        </Formik>
      </AuthLayout>
    </View>
  );
}
