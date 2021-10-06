import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Screen from '../../components/Screen';
import {
  getScreenHeightProportion,
  getScreenWidthProportion,
} from '../../utils/screen';
import Field from '../../components/Field';
import Button from '../../components/Button';
import { COLORS } from '../../constants';
import Logo from '../../assets/images/logo.png';

const AuthContent = ({
  isLogin,
  submitText,
  onSubmit,
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  goToSignUpScreen,
  loading,
}) => {
  return (
    <Screen
      style={styles.container}
      innerStyle={styles.innerContainer}
      scroll={false}>
      <View style={styles.loginBox}>
        <View style={styles.imageContainer}>
          <Image source={Logo} style={styles.image} />
        </View>
        <Field
          label="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        {!isLogin && (
          <Field
            label="Name"
            value={name}
            onChangeText={setName}
            style={styles.margin}
          />
        )}
        <Field
          label="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.margin}
          secureTextEntry
          autoCapitalize="none"
        />
        <Button
          loading={loading}
          title={submitText}
          onPress={onSubmit}
          style={styles.margin}
        />
        {isLogin && (
          <Button
            title="Sign Up"
            onPress={goToSignUpScreen}
            style={styles.margin}
          />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryColor,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    borderRadius: 10,
    padding: 12,
    width: getScreenWidthProportion(0.8),
    height: getScreenHeightProportion(0.75),
    backgroundColor: '#D2D2D2',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  image: {
    width: 80,
    height: 80,
  },
  margin: {
    marginTop: 10,
  },
});

export default React.memo(AuthContent);
