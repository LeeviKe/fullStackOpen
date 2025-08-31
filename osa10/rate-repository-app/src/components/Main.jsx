/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dadadaff',
    height: '100%',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reviewform" element={<ReviewForm />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="repository/:id" element={<SingleRepository />} />
      </Routes>
    </View>
  );
};

export default Main;
