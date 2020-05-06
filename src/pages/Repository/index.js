import React from 'react';
import { WebView } from 'react-native-webview';

const Repository = ({ navigation }) => {
  const repository = navigation.getParam('repository');

  return <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />;
};

export default Repository;
