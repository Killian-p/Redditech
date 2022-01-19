import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, exchangeCodeAsync } from 'expo-auth-session';
import { Button , StyleSheet} from 'react-native';
import { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { setToken } from './StoringData';
import {StoreContext} from './../utils/Context';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
  tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
};

export default function App() {
  const { setIsAuthenticated, setTokenCreationDate } = useContext(StoreContext);
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.CLIENT_ID,
      scopes: ['identity', 'read', 'subscribe', 'account', 'mysubreddits', 'vote'],
      redirectUri: makeRedirectUri({
        useProxy: true,
      }),
      extraParams: {
        duration: "permanent"
      }
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      exchangeCodeAsync(
        {
          clientId: process.env.CLIENT_ID,
          redirectUri: makeRedirectUri({
            useProxy: true,
          }),
          code: code,
          clientSecret: process.env.CLIENT_SECRET,
          extraParams: {
            duration: "permanent"
          }
        },
        { tokenEndpoint: discovery.tokenEndpoint}
      ).then((response) => {
        setToken('isAuthenticated', true);
        setTokenCreationDate(response.issuedAt);
        setToken('tokenCreation', response.issuedAt);
        setToken('refresh_token', response.refreshToken);
        setToken('access_token', response.accessToken);
        setIsAuthenticated(true);
      });
    }
  }, [response]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync({useProxy: true});
          }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});