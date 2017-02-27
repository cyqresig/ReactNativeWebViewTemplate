/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import WebViewTest from './webview/webview-test'

export default class RN0411 extends Component {
  render () {
    return (
        <Navigator style={styles.container}
                   initialRoute={{
                      component: WebViewTest,
                      title: 'WebViewTest'
                    }}
                   sceneStyle={styles.navigatorBg}
                   configureScene={() => {
                            return {
                                ...Navigator.SceneConfigs.PushFromRight,
                                gestures: {} // or null
                            }
                        }}
                   renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                          <Component
                            navigator={navigator}
                            {...route.passProps}
                          />
                        )
                     }}
                   navigationBar={
                      <Navigator.NavigationBar
                        ref={(navigationBar) => {
                          this.navigationBar = navigationBar
                        }}
                        routeMapper={NavigationBarRouteMapper}
                        style={styles.navBar}
                      />
                    }
        />
    )
  }
}

let NavigationBarRouteMapper = {

  LeftButton: function (route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[ index - 1 ];
    return (
        <TouchableOpacity
            onPress={() => navigator.pop()}
            style={styles.navBarLeftButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            返回
          </Text>
        </TouchableOpacity>
    );
  },

  RightButton: function (route, navigator, index, navState) {
    //if (index === 0) {
    //  return null;
    //}
    //return (
    //  <TouchableOpacity
    //    onPress={() => navigator.push(newRandomRoute())}
    //    style={styles.navBarRightButton}>
    //    <Text style={[styles.navBarText, styles.navBarButtonText]}>
    //      Next
    //    </Text>
    //  </TouchableOpacity>
    //);
    return null
  },

  Title: function (route, navigator, index, navState) {
    //if (index === 0) {
    //  return null;
    //}
    console.log(route)
    return (
        <Text style={[styles.navBarText, styles.navBarTitleText]}>
          {route.title}
        </Text>
    )
    //return (
    //  <TextInput
    //    style={{alignSelf:'center', width: 100, height: 40, borderColor: 'gray', borderWidth: 1}}
    //    defaultValue={route.title + '[' + index + ']'}
    //  />
    //)
  },

};

const styles = StyleSheet.create({
  navigatorBg: {
    backgroundColor: '#F4F4F4',
  },
  navBar: {
    backgroundColor: 'black',
  },
  navBarText: {
    fontSize: 16,
    margin: 10,
    color: 'white',
  },
  navBarTitleText: {
    color: 'white',
    fontWeight: '500',
    marginVertical: 9,
  },
})

AppRegistry.registerComponent('RN0411', () => RN0411);
