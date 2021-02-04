import {Formik} from 'formik';
import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {object, ref, string} from 'yup';
import AuthLayout from '../components/AuthLayout';
import styles from '../services/auth_styles';

export default function ChangePassword(props) {
  const {navigation} = props;
  const validationSchema = object().shape({
    old_password: string().required().min(8).label('Password'),
    password: string().required().min(8).label('New Password'),
    password_confirmation: string()
      .oneOf([ref('password'), null], 'Passwords must match')
      .label('New Password Confirmation'),
  });
  const initialValues = {
    old_password: '',
    password: '',
    password_confirmation: '',
  };

  function onSubmitForm(values, actions) {
    console.warn(values);
  }
  const title = 'Change Password';
  return (
    <View>
      <AuthLayout maxHeight={470} goBack={navigation.goBack} title={title}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitForm}
          validationSchema={validationSchema}>
          {(formProps) => (
            <React.Fragment>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={'Password'}
                  secureTextEntry
                  onChangeText={formProps.handleChange('old_password')}
                  value={formProps.values['old_password']}
                />
                <Text style={styles.error}>
                  {formProps.errors['old_password']}
                </Text>
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={'New Password'}
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
                  placeholder={'Confirm New Password'}
                  onChangeText={formProps.handleChange('password_confirmation')}
                  value={formProps.values['password_confirmation']}
                />
                <Text style={styles.error}>
                  {formProps.errors['password_confirmation']}
                </Text>
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
