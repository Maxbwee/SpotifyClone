import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { useTheme } from '@react-navigation/native';
import SpotifyGetPlaylist from '../components/SpotifyGetPlaylist';

export default function Library() {
   
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <SpotifyGetPlaylist/>
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