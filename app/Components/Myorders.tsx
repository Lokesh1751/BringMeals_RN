import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, ListRenderItem, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebase.config';
import { User } from 'firebase/auth';
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, query, where } from 'firebase/firestore';

interface OrderItem {
  description: string;
  imageUrl: string;
  name: string;
  price: number;
}

interface Order {
  id: string;
  address: string;
  finalTotal: string;
  gst: string;
  items: OrderItem[];
  timestamp: any;  
  totalPrice: number;
  userEmail: string;
}

const Myorders: React.FC = ({navigation}: any) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user: User | null = auth.currentUser;
        if (user) {
          const userEmail = user.email;
          const q = query(collection(FIRESTORE_DB, 'orders'), where('userEmail', '==', userEmail));
          const querySnapshot = await getDocs(q);

          const fetchedOrders: Order[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as Order));

          setOrders(fetchedOrders);
        }
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderItem: ListRenderItem<Order> = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.address}>Address: {item.address}</Text>
      <Text style={styles.total}>Final Total: ${item.finalTotal}</Text>
      <Text style={styles.gst}>GST: ${item.gst}</Text>
      <FlatList
        data={item.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          </View>
        )}
      />
      <Text style={styles.timestamp}>Order Time: {new Date(item.timestamp.toDate()).toLocaleString()}</Text>
      <Text style={styles.totalPrice}>Total Price: ${item.totalPrice}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={30} color="#C2410D" />
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#C2410D" />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No orders found</Text>}
        />
      )}
    </View>
  );
};

export default Myorders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingTop: 60,
    color: "#C2410D",
    textAlign: "center",
  },
  orderContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  address: {
    fontSize: 16,
    marginBottom: 8,
  },
  total: {
    fontSize: 16,
    marginBottom: 8,
  },
  gst: {
    fontSize: 16,
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#555',
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 1,
  },
});
