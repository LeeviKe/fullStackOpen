/* eslint-disable no-unused-vars */
import { TextInput, Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  form: {
    margin: 15,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 11,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInContainer = ({
  values,
  errors,
  touched,
  handleChange,
  handleSubmit,
}) => (
  <View style={styles.container}>
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={values.username}
        onChangeText={handleChange('username')}
      />
      {touched.username && errors.username && (
        <Text style={{ color: '#d73a4a' }}>{errors.username}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={values.password}
        onChangeText={handleChange('password')}
      />
      {touched.password && errors.password && (
        <Text style={{ color: '#d73a4a' }}>{errors.password}</Text>
      )}

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  </View>
);

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  console.log('formik values:', formik.values);

  return <SignInContainer {...formik} />;
};

export default SignIn;
