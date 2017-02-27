/**
 * @fileoverview
 * @since 17/2/27 00:00
 * @author chenyiqin
 */

import React, {
    Component,
    PropTypes,
} from 'react'
import {
    WebView,
    View,
    Text,
    StyleSheet,
} from 'react-native'

export default class WebViewTest extends Component {

    static propTypes = {
        releasePrevWebView: PropTypes.func,
    }

    webview = null

    state = {
        messagesReceivedFromWebView: 0,
        message: '',
        hideWebView: false
    }

    componentWillMount() {
        let currentRoute = this.props.navigator.navigationContext._currentRoute
        let viewAppearCallBack = (event) => {
            //didfocus emit in componentDidMount
            if (currentRoute === event.data.route) {
                this.props.releasePrevWebView && this.props.releasePrevWebView()

                console.log("self didAppear")
            } else {
                console.log("self didDisappear, other didAppear")
            }
        }

        this._didFocusListener = this.props.navigator.navigationContext.addListener('didfocus', viewAppearCallBack)
    }

    componentWillUnmount () {
        if (this._didFocusListener) {
            this._didFocusListener.remove();
        }
    }

    onMessage = (e) => {
        if (e.nativeEvent.data === 'push') {
            let navigatorProps = {
                title: 'WebViewTest-2',
                component: WebViewTest,
                releasePrevWebView: this.releaseWebView,
                uri: 'messageingtest-2.html'
            }
            this.props.navigator.push(navigatorProps)
        } else if (e.nativeEvent.data === 'pop') {
            this.props.navigator.pop()
        } else {
            this.setState({
                messagesReceivedFromWebView: this.state.messagesReceivedFromWebView + 1,
                message: e.nativeEvent.data,
            })
        }
    }

    postMessage = () => {
        if (this.webview) {
            this.webview.postMessage('"Hello" from React Native!');
        }
    }

    releaseWebView = () => {
        this.setState({
            hideWebView: true
        });
    }

    render () {
        const {messagesReceivedFromWebView, message} = this.state;

        return (
            <View style={[styles.container, { height: 200 }]}>
                <View style={styles.container}>
                    <Text>Messages received from web view: {messagesReceivedFromWebView}</Text>
                    <Text>{message || '(No message)'}</Text>
                    <View style={styles.buttons}>
                        <Text style={{color: '#fff',}} onPress={this.postMessage}>
                            Send Message to Web View
                        </Text>
                    </View>
                </View>
                <View style={styles.container}>
                    {
                        this.state.hideWebView ? null : <WebView
                            ref={webview => { this.webview = webview; }}
                            style={{
                          backgroundColor: BGWASH,
                          height: 100,
                        }}
                            source={require('./messagingtest-2.html')}
                            onMessage={this.onMessage}
                        />
                    }
                </View>
            </View>
        );
    }

}

const HEADER = '#3b5998';
const BGWASH = 'rgba(255,255,255,0.8)';
const DISABLED_WASH = 'rgba(255,255,255,0.25)';

const styles = StyleSheet.create({
    container: {
        marginTop: 64,
        flex: 1,
        backgroundColor: HEADER,
    },
    addressBarRow: {
        flexDirection: 'row',
        padding: 8,
    },
    webView: {
        backgroundColor: BGWASH,
        height: 350,
    },
    addressBarTextInput: {
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        borderWidth: 1,
        height: 24,
        paddingLeft: 10,
        paddingTop: 3,
        paddingBottom: 3,
        flex: 1,
        fontSize: 14,
    },
    navButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    disabledButton: {
        width: 20,
        padding: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: DISABLED_WASH,
        borderColor: 'transparent',
        borderRadius: 3,
    },
    goButton: {
        height: 24,
        padding: 3,
        marginLeft: 8,
        alignItems: 'center',
        backgroundColor: BGWASH,
        borderColor: 'transparent',
        borderRadius: 3,
        alignSelf: 'stretch',
    },
    statusBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 5,
        height: 22,
    },
    statusBarText: {
        color: 'white',
        fontSize: 13,
    },
    spinner: {
        width: 20,
        marginRight: 6,
    },
    buttons: {
        flexDirection: 'row',
        height: 30,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        flex: 0.5,
        width: 0,
        margin: 5,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'gray',
    },
});