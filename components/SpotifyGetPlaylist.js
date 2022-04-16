import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Button, Alert, FlatList, TouchableOpacity} from 'react-native'
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
            console.log(data)
        })
        .catch((error) => {
            console.log(error);
        });
    };
    
    const renderItem = ({item}) =>{
        <Item title={item.name} />
    }

    
    return (
        <View style={styles.container}>
            <Button onPress={handleGetPlaylists} color="#1DB954" style={{ color: colors.text, width: 100 }} title="Get your playlists"/>
            <FlatList
            data={data.name}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            />
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 200,
    },
  });