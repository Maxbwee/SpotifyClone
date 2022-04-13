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
            <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 24  }}>Welcome to spotify!</Text>
            
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
        height:90,
        marginBottom: 170
      },
  });