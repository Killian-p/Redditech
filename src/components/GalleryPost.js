import React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

function getGaleryImages(data, imagesId) {
    let images = [];
    for (var i = 0; i < imagesId.length; i++) {
        data[imagesId[i].media_id].p[3] ?
        images.push(data[imagesId[i].media_id].p[3].u.split('amp;').join('')) :
        images.push(data[imagesId[i].media_id].p[0].u.split('amp;').join(''))
    }
    return images;
}

function displayImage(images) {
    return (
        <View>
            <Image style={{width: '100%', aspectRatio: 1}}
                source={{uri: images.item}}
            />
        </View>
    )
}

function GalleryPost(element) {
    let images = getGaleryImages(element.data.media_metadata, element.data.gallery_data.items);
    return (
        <View>
            <Carousel
                layout={"default"}
                ref={ref => carousel = ref}
                data={images}
                sliderWidth={Dimensions.get('window').width * 0.7}
                itemWidth={Dimensions.get('window').width * 0.7}
                renderItem={displayImage}
            />
            <Text>Fais glisser pour voir les autres images :D</Text>
        </View>
    )
}

module.exports = {
    GalleryPost
}