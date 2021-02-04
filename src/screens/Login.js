import { Formik } from 'formik';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { object, string } from 'yup';
import AuthLayout from '../components/AuthLayout';
import styles from '../services/auth_styles';

export default function Login(props){
    const { navigation } = props;
    const validationSchema = object().shape({
        email: string().email().required().label('Email'),
        password: string().required().min(8).label('Password'),
    });
    const initialValues = {
        email: '',
        password: '',
    };

    function navigateToRegister() {
        navigation.navigate('register')
    }

    function navigateToForgotPassword(){
        navigation.navigate('forgot-password')
    }

    function onSubmitForm(values, actions) {
        console.warn(values);
    }
    return <View>
            <AuthLayout maxHeight={500} goBack={navigation.goBack} title={'Login'}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmitForm}
                    validationSchema={validationSchema}>
                    {(formProps) => (
                        <React.Fragment>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'Your Email'}
                                    onChangeText={formProps.handleChange('email')}
                                    value={formProps.values['email']}
                                />
                                <Text style={styles.error}>
                                    {formProps.errors['email']}
                                </Text>
                            </View>
                            <View>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'Password'}
                                    secureTextEntry
                                    onChangeText={formProps.handleChange('password')}
                                    value={formProps.values['password']}
                                />
                                <Text style={styles.error}>
                                    {formProps.errors['password']}
                                </Text>
                            </View>
                        <View style={styles.actionsContainer}>
                            <View style={styles.extraText}>
                                <Text>{'No account Yet? '}</Text>
                                <TouchableOpacity onPress={navigateToRegister} style={styles.loginTextContainer}>
                                    <Text style={styles.loginText}>{'Register'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.extraText}>
                                <Text>{'Forgot your password? '}</Text>
                                <TouchableOpacity onPress={navigateToForgotPassword} style={styles.loginTextContainer}>
                                    <Text style={styles.loginText}>{'Reset it'}</Text>
                                </TouchableOpacity>
                            </View>
                                <TouchableOpacity onPress={formProps.submitForm} style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        {'Login'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>
                    )}
                </Formik>
            </AuthLayout>
    </View>
}