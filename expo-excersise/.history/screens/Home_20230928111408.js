import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
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

  const GrabNews = () => {
    axios
      .get(url)
      .then((response) => {
        console.clear();
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <Button title="Grab Info" onPress={() => GrabNews()} />
      {data &&
        data.articles.map((d, index) => {
          return (
            <View key={index}>
              {d.urlToImage && (
                <Image
                  width={100}
                  height={100}
                  source={d.urlToImage}
                  alt="image"
                />
              )}
              <Text style={styles.author}>{d.author}</Text>
              <Text style={styles.title}>{d.title}</Text>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 10px,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  author: {
    fontSize: 10,
  },
});
