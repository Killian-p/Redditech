import React from 'react';
import { Card } from 'react-native-elements';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ImagePost, ImagePostShared } from './ImagePost';
import { LinkPost, LinkPostShared } from './LinkPost';
import { TextPost, TextPostShared } from './TextPost';
import { VideoHostedPost, VideoHostedPostShared, VideoRichPost, VideoRichPostShared } from './VideoPost';
import { GalleryPost } from './GalleryPost'
import { setVotePosts } from './Utils';
import { useState } from 'react';

function SelectPosts(element) {
    if (element.data.crosspost_parent) {
        if (element.data.crosspost_parent_list[0].is_self === true) {
            return <TextPostShared data={element.data}/>
        } else if (element.data.crosspost_parent_list[0].post_hint === 'image') {
            return <ImagePostShared data={element.data}/>
        } else if (element.data.crosspost_parent_list[0].post_hint === 'hosted:video') {
            return <VideoHostedPostShared data={element.data}/>
        } else if (element.data.crosspost_parent_list[0].post_hint === 'rich:video') {
            return <VideoRichPostShared data={element.data}/>
        } else if (element.data.crosspost_parent_list[0].post_hint === 'link') {
            return <LinkPostShared data={element.data}/>
        } else {
            return (
                <Text>Something went wrong...</Text>
            )
        }
    } else {
        if (element.data.is_self === true) {
            return <TextPost data={element.data}/>
        } else if (element.data.post_hint === 'image') {
            return <ImagePost data={element.data}/>
        } else if (element.data.post_hint === 'hosted:video') {
            return <VideoHostedPost data={element.data}/>
        } else if (element.data.post_hint === 'rich:video') {
            return <VideoRichPost data={element.data}/>
        } else if (element.data.post_hint === 'link') {
            return <LinkPost data={element.data}/>
        } else if (element.data.is_gallery === true) {
            return <GalleryPost data={element.data}/>
        } else {
            return <Text>Something went wrong...</Text>;
        }
    }
}

function getValue(value) {
    if (value === 0) {
        return null;
    } else if (value === 1) {
        return true
    } else {
        return false
    }
}

function Posts(data) {
    const [element, setElement] = useState(data)

    function updateVote(name, value) {
        if ((element.data.likes === true && value === 1) || (element.data.likes === false && value === -1)) {
            value = 0;
        }
        setVotePosts(name, value);
        let newElem = {...element, data: {...element.data, likes: getValue(value)}};
        setElement(newElem);
    }

    return (
        <View>
            <View>
                <Text>u/{element.data.author}</Text>
                <Text style={styles.title}>{element.data.title}</Text>
            </View>
            <SelectPosts data={element.data}/>
            <View style={styles.vote}>
                <Pressable onPress={() => {
                    updateVote(element.data.name, 1);
                }}>
                    <MaterialCommunityIcons name="arrow-up" size={30} color={(element.data.likes == true) ? "red" : "black"}/>
                </Pressable>
                <Text>{element.data.score}</Text>
                <Pressable onPress={() => {
                    updateVote(element.data.name, -1)
                }}>
                    <MaterialCommunityIcons name="arrow-down" size={30} color={(element.data.likes == false) ? "blue" : "black"}/>
                </Pressable>
            </View>
        </View>
    )
}

function DisplayPost(posts) {

    return (
        <View>
        {
            (posts && Array.isArray(posts.data.children)) ? posts.data.children.map((element, key) => (
                <Card key={key} style={{backgroundColor: "aquamarine", margin: 10}}>
                    <Posts data={element.data}/>
                </Card>
            )) : <Text>Loading...</Text>
        }
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    vote: {
        flex: 1,
        flexDirection: "row"
    }
})

export default DisplayPost;