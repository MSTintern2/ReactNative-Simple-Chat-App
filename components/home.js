import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
    const navigation = useNavigation();
    const [user1Data, setUser1Data] = useState("")
    const [user2Data, setUser2Data] = useState("")
    const [user1DataId, setUser1DataId] = useState("")
    const [user2DataId, setUser2DataId] = useState("")
    //get user data
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        try {
            const user1 = await firestore().collection('users').doc('1').get();
            const user2 = await firestore().collection('users').doc('2').get();
            setUser1Data(user1._data)
            setUser2Data(user2._data)
            setUser1DataId(user1._data.id)
            setUser2DataId(user2._data.id)
            // console.log(user1DataId)
            // console.log(user2DataId)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View>
            <View style={{marginVertical:10,marginLeft:20,}}>
                <Text style={{ fontSize: 26, fontWeight: '600', color:'#000'}}>Sender Users</Text>
            </View>
            <TouchableOpacity
                style={{ padding: 10, borderWidth: 1, borderColor: '#000', borderRadius: 12, marginVertical: 8, marginHorizontal: 24, }}
                onPress={() => navigation.navigate("chat",{item:user2Data, rid:user1DataId})}
            >
                <View style={{ flexDirection: 'row', alignItems: "center", gap: 12 }}>
                    <Image
                        style={{ height: 60, width: 60, borderRadius: 30 }}
                        source={require("../assets/user1.png")}
                    />
                    <View>
                    <Text style={{ fontSize: 24, fontWeight: '600', color:'#000'}}>
                        {user1Data.name}, Id:{user1Data.id}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: '600', color:'#000'}}>
                        Send message to Emma Amelia Id:2
                    </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={{ padding: 10, borderWidth: 1, borderColor: '#000', borderRadius: 12, marginVertical: 8, marginHorizontal: 24, }}
                onPress={() => navigation.navigate("chat",{item:user1Data, rid:user2DataId})}
            >
                <View style={{ flexDirection: 'row', alignItems: "center", gap: 12 }}>
                    <Image
                        style={{ height: 60, width: 60, borderRadius: 30 }}
                        source={require("../assets/user2.png")}
                    />
                    <View>
                    <Text style={{ fontSize: 24, fontWeight: '600', color:'#000'}}>
                        {user2Data.name}, Id:{user2Data.id}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: '600', color:'#000'}}>
                        Send message to Ashfak Sayem Id:1
                    </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}


export default Home

const styles = StyleSheet.create({})