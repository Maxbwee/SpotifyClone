import React from 'react'
import { StyleSheet, View, Text} from 'react-native'
import { useTheme } from '@react-navigation/native';

export default function Search() {

    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={{ color: colors.text }}>Search screen!</Text>
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