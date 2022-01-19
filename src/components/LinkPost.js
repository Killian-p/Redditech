import React from 'react';
import { Card } from 'react-native-elements';
import { View, Text, Image } from 'react-native';

function LinkPost(element) {
    return (
        <View>
            <Image style={{width: '100%', aspectRatio: 1}}
                source={{
                    uri: element.data.preview.images[0].variants?.gif ?
                        element.data.preview.images[0].variants?.gif?.source.url :
                        element.data.preview.images[0].source.url.split('amp;').join('')
                }}
            />
        </View>
    )
}

function LinkPostShared(element) {
    return (
        <Card>
            <View>
                <Text>{element.data.crosspost_parent_list[0].subreddit_name_prefixed}</Text>
                <Text style={{fontSize: 15, fontWeight: "bold"}}>{element.data.crosspost_parent_list[0].title}</Text>
                <Image style={{width: '100%', aspectRatio: 1}}
                    source={{
                        uri: element.data.crosspost_parent_list[0].preview.images[0].variants?.gif ?
                                element.data.crosspost_parent_list[0].preview.images[0].variants.gif.source.url :
                                element.data.crosspost_parent_list[0].preview.images[0].source.url.split('amp')[0].split('amp;').join('')
                    }}
                />
            </View>
        </Card>
    );
}

module.exports = {
    LinkPost,
    LinkPostShared
}