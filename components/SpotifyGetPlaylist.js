import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Button, Alert, FlatList, TouchableOpacity, Item} from 'react-native'
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import  AsyncStorage  from '@react-native-async-storage/async-storage';



export default function SpotifyGetPlaylist() {
   
    const { colors } = useTheme();
    const [token, setToken] = useState('');
    const [data, setData] = useState([]);
    
    React.useEffect(() => {
        getData();
    }, []);

   const getData = async() => {
           setToken (await AsyncStorage.getItem('@access_token'));
            console.log("token retrieved")
    }


    let playlistSearchApi = 'https://api.spotify.com/v1/me/playlists';
    const handleGetPlaylists = () => {
        fetch(playlistSearchApi, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
          })
          .then(res => res.json())
          .then(data => {
            let result = [];
            console.log(data)
            data.items.map(obj => result.push({title: [obj.name]}));
            setData(result);
            console.log(result);
        });
    }
    const item = ({item}) => {
        return( 
            <View style={styles.item}>
                <Text style={styles.playlistname}>{item.title}</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Playlists</Text>
            <Button onPress={handleGetPlaylists} color="#1DB954" style={{width: 100}} title="Get your playlists"/>
            <FlatList
            data={data}
            renderItem={item}
            keyExtractor={item => item.title[1]}
            />
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    item: {
        flexDirection: 'row',
        padding: 5,
        marginVertical: 2,
        alignItems: 'center',
        color:'white',
        marginTop: 20
      },
      playlistname: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
      },
      heading: {
          fontSize: 26,
          color: 'white',
          fontWeight: 'bold',
          paddingBottom: 50,
          right: 120,
      }
  });