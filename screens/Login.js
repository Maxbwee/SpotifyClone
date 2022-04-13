import  {useState, useEffect} from 'react'
import React from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Alert, Button } from 'react-native'
import {ResponseType, useAuthRequest,  makeRedirectUri} from 'expo-auth-session'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';


const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',      
};

export default function Login(props) {
    
    const [token, setToken] = useState('');
    const [data, setData] = useState({});

    // const redirecturlIOS =

    // makeRedirectUri({
    //     preferLocalhost: true
    // })
    
    // const redirecturlANDROID =
    // AuthSession.makeRedirectUri({})


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
        redirectUri: 'exp://192.168.1.3:19000'

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
    const handleGetPlaylists = () => {
       
        
         axios.get("https://api.spotify.com/v1/me/playlists", {
             headers: {
                 Authorization: `Bearer ${token}`,
             },
             
         }).then(response => {
             setData(response.data);
             console.log(response.data)
         })
         .catch((error) => {
             console.log(error);
         });
     };

    return (
        
        <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
            <Button
            color="#1DB954"
            disabled={!request}
            title="Login"
            onPress={() => {
                promptAsync();
            }}
           /> 
           
        <TouchableOpacity onPress={handleGetPlaylists} color="#1DB954" style={styles.button2}>
        <Text>Get your playlists</Text>
        </TouchableOpacity>
       
        </View>
    
        
        
    );
}
const styles = StyleSheet.create({
    loginbtn: {
        backgroundColor: '#1DB954',
        width: 300, 
        padding: 50,
        
    },
    button2: {
        backgroundColor: '#1DB954',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        width: 200,
        padding: 20,

    }
  });
