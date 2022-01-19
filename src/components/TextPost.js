import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

function TextPost(element) {
    return (
        <View>
            <Text style={styles.text}>{element.data.selftext}</Text>
        </View>
    );
}

function TextPostShared(element) {
    return (
        <Card>
            <View>
                <Text>{element.data.crosspost_parent_list[0].subreddit_name_prefixed}</Text>
                <Text style={styles.title}>{element.data.crosspost_parent_list[0].title}</Text>
                <Text style={styles.text}>{element.data.crosspost_parent_list[0].selftext}</Text>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: "bold"
    },
    text: {
        fontSize: 15
    }
})

module.exports = {
    TextPost,
    TextPostShared
}