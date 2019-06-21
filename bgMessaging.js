import firebase from 'react-native-firebase';
// Optional flow type
import  { RemoteMessage } from 'react-native-firebase';

export default async (message) => {
    // handle your message
    console.warn(message.getData);
    alert(message);
    return Promise.resolve();
}