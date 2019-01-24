import React from 'react';
import { StyleSheet, TextInput, Text, ScrollView, View} from 'react-native';
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
      return 
    }
    this.setState((prevState) => {
      return {
        messages: prevState.messages.concat(prevState.textBoxValue)
      };
    });
  }

  renderMessages = () => {
    return(
      this.state.messages.map((message) => 
      <View key={message} style={{height:"20%", width:"40%", backgroundColor:"#af03f5", padding: "10%", margin:"10%"}}>
      <Text  style={{color:"#fff", fontSize:20}}>{message}</Text>
      <Text style={{color:"#a5a5a5", fontSize:10}}>sent on {(new Date()).toString()}</Text>
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
      
      <View style={styles.container}>
      <ScrollView contentContainerStyle={{justifyContent:'flex-end', alignItems:'flex-end', backgroundColor:"#f00"}}>
          {this.renderMessages()}
      </ScrollView>
     <View style={{flexDirection:"row"}}>
       <TextInput value={this.state.textBoxValue} onChangeText={this.changeInputBox} style={{width:"82%", paddingLeft: "2%"}} placeholder={"Enter your message"}/>
       <Button onPress={this.addMessage} style={{width:"30%"}} title={"Send"}/>
       </View>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow:1,
    backgroundColor: '#fff',
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
