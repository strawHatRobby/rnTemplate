import React from 'react';
import { StyleSheet, TextInput, Text,KeyboardAvoidingView, ScrollView, View} from 'react-native';
import { Font } from 'expo';
import { Button } from 'react-native-elements';
// import { ScrollView } from 'react-native-gesture-handler';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fontLoaded: false,
      textBoxValue: '',
      messages: []
    }
    
  }
  loadText = () => {
    return(
      <Text style={{color:"#f00", fontSize:20}}>{this.state.textBoxValue}</Text>
    )
  }
  async componentDidMount() {
    await Font.loadAsync({
      'Charter': require('./assets/fonts/charter-bt/CharterBT.ttf')
    });
    await Font.loadAsync({
      "MaisonNeue": require('./assets/fonts/MaisonNeue-Medium.ttf'),
    });

    this.setState({ fontLoaded: true });
  
  }
  

  addMessage = () => {
    if(this.state.textBoxValue.trim() === ""){
      return;
    }
    this.setState((prevState) => {
      return {
        messages: prevState.messages.concat(prevState.textBoxValue.trim()),
        textBoxValue: ''
      };
    }); 
  }

 

  renderMessages = () => {
    return(
      this.state.messages.map((message) => 
      <View key={message} style={{marginLeft:"60%", justifyContent:'center', alignItems:'center',  alignSelf:'baseline', backgroundColor:"#af03f5", padding: "1%", margin:"5%"}}>
      <Text style={{color:"#fff", fontSize:20}}>{message}</Text>
      <Text style={{color:"#a5a5a5", fontSize:10}}>sent on {(new Date()).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
      </View>
      )
    )
  }

  changeInputBox = (textValue) => {
    this.setState({
          textBoxValue: textValue
    })
  }

  render() {
    return (
      
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      <ScrollView contentContainerStyle={{ backgroundColor:"rgb(229,221,214)"}}>
          {this.renderMessages()}
      </ScrollView>
     <View style={{flexDirection:"row"}}>
       <TextInput placeholderStyle={{color:'rgb(182,182,182)'}} value={this.state.textBoxValue} onChangeText={this.changeInputBox} style={{backgroundColor: '#fff', marginBottom:'2%', padding:'3%', paddingRight:'5%', borderRadius:20, borderColor:'transparent', width:"82%", paddingLeft: "2%"}} placeholder={"Enter your message"}/>
       <Button onPress={this.addMessage} icon={{name: 'send', style: { marginRight: 0 } }} contentContainerStyle={{ textAlign:'center'}} buttonStyle={{backgroundColor:"#07B17D",marginLeft:"0%", marginRight:"2%", alignItems: 'center', justifyContent:'center', height:50, width:50, borderRadius:50}}/>
       </View>
       
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow:1,
    backgroundColor: 'rgb(229,221,214)',
    alignContent: 'space-between',
    flexDirection: 'column'
  },
  word: {
    width: 140,
    height: 49,
    fontFamily: "Charter",
    fontSize: 40,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 49,
    letterSpacing: 0,
    textAlign: "left",
    color: "#707070"
  },
  options:  {
    width: 150.8,
    height: 31.2,
    borderRadius: 4,
    backgroundColor: "#07b17d",
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsText: {
  width: 49,
  height: 12,
  fontFamily: "MaisonNeue",
  fontSize: 12,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: 6,
  letterSpacing: 0,
  textAlign: "left",
  color: "#faf5f5"
  }
});
