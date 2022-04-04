import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Button, Alert} from 'react-native'
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SpotifyGetPlaylist() {
   
    const { colors } = useTheme();
    
    const [token, setToken] = useState('');
    const [data, setData] = useState({});
    
    // useEffect(() => {
    //     if (AsyncStorage.getItem('@access_token')) {
    //         setToken(AsyncStorage.getItem('@access_token'));
    //     }
    // }, []);

    readData = async() => {
        try {
            setToken = await AsyncStorage.getItem("@access_token");

        } catch (error) {
            Alert.alert('Error reading data');
        }
    }

    const handleGetPlaylists = () => {
        console.log(handleGetPlaylists)
        axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            
        }).then(response => {
            setData(response.data);
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