import axios from 'axios';
const _ = require('lodash');
import { refreshAsync } from 'expo-auth-session';
import { setToken, getToken } from './StoringData';

const baseUrl = "https://oauth.reddit.com"

async function refreshToken() {
    const refreshToken = await getToken('refresh_token');
    const tokenCreation = await getToken('tokenCreation');

    if ((tokenCreation + 3600) == (Date.now() / 1000)) {
        let response = refreshAsync(
            {
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                redirectUri: makeRedirectUri({
                    useProxy: true,
                }),
                refreshToken: refreshToken
            },
            {
                tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
            },
        );
        setToken('tokenCreation', response.issuedAt);
        setToken('access_token', response.accessToken);
        setToken('refresh_token', response.refreshToken);
    }
}

async function sendRequest(url, method, params, data) {
    refreshToken();
    try {
        let response = await axios({
            method: method,
            url: url,
            headers: {
                Authorization: 'Bearer ' + await getToken('access_token')
            },
            params: _.isEmpty(params) ? undefined : params,
            data: _.isEmpty(data) ? undefined : data
        });
        return response.data;
    } catch (e) {
        console.log("error: " + e.message);
    }
}

async function getUserProfil() {
    let response = await sendRequest(baseUrl + '/api/v1/me', 'get', {}, {});
    let data = {
        icon_img: response.subreddit.icon_img.split('amp;').join(''),
        name: response.name,
        description: response.subreddit.public_description,
        banner_img: response.subreddit.banner_img.split('amp;').join(''),
        total_karma: response.total_karma,
        commentKarma: response.comment_karma,
        linkKarma: response.link_karma,
        awardeeKarma: response.awardee_karma,
        followers: response.subreddit.subscribers,
        coins: response.coins,
    }
    return data;
}

async function getUserSettings() {
    let response = await sendRequest(baseUrl + '/api/v1/me/prefs', 'get', {}, {});
    let data = {
        accept_messages: response.accept_pms,
        beta: response.beta,
        nightmode: response.nightmode,
        enable_followers: response.enable_followers,
        email_pm: response.email_private_message,
        email_PR: response.email_post_reply,
    }
    return data;
}

async function setUserSettings(data) {
    await sendRequest(baseUrl + '/api/v1/me/prefs', 'patch', {}, data);
}

async function getSearchResults(query) {
    let params = {
        query: query,
        limit: 10
    }
    let response = await sendRequest(baseUrl + '/api/subreddit_autocomplete_v2', 'get', params, {})
    let arr = response.data.children;
    return arr;
}

async function getSubredditPosts(name, after, filter) {
    let params = {
        limit: 20,
        after: after
    }
    let response = await sendRequest(baseUrl + '/' + name + filter, 'get', params, {});
    return response.data;
}

async function setVotePosts(name, value) {
    let params = {
        id: name,
        dir: value
    }
    await sendRequest(baseUrl + '/api/vote', 'post', params, {});
}

async function getFeedPosts(after, filter) {
    let params = {
        limit: 20,
        after: after
    }
    let response = await sendRequest(baseUrl + filter, 'get', params, {});
    return response.data;
}

async function subscribeUnsubscribe(action, name) {
    let params = {
        action: action,
        sr_name: name,
    }
    await sendRequest(baseUrl + '/api/subscribe', 'post', params, {})
}

async function getSubredditInfo(name_prefixed) {
    let response = await sendRequest(baseUrl + '/' + name_prefixed + '/about', 'get', {}, {});
    return response;
}

module.exports = {
    getUserProfil,
    getUserSettings,
    setUserSettings,
    getSearchResults,
    getSubredditPosts,
    subscribeUnsubscribe,
    getSubredditInfo,
    getFeedPosts,
    setVotePosts
};