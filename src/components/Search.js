import React from 'react';
import { useState } from 'react';
import { SearchBar } from 'react-native-elements';
import { Pressable, FlatList, SafeAreaView, StyleSheet, View, Image, Text } from 'react-native';
import { getSearchResults } from './Utils';

function flatListSeparator() {
  return (
    <View
      style={{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '5%'
      }}
    />
  )
}

function Search({navigation}) {
    const [search, setSearch] = useState('');
    const [suggestion, setSuggestion] = useState([]);

    function updateSearch(search) {
        setSearch(search);
        getSearchResults(search).then(res=>setSuggestion(res));
    }

    return (
      <SafeAreaView>
        <SearchBar style={styles.searchBar}
          placeholder="Search subreddits..."
          onChangeText={(value) => updateSearch(value)}
          value={search}
          autofocus={true}
          containerStyle={{backgroundColor: 'white',
            justifyContent: 'space-around',
            borderTopWidth:0,
            borderBottomWidth:0
          }}
          round={true}
        />
        <View style={styles.container}>
          <FlatList
            data={suggestion}
            keyExtractor={item => item.data.id}
            ItemSeparatorComponent={flatListSeparator}
            renderItem={({ item }) => (
              <Pressable onPress={() => navigation.navigate('SubredditSelected', { name: item.data.display_name_prefixed, subredditNamePrefixed: item.data.display_name_prefixed})}>
                <View style={styles.subreddit}>
                  <Image style={styles.profilImage}
                    source={{
                      uri: item.data.community_icon ?
                        item.data.community_icon.split('amp;').join('') : 
                        item.data.icon_img
                    }}/>
                  <Text style={styles.textStyle} category='s1'>{item.data.display_name}</Text>
                </View>
              </Pressable>
            )}
          />
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      paddingTop: 20,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    profilImage: {
      width: 20,
      height: 20,
      borderRadius: 20 / 2
    },
    textStyle: {
      marginLeft: 5,
    },
    subreddit: {
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center'
    }
  });

export default Search;