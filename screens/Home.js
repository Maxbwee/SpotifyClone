import React from 'react'
import {StyleSheet, View, Text, Image, ImageBackground} from 'react-native'
import { useTheme } from '@react-navigation/native';
import SpotifyLogoSmall from '../assets/SpotifyLogo.png';

export default function Home() {
    const { colors } = useTheme();

    return (
        
        <View style={styles.container}>
            <Image 
                source={SpotifyLogoSmall}
                resizeMode="contain"
                style={styles.image}
            >
            </Image>
            <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 26  }}>Welcome to spotify!</Text>
            <Text style={{ color: colors.text, fontSize: 16, marginTop: 20}}>Head over to the login page to start exploring</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 300
    },
    image: {
        flex:1,
        justifyContent: "center",
        width:300,
        height:100,
        marginBottom: 170
      },
  });