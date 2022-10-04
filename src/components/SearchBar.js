import React from 'react' ;
import { View, StyleSheet, TextInput } from 'react-native' ;

const SearchBar = ({term, searchTermChanges}) =>
{
    return <View style={styles.container}>
        <TextInput
            style = {styles.textInputContainer}
            autoCapitalize = 'none'
            autoCorrect = {false}
            placeholder = 'Delhi, Mumbai, London...'
            value = {term}
            onChangeText = {updatedText => searchTermChanges(updatedText)}
        />
    </View>
}

const styles = StyleSheet.create({
    container:
    {
        height: 50,
        marginTop: 35,
        marginBottom: 20,
        marginHorizontal: 10,
        borderRadius: 12,
        borderColor: '#26b3ff',
        borderWidth: 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInputContainer: {
        flex: 1,
        marginHorizontal: 15,
        fontSize: 16
    }
}) ;

export default SearchBar ;