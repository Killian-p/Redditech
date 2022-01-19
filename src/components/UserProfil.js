import React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, Pressable, Dimensions, ScrollView } from 'react-native';
import { getUserProfil } from "./Utils";
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function UserProfil({navigation}) {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserProfil().then(res=>setUser(res));
  }, [])

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View>
            <Image style={styles.handleBanner} source={{
              uri: user.banner_img}}></Image>
          </View>
            <View style={styles.handleProfileImg}>
              <Image style={styles.handleIconImg} source={{
                uri: user.icon_img,
              }}></Image>
            </View>
          <View style={styles.header}>
            <View style={styles.handleName}>
              <Text style={styles.textNameStyle}>{user.name}</Text>
            </View>
            <View style={[styles.rowInfo2, {marginLeft: 210, marginBottom: 10}]}>
              <Pressable onPress={() => navigation.navigate('Settings')}>
                <MaterialCommunityIcons name="settings-outline" size={30}/>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.handleUsrInfo}>
          <View style={[styles.rowInfo, {justifyContent: 'center', marginLeft: 45, marginRight: 30}]}>
            <Text style={styles.textDescriptionStyle}>{user.description}</Text>
          </View>
        </View>
        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {borderRightColor: '#dddddd', borderRightWidth: 2}]}>
            <Text style={styles.Sub}>{user.followers}</Text>
            <Text>Subscribers</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.totalKarma}>{user.total_karma}</Text>
            <Text>Total Karma</Text>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          <Icon onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="link" color="#007FFF" size={25}/>
              <Text style={styles.menuItemText}>Link Karma : {user.linkKarma}</Text>
            </View>
          </Icon>
          <Icon onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="comment" color="#007FFF" size={25}/>
              <Text style={styles.menuItemText}>Comment Karma : {user.commentKarma}</Text>
            </View>
          </Icon>
          <Icon onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="trophy-award" color="#007FFF" size={25}/>
              <Text style={styles.menuItemText}>Awardee Karma : {user.awardeeKarma}</Text>
            </View>
          </Icon>
          <Icon onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="bitcoin" color="#007FFF" size={25}/>
              <Text style={styles.menuItemText}>Coins : {user.coins}</Text>
            </View>
          </Icon>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  handleBanner: {
    width: Dimensions.get('window').width,
    height: 150,
  },
  handleProfileImg: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleIconImg: {
    width: 110,
    height: 110,
    marginTop: 90,
    borderRadius: 110 / 2
  },
  header: {
    marginRight: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  handleName: {
    marginLeft: 20,
    marginTop: 40,
  },
  handleUsrInfo: {
    marginTop: 10,
  },
  rowInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  rowInfo2: {
    marginLeft: 130,
    marginTop: 35,
  },
  infoBoxWrapper: {
    marginTop: 20,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 2,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
  },
  profilImage: {
    width: 100,
    height: 100,
    borderRadius: 150 / 2,
  },

  textNameStyle: {
    fontSize: 20,
    color: '#0250a3',
    fontWeight: 'bold',
  },
  UsrDescription: {
    marginLeft: 5,
    fontSize: 20,
  },
  textDescriptionStyle: {
    marginTop: 5,
    flex: 1,
    fontSize: 15,
    color: '#0250a3',
  },
  totalKarma: {
    fontSize: 15,
    color: '#0250a3',
  },
  settingButton: {
    width: 30,
    height: 30,
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#0250a3',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});

export default UserProfil;