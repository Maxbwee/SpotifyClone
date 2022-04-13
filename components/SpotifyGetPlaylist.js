import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Button, Alert} from 'react-native'
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

const apiPrefix = 'https://api.spotify.com/v1';

export default function SpotifyGetPlaylist(props) {
   
    const { colors } = useTheme();
    
    const [token, setToken] = useState('');
    const [data, setData] = useState({});
    
    React.useEffect(() => {
        getData();
    }, []);

   const getData = async() => {
           setToken (await AsyncStorage.getItem('@access_token'));
            console.log("token retrieved")
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
        <View style={styles.container}>
            <Button onPress={handleGetPlaylists} color="#1DB954" style={{ color: colors.text, width: 100, height: 70, }} title="Get your playlists"/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      alignItems: 'center',
      justifyContent: 'center',
    },
  });