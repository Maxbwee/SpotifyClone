import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native'
import { useTheme } from '@react-navigation/native';
import  AsyncStorage  from '@react-native-async-storage/async-storage';



export default function SpotifyGetPlaylist() {
   
    // Variables for the functiom
    const { colors } = useTheme();
    const [token, setToken] = useState('');
    const [data, setData] = useState([]);
    
    // This is used to get the access token when the user opens this tab 
    React.useEffect(() => {
        getData();
    }, []);

    // Gets the users access token from local storage
   const getData = async() => {
           setToken (await AsyncStorage.getItem('@access_token'));
            console.log("token retrieved")
    }

    // Using handleGetPlaylists we are able to fetch a users publicly shown playlists
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
            // Mapping the results to an array of the fetch 
            // to get the name of the playlist and the user who created the playlist
            data.items.map(obj => result.push({title: [obj.name, obj.owner.display_name]}));
            setData(result);
            console.log(result);
        });
    }
    // This is the render item used in the FlatList component to show playlist name and user who created the playlist
    const item = ({item}) => {
        return( 
            <View style={styles.item}>
                <Text style={styles.playlists}>{item.title[0]}</Text>
                <Text style={styles.user}>{item.title[1]}</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Playlists</Text>
            <Text style={styles.playlistname}>Playlist names:</Text>
            <Text style={styles.username}>Created by:</Text>
            <FlatList
            data={data}
            renderItem={item}
            keyExtractor={item => item.title[0] + item.title[1]}
            />
            <TouchableOpacity
            style={styles.button2}
            color="#1DB954"
            title="PlaylistGet"
            onPress={() => {
                handleGetPlaylists();
            }}
            > 
            <Text style={styles.buttontext}>Get your playlists</Text>
            </TouchableOpacity>
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
    button2: {
        backgroundColor: '#1DB954',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
        marginBottom: 60,
        marginTop: 50,
        width: 200,
        padding: 20,
        borderRadius:20
    },
    buttontext: {
        color: 'white',
        fontSize: 16,
    },
    playlistname:{
        color: 'white',
        fontSize: 20,
        right: 100
    },
    username:{
        color: 'white',
        fontSize: 20,
        left: 100,
        marginBottom: 10,
        marginVertical: -25
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        marginVertical: 3,
        alignItems: 'center',
        color:'white',
        marginTop: 25
      },
      playlists: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
      },
      user:{
        fontSize: 16,
        color:'white',
        marginLeft: 50
        
      },
      heading: {
          fontSize: 26,
          color: 'white',
          fontWeight: 'bold',
          paddingBottom: 50,
          right: 120,
      }
  });