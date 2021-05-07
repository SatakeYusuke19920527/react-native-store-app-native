import React, { useState, useContext } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import firebase from 'firebase';
import { updateUser } from '../lib/firebase';
/* components */
import { Form } from '../components/Form';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';
/* contexts */
import { UserContext } from '../contexts/UserContext';
/* types */
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'User'>;
  route: RouteProp<RootStackParamList, 'User'>;
};

const UserScreen: React.FC<{}> = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState<string>(user!.name);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setLoading(true);
    const updateAt = firebase.firestore.Timestamp.now();
    const uid = user?.id;
    await updateUser(uid!, { name, updateAt });
    setUser({ ...user, name, updateAt });
    setLoading(false);
    setName('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        label="名前"
      />
      <Button onPress={onSubmit} text="保存する" />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default UserScreen;
