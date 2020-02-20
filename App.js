/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React , {Component}from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';



class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      isUserLoggedIn:false,
      userData:''
    }
  }
  componentDidMount(){

GoogleSignin.configure({
  scopes :['email', 'profile'],
  hostedDomain: '', 
  loginHint: '',
  forceConsentPrompt: true, 
  accountName: '', 
  iosClientId: 'client ID from google service info plist', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});
  }
   async _signIn(){
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({
        userData : userInfo,
        isUserLoggedIn : true
      })

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('>>cancel', JSON.stringify(error))
      
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('>>progress', JSON.stringify(error))
      
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('>>not', JSON.stringify(error))
     
      }
    }
  };

  _getCurrentData = async () => {
    try {
      const loggedInUser = await GoogleSignin.signInSilently();
      this.setState({ userData: loggedInUser});
    } catch (error) {
      this.setState({ loggedInUser: {} });
    }
  };
  
  render()
  {
      return(
        <SafeAreaView>
          <View style={{flex:1,alignContent:'center',alignItems:'center'}}>
          <GoogleSigninButton
          
    style={{ width: 192, height: 48 }}
    size={GoogleSigninButton.Size.Wide}
    color={GoogleSigninButton.Color.Dark}
    onPress={()=>this._signIn()}/>
    {this.state.isUserLoggedIn?this._getCurrentData():null}
  {console.log('>>userData' , JSON.stringify(this.state.userData))}
          </View>
        </SafeAreaView>
       
      )
  }
}

export default App;
