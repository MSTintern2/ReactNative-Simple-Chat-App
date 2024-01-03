import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const Chat = ({ route }) => {
    const { item } = route.params;
    const { rid } = route.params;
    // console.log(rid)
    // console.log(item.id)
    // console.log(item.name)
    // gifted chat 
    const [messages, setMessages] = useState([])
    //receive msg
    useEffect(() => {
        const sub = firestore().collection('chats').doc('' + rid + item.id).collection('messages').orderBy('createdAt', 'desc');
        sub.onSnapshot(querysnapshot => {
            const allmessages = querysnapshot.docs.map(item => {
                return {
                    ...item._data, createdAt: Date.parse(new Date())
                }
            });
            setMessages(allmessages);
        });
        return () => sub;
    }, [])
    //send msg
    const onSend = useCallback((messages = []) => {
        const msg = messages[0];
        //send personal data with msg by breaking message
        const myMsg = {
            ...msg,
            sendBy: rid,
            sendTo: item.id,
            createdAt: Date.parse(msg.createdAt),
        }
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, myMsg),
        );
        // to reference of chat in db (bcs if one user delete chat form its side, it will show to other user) 
        firestore().collection('chats').doc('' + rid + item.id).collection('messages').add(myMsg);
        firestore().collection('chats').doc('' + item.id + rid).collection('messages').add(myMsg);
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: rid,
                }}
                alwaysShowSend
                renderBubble={renderBubble}
            // renderSend={renderSend}
            />
        </View>
    )
}
// const renderSend = (props) => {
//     return (
//         <Send {...props}>
//             <View style={{alignItems:'center',justifyContent:'center'}}>
//                 <Image 
//                     style={{height:30,width:30,}}
//                     source={require("../assets/icons/send.png")}
//                 />
//             </View>
//         </Send>
//     )
// }
const renderBubble = (props) => {
    return (
        <Bubble
            {...props}
            wrapperStyle={{
                left: {
                    backgroundColor: 'lightgray'
                }
            }}
            textStyle={{
                left: {
                    color: '#000'
                }
            }}
        />
    )
}

export default Chat

const styles = StyleSheet.create({})