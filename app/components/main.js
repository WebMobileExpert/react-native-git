import React from 'react-native'
const { Image, View, Text, StyleSheet, TextInput, TouchableHighlight, ActivityIndicatorIOS, } = React;
import api from '../api/github'
import Dashboard from './dashboard'
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#b24141',
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 10,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  image: {
    alignSelf: 'center'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  }
})


class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      isLoading: false,
      error: false,
    }
  }

  handleChange(event) {
    this.setState({
      username: event.nativeEvent.text
    })
  }

  handleSubmit() {
    console.log('helo!!', this.state.username)
    this.setState({
      isLoading: true,
    })
    api.getBio(this.state.username)
    .then(res => {
      if(res.message === 'Not Found'){
        this.setState({
          error: 'User not found',
          isLoading: false
        })
      } else {
        this.props.navigator.push({
          title: res.name || 'Select an Option',
          component: Dashboard,
          passProps: { userInfo: res}
        })
        this.setState({
          isLoading: false,
          error: false,
          username: ''
        })
      }
    })
    console.log('Submit', this.state.username)
  }

  render() {
    const showErr = (
      this.state.error ? <Text style={styles.errorText}>{ this.state.error} </Text> : <View></View>
    )
    return (
      <View style={styles.mainContainer}>
        <Image style={styles.image}
               source={require('../../public/images/aurity_logo_v32_small.png')}></Image>
        <Text style={styles.title}> Search for a Github User</Text>
        <TextInput style={styles.searchInput}
                   value={this.state.username}
                   onChange={this.handleChange.bind(this)} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
          <Text style={styles.buttonText}> SEARCH </Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color='#111'
          size="large"/>
        { showErr }
      </View>
    )
  }
}

export default Main