import React from 'react';
import { useState, useEffect } from 'react';
import {Text, StyleSheet, Button, Switch, SafeAreaView, View, ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Constants from 'expo-constants';
import { getUserSettings, setUserSettings } from './Utils';


function Settings() {
    const [open, setOpen] = useState(false);

    const [messages, setMessages] = useState(null);
    const [nightmode, setNightmode] = useState(null);
    const [beta, setBeta] = useState(null);
    const [emailPM, setEmailPM] = useState(null);
    const [emailPR, setEmailPR] = useState(null);
    const [enableFollowers, setEnableFollowers] = useState(null);

    const [items, setItems] = useState([
      {label: 'Everyone', value: 'everyone'},
      {label: 'Whitelisted', value: 'whitelisted'}
    ]);

    function loadSettings(res) {
      setMessages(res.accept_messages);
      setBeta(res.beta);
      setNightmode(res.nightmode);
      setEmailPM(res.email_pm);
      setEnableFollowers(res.enable_followers);
      setEmailPR(res.email_PR);
    }

    function saveSettings() {
      const data = {
        accept_pms: messages,
        beta: beta,
        nightmode: nightmode,
        enable_followers: enableFollowers,
        email_private_message: emailPM,
        email_post_reply: emailPR,
      }
      setUserSettings(data);
    }

    useEffect(() => {
      getUserSettings().then(res=>{loadSettings(res)});
    }, [])

    return (
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView>
          <Text style={styles.receiveMsg}>Receive messages from :</Text>
          <DropDownPicker
            open={open}
            value={messages}
            items={items}
            setOpen={setOpen}
            setValue={setMessages}
            setItems={setItems}
            onChangeValue={() => setOpen(false)}
          />

          <View style={styles.infoBoxWrapper}>
            <View style={styles.container}>
              <Text style={styles.paragraph}>Activate beta :</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={beta ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setBeta(!beta)}
                value={beta}
              />
            </View>
          </View>

          <View style={styles.infoBoxWrapper}>
            <View style={styles.container}>
              <Text style={styles.paragraph}>Nightmode :</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={nightmode ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setNightmode(!nightmode)}
                value={nightmode}
              />
            </View>
          </View>

          <View style={styles.infoBoxWrapper}>
            <View style={styles.container}>
              <Text style={styles.paragraph}>Enable followers :</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={enableFollowers ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setEnableFollowers(!enableFollowers)}
                value={enableFollowers}
              />
            </View>
          </View>

          <View style={styles.infoBoxWrapper}>
            <View style={styles.container}>
              <Text style={styles.paragraph}>Receive email when someone sent you a private message :</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={emailPM ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setEmailPM(!emailPM)}
                value={emailPM}
              />
            </View>
          </View>

          <View style={styles.infoBoxWrapper}>
            <View style={styles.container}>
              <Text style={styles.paragraph}>Receive email when someone reply to your post :</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={emailPR ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setEmailPR(!emailPR)}
                value={emailPR}
              />
            </View>
          </View>
          <Button
            title='Save'
            onPress={saveSettings}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    mainContainer: {
      marginTop: 30,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    container: {
      flexDirection: 'row',
      marginTop: 15,
      alignItems: 'center',
    },
    infoBoxWrapper: {
      marginTop: 20,
      borderBottomColor: '#dddddd',
      borderBottomWidth: 2,
      borderTopColor: '#dddddd',
      borderTopWidth: 2,
      flexDirection: 'column',
      height: 70,
    },
    receiveMsg: {
      textAlign: 'center',
      fontSize: 20,
    },
    paragraph: {
      margin: 0,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      flex: 1,
    },
    row: {
      flexDirection: "row",
      flexWrap: 'wrap'
    },
    button: {
      justifyContent: 'flex-end',
      bottom: 30,
    }
  });

export default Settings;