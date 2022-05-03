import  {useState, useEffect} from 'react'
import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Alert, Button, Image } from 'react-native'
import {ResponseType, useAuthRequest,  makeRedirectUri} from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage';
import spotifylogin from '../assets/SpotifyLogin1.png';
import {CLIENT_ID, CLIENT_SECRET} from '@env'


const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',      
};

export default function Login() {
    
    // OAUTH2 for Spotify
    const [request, response, promptAsync] = useAuthRequest({
        responseType: ResponseType.Token,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        scopes: [
            'user-read-currently-playing',
            'user-read-recently-played',
            'user-read-playback-state',
            'playlist-read-collaborative',
            'user-top-read',
            // Using this for the demo to show the login
            // 'playlist-read-private',
            'user-modify-playback-state',
            'streaming',
            'playlist-modify-public ',
            'user-read-email'
        ],
        // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
        // this must be set to false
        usePKCE: false,
        // You need to use your own exp:// address on Android.
        redirectUri: 'exp://192.168.1.4:19000'

    }, 
        discovery
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
           
            const { access_token } = response.params;
            // To see if the access token saved properly in the console
            console.log('accessToken', access_token.toString())
            // Save code to local storage
            // Use setToken(access_token) to get getplaylist to show on the login page
            // The above mentioned was used during early development stages. No longer has a use
            storeData(access_token)
        }
    }, [response])

    // Storing the access token with Async Storage
    const storeData = async(access_token) => {
        try {
            await AsyncStorage.setItem('@access_token', access_token.toString())
            console.log("access token saved")
        } catch (e) {
            console.log('Erorr', e);
        }
    }
   
    return (
        <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
            <Image 
                source={spotifylogin}
                resizeMode="contain"
                style={styles.image}
            />
            <View>
            <Text style={{color: 'white', marginBottom: 100, fontSize: 20, fontWeight: 'bold'}}>Login with Spotify to access your data!</Text>
            </View>
            <TouchableOpacity
            style={styles.button2}
            color="#1DB954"
            disabled={!request}
            title="Login"
            onPress={() => {
                promptAsync();
            }}
            > 
            <Text style={styles.textstyle}>Login with Spotify</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    loginbtn: {
        backgroundColor: '#1DB954',
        width: 100, 
        padding: 50,
    },
    button2: {
        backgroundColor: '#1DB954',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 200,
        width: 200,
        padding: 20,
        borderRadius:20
    },
    textstyle: {
        color: 'white',
        fontSize: 16,
    },  
    image: {
        justifyContent: "center",
        width:400,
        height:200,
        marginTop: 100,
      },
  });
