import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import {ResponseType, useAuthRequest,  makeRedirectUri} from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';


const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',      
};

export default function Login() {
    
    const redirecturlIOS =
    makeRedirectUri({
        preferLocalhost: true
    })
    
    const redirecturlANDROID =
    AuthSession.makeRedirectUri({})


    // OAUTH2 for Spotify
    const [request, response, promptAsync] = useAuthRequest({
        responseType: ResponseType.Token,
        clientId: '6243b86671b0424482795fd9f008d9a1',
        clientSecret: '30eb18e60f9849c48f36569166ae40af',
        scopes: [
            'user-read-currently-playing',
            'user-read-recently-played',
            'user-read-playback-state',
            'user-top-read',
            'user-modify-playback-state',
            'streaming',
            'user-read-email',
            'user-read-private'
        ],
        // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
        // this must be set to false
        usePKCE: false,
        redirectUri: 'exp://192.168.1.8:19000'

    }, 
        discovery
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { access_token } = response.params;
            console.log('accessToken', access_token)
            storeData(access_token)
        }
    }, [response])

    const storeData = async(token = string) => {
        try {
            await AsyncStorage.setItem('@access_token', token)
        } catch(e) {
            console.log('Error', e);
        }
    }

    return (
        <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => promptAsync()}>
            <View style={styles.loginbtn}>
            <Text>Login</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    loginbtn: {
        backgroundColor: 'green',
        width: 300, 
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
  });