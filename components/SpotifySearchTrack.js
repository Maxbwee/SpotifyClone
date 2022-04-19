import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';





export default function SpotifySearchTrack() {

    const { colors } = useTheme();
    
    const [text, setText] = useState('');
    const [search , setSearch] = useState([]);
    const [token, setToken] = useState('');

    React.useEffect(() => {
        getData();
    }, []);

   const getData = async() => {
        setToken (await AsyncStorage.getItem('@access_token'));
        console.log("token retrieved")
    }

    const onChange = (text) => {
        setText(text)
        if (text.length <= 0 ) {
            setSearch([]);
            return;
        }
    }

    const item = ({ item, onSelect, }) => {
      return (
        
          <View style={styles.item}>
            <Image source={{ width: 64, height: 64, uri: item.title[0]}}/>
            <View style={styles.names}>
            <Text style={styles.songname}>{item.title[1]}</Text>
              <Text style={styles.artist}>{ item.title[2].map(artist => artist.name).join(', ')}</Text>
            </View>
          </View>
        
      );
    };    

    let apiSearch = 'https://api.spotify.com/v1/search?q='; 
    apiSearch += encodeURI(text) + '&type=track';
    fetch(apiSearch, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      .then(res => res.json())
      .then(data => {
        let result = [];
        // Tällä saadaan biisin kuvake, nimi ja artistin nimi haettua
        data.tracks.items.map(obj => result.push({title: [obj.album.images[2].url, obj.name, obj.artists]}));
        setSearch(result);
        
      });
    
      


    return(
       <SafeAreaView style={styles.container}>
           <Text style={styles.title}>Search </Text>
           <View style={styles.searchbar}>
            <TextInput
            style={styles.search}
            placeholder= "Artist or song"
            placeholderTextColor={"black"}
            onChangeText= {text => onChange(text)}
            value= {text}
            selectionColor= "green"
            />
            <FlatList
            data = {search}
            keyExtractor={item => item.title[0]+item.title[1]}
            renderItem={item}
            />
           </View>
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
      },
      title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "white",
        padding: 5,
        marginTop: 50,
      },
      searchbar: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: 30,
        width: 350,
      },
      search: {
        height: 40,
        padding: 10,
        width: - 10,
      },
      names: {
        flex: 1,
        flexDirection: 'column',
      },
      songname: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        left: 10,
      },
      artist: {
        fontSize: 12,
        color: 'grey',
        fontWeight: 'bold',
        left: 10,
        marginVertical: 5,
      },
      item: {
        flexDirection: 'row',
        padding: 5,
        marginVertical: 2,
        alignItems: 'center',
        right: 10,
      },

});