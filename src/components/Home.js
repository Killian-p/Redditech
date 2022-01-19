import React from 'react';
import { Pressable, StyleSheet, SafeAreaView, Text, ScrollView, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { getFeedPosts } from './Utils';
import { useState, useEffect } from 'react';

import DisplayPost from './DisplayPost';

function Home({navigation}) {
    const [feed, setFeed] = useState(null);
    const [filter, setFilter] = useState('/best');
    const [isLoaded, setLoaded] = useState(false);
    const [after, setAfter] = useState("");

    useEffect(() => {
        async function getData() {
            setLoaded(false);
            let response = await getFeedPosts("", filter);
            setFeed(response);
            setAfter(response.after);
            setLoaded(true);
        }
        getData();
    }, [filter])

    async function getNewPosts() {
        let newFeed = await getFeedPosts(after, filter);
        let existingFeed = feed.children.slice();

        for (let i = 0; i < newFeed.children.length; i++) {
            existingFeed.push(newFeed.children[i]);
        }
        setFeed({children: existingFeed});
        setAfter(newFeed.after);
    }

    useEffect(() => {
        async function getData() {
            const feedPost = await getFeedPosts("", filter);
            setFeed(feedPost);
            setAfter(feedPost.after);
            setLoaded(true);
        }
        getData();
    }, [])

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    return (
        <SafeAreaView>
            <ScrollView
                onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {
                        getNewPosts();
                    }
                }}
                scrollEventThrottle={400}
            >
            {
                isLoaded ? (
                    <>
                        <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", marginTop: 10}}>
                            <Pressable  style={(filter === '/best') ? styles.filterSelected : styles.filter}
                                onPress={() => {
                                    setFilter('/best');
                            }}>
                                <MaterialCommunityIcons name="trophy-outline" size={30}/>
                                <Text>Best</Text>
                            </Pressable>
                            <Pressable  style={(filter === '/new') ? styles.filterSelected : styles.filter}
                                onPress={() => {
                                    setFilter('/new');
                            }}>
                                <MaterialCommunityIcons name="decagram-outline" size={30}/>
                                <Text>New</Text>
                            </Pressable>
                            <Pressable style={(filter === '/hot') ? styles.filterSelected : styles.filter}
                                onPress={() => {
                                    setFilter('/hot')
                            }}>
                                <MaterialCommunityIcons name="fire" size={30}/>
                                <Text>Hot</Text>
                            </Pressable>
                        </View>
                        <DisplayPost data={feed}/>
                    </>
                ) : (
                    <Text>Loading...</Text>
                )
            }
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    filterSelected: {
        width: '20%',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'grey'
    },
    filter: {
        width: '20%',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'white'
    }
})

export default Home;