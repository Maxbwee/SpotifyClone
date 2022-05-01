import  {useState, useEffect} from 'react'
import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Alert, Button, Image } from 'react-native'
import {ResponseType, useAuthRequest,  makeRedirectUri} from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage';
import spotifylogin from '../assets/SpotifyLogin1.png';


const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',      
};

export default function Login() {
    
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
            'playlist-modify-public ',
            'user-read-email'
        ],
        // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
        // this must be set to false
        usePKCE: false,
        // Androidilla pitää käyttää omaa exp:// ip osoitetta.
        redirectUri: 'exp://192.168.1.4:19000'

    }, 
        discovery
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
           
            const { access_token } = response.params;
             console.log('accessToken', access_token.toString())
            // save code to local storage
            // Käytetään setToken(access_token) niin toimii login sivulla getplaylist
            storeData(access_token)
        }
    }, [response])

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
