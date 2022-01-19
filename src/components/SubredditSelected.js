import React from 'react';
import { SafeAreaView, Text, Image, StyleSheet, View, Pressable , ScrollView, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { getSubredditPosts, subscribeUnsubscribe, getSubredditInfo } from './Utils';
import DisplayPost from './DisplayPost';

function SubredditSelected(subredditNamePrefixed) {

    const [posts, setPosts] = useState(null);
    const [after, setAfter] = useState("");
    const [subredditInfo, setSubredditInfo] = useState(null);
    const [subscribe, setSubscribe] = useState(null);
    const [isLoaded, setLoaded] = useState(false);
    const [filter, setFilter] = useState('/');

    useEffect(() => {
        async function getData() {
            setLoaded(false);
            let response = await getSubredditPosts(subredditNamePrefixed.route.params.name, "", filter);
            setPosts(response);
            setAfter(response.after);
            setLoaded(true);
        }
        getData();
    }, [filter])

    useEffect(() => {
        async function getData() {
            const subInfo = await getSubredditInfo(subredditNamePrefixed.route.params.name);
            setSubredditInfo(subInfo);
            const subPost = await getSubredditPosts(subredditNamePrefixed.route.params.name, "", filter);
            setPosts(subPost);
            setAfter(subPost.after);
            setSubscribe(subInfo.data.user_is_subscriber);
            setLoaded(true);
        }
        getData();
    }, [])

    async function getNewPosts() {
        let newPosts = await getSubredditPosts(subredditNamePrefixed.route.params.name, after, filter);
        let existingPosts = posts.children.slice();

        for (let i = 0; i < newPosts.children.length; i++) {
            existingPosts.push(newPosts.children[i]);
        }
        setPosts({children: existingPosts});
        setAfter(newPosts.after);
    }

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
                        <View>
                            <View>
                                <Image style={styles.bannerImg} source={{
                                    uri: subredditInfo.data.banner_background_image.split('amp;').join('')}}></Image>
                            </View>
                            <View style={styles.handleIcon}>
                                <Image style={styles.iconImg} source={{
                                    uri: subredditInfo.data.community_icon ?
                                        subredditInfo.data.community_icon.split('amp;').join('') :
                                        subredditInfo.data.icon_img.split('amp;').join('')
                                }}></Image>
                            </View>
                                <View style={styles.header}>
                                    <View style={styles.handleSubscribers}>
                                        <Text>Subscribers : </Text>
                                        <Text>{subredditInfo.data.subscribers}</Text>
                                    </View>
                                    <View style={styles.rowInfo2}>
                                        <Pressable style={styles.subButton}
                                            onPress={() => {
                                                subscribe ?
                                                    subscribeUnsubscribe('unsub', subredditInfo.data.display_name) :
                                                    subscribeUnsubscribe('sub', subredditInfo.data.display_name);
                                                setSubscribe(!subscribe);
                                            }}>
                                            <Text>{subscribe ? "Unsubscribe" : "Subscribe"}</Text>
                                        </Pressable>
                                    </View>
                                </View>
                                <View style={styles.rowInfo}>
                                    <Text>{subredditInfo.data.title}</Text>
                                    <Text>{subredditInfo.data.public_description}</Text>
                                </View>
                        </View>
                        <View style={styles.handleFilter}>
                            <Pressable style={(filter === '/') ? styles.filterSelected : styles.filter}
                                onPress={() => {
                                    setFilter('/');
                            }}>
                                <Ionicons name="ios-flame" size={30}/>
                                <Text>Popular</Text>
                            </Pressable>
                            <Pressable style={(filter === '/new') ? styles.filterSelected : styles.filter}
                                onPress={() => {
                                    setFilter('/new');
                            }}>
                                <MaterialCommunityIcons name="decagram-outline" size={30}/>
                                <Text>New</Text>
                            </Pressable>
                            <Pressable style={(filter === '/top') ? styles.filterSelected : styles.filter}
                                onPress={() => {
                                    setFilter('/top')
                            }}>
                                <MaterialCommunityIcons name="align-vertical-top" size={30}/>
                                <Text>Top</Text>
                            </Pressable>
                        </View>
                        <DisplayPost data={posts}/>
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
    bannerImg: {
        width: Dimensions.get('window').width,
        height: 150,
    },
    header: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'center',
      },
    handleSubscribers: {
        marginTop: -10,
        marginLeft: 20,
      },
    iconImg: {width: 110,
        height: 110,
        marginTop: 90,
        borderRadius: 110 / 2
    },
    handleIcon: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    rowInfo: {
        marginBottom: 10,
        marginLeft: 10,
        marginBottom: 30,
        alignItems: 'center'
    },
      rowInfo2: {
        marginLeft: 130,
        marginBottom: 20,
        marginTop: -22
    },
    handleFilter: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
    },
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
    },
    subButton: {
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'orange'
    }
})

export default SubredditSelected;