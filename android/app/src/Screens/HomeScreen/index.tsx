// ./screens/HomeScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Welcome to FlyTime
      </Text>

      <Card style={styles.card}>
        <Card.Title title="Flight Booking" subtitle="Check flights easily" />
        <Card.Content>
          <Text>Book flights, view schedules, and manage bookings.</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.goBack}
      >
        Go to Details
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginVertical: 20,
    padding: 10,
  },
  button: {
    marginTop: 20,
  },
});
