import React from 'react'
import { View, Text, Button, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

import Myheader from './myheader'
import firebase from '../../config'
export default class SettingScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            contact: '',
            address: '',
            emailId: '',
            docId: ''
        }
        
    }
    getUsersDetails = () => {
        const auth = firebase.auth()
        const db = firebase.firestore()
        var email = auth.currentUser.email;
        db.collection('users').where('emailid', '==', email).onSnapshot(snapShot => {
            snapShot.forEach(doc => {
                var data = doc.data();
                this.setState({
                    firstname: data.firstName,
                    lastname: data.lastName,
                    contact: data.contact,
                    address: data.address,
                    emailId: data.emailid,
                    docId: doc.id
                })
            })
        })

    }
    componentDidMount(){
        this.getUsersDetails();
    }
    updateUsersDetails = () => {
        const db = firebase.firestore()
        db.collection('users').doc(this.state.docId).update({
            'firstname': this.state.firstName,
            'lastname': this.state.lastName,
            'contact': this.state.contact,
            'address': this.state.address,
        })
        alert('Profile Update Successfully')
    }
    render() {
        return (
            <View >
                <Myheader title='Settings' navigation={this.props.navigation} />
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"first name"}
                        maxLength={8}
                        onChangeText={(text) => { this.setState({ firstName: text }) }}
                        value={this.state.firstName}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Last Name"}
                        maxLength={8}
                        onChangeText={(text) => { this.setState({ lastName: text }) }}
                        value={this.state.lastName}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Contact"}
                        maxLength={10}
                        onChangeText={(text) => { this.setState({ contact: text }) }}
                        value={this.state.contact}
                        keyboardType={"numeric"}
                    />
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Address"}
                        onChangeText={(text) => { this.setState({ address: text }) }}
                        value={this.state.address}
                        multiline={"true"}
                    />
                    <Button title="Save" style={{margin:10}} onPress={() => this.updateUsersDetails()}/>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    formContainer: { flex: 1, width: '100%', alignItems: 'center' },
    formTextInput: { width: "75%", height: 35, alignSelf: 'center', borderColor: '#ffab91', borderRadius: 10, borderWidth: 1, marginTop: 20, padding: 10, },
    button: {  borderRadius: 10, backgroundColor: "#ff5722", shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, marginTop: 20 },
    buttonText: { fontSize: 18, fontWeight: "bold", color: "#fff" }
})