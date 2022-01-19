import React from 'react';
import { Card } from 'react-native-elements';
import { View, Text, Pressable } from 'react-native';

import { useState, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { Video } from 'expo-av';


function VideoHostedPost(element) {
    const video = useRef(null);
    const [isPlaying, setPlaying] = useState(false);  

    return (
        <View>
            <Video style={{width: '100%', aspectRatio: 1}}
                ref={video}
                source={{
                    uri: element.data.secure_media.reddit_video.fallback_url
                }}
                useNativeControls
                onPlaybackStatusUpdate={status => setPlaying(() => status)}
            />
            <View>
                <Pressable 
                    title={isPlaying ? 'Pause' : 'Play'}
                    onPress={() => {
                        isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                        setPlaying(!isPlaying)
                    }}
                />
            </View>
        </View>
    )
}

function VideoHostedPostShared(element) {
    const video = useRef(null);
    const [isPlaying, setPlaying] = useState(false);  

    return (
        <Card>
            <View>
                <Text>{element.data.crosspost_parent_list[0].subreddit_name_prefixed}</Text>
                <Text style={{fontSize: 15, fontWeight: "bold"}}>{element.data.crosspost_parent_list[0].title}</Text>
                <Video style={{width: '100%', aspectRatio: 1}}
                    ref={video}
                    source={{
                        uri: element.data.crosspost_parent_list[0].secure_media.reddit_video.fallback_url
                    }}
                    useNativeControls
                    onPlaybackStatusUpdate={status => setPlaying(() => status)}
                />
                <View>
                    <Pressable 
                        title={isPlaying ? 'Pause' : 'Play'}
                        onPress={() => {
                            isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                            setPlaying(!isPlaying)
                        }}
                    />
                </View>
            </View>
        </Card>
    )
}

function VideoRichPost(element) {
    return (
        <View>
            <WebView style={{width: '100%', aspectRatio: 1}}
                source={{
                    uri: element.data.secure_media_embed.media_domain_url
                }}
            />
        </View>
    )
}

function VideoRichPostShared(element) {
    return (
        <Card>
            <View>
                <Text>{element.data.crosspost_parent_list[0].subreddit_name_prefixed}</Text>
                <Text style={{fontSize: 15, fontWeight: "bold"}}>{element.data.crosspost_parent_list[0].title}</Text>
                <WebView style={{width: '100%', aspectRatio: 1}}
                    source={{
                        uri: element.data.crosspost_parent_list[0].secure_media_embed.media_domain_url
                    }}
                />
            </View>
        </Card>
    )
}

module.exports = {
    VideoHostedPost,
    VideoHostedPostShared,
    VideoRichPost,
    VideoRichPostShared
}