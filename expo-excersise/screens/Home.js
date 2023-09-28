import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import axios from "axios";

export default function Home({ navigation }) {
  const [data, setData] = useState();

  var apiKey = "a896ed42f48f426f9a9d8ceacefc15f0";
  var type = "tesla";
  var dateFrom = "2023-09-25";
  var dateTo = "2023-09-25";
  var sortBy = "publishedAt";
  var pageSize = 5;

  const url = `https://newsapi.org/v2/everything?q=${type}&from=${dateFrom}&to=${dateTo}&sortBy=${sortBy}&apiKey=${apiKey}&pageSize=${pageSize}`;

  const [buttonClicked, setButtonClicked] = useState(false);

  const GrabNews = () => {
    axios
      .get(url)
      .then((response) => {
        console.clear();
        setData(response.data);
        console.log(response.data);
        setButtonClicked(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {!buttonClicked ? (
          <Button onPress={() => GrabNews()} title="Grab Info" />
        ) : null}
        {data &&
          data.articles.map((d, index) => {
            return (
              <View key={index}>
                {d.urlToImage && (
                  <View style={styles.image}>
                    <Image
                      width={150}
                      height={150}
                      source={d.urlToImage}
                      alt="image"
                    />
                  </View>
                )}
                <Text style={styles.author}>{d.author}</Text>
                <Text style={styles.title}>{d.title}</Text>
              </View>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  author: {
    fontSize: 15,
  },
  image: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
  },
});
