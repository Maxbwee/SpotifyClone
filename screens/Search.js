import React from 'react'
import { StyleSheet, View, Text} from 'react-native'
import { useTheme } from '@react-navigation/native';
import SpotifySearchTrack from '../components/SpotifySearchTrack';

export default function Search() {

    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <SpotifySearchTrack/>
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