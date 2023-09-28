import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { useState } from "react";

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
      <TouchableOpacity onPress={() => GrabNews()}>Grab Info</TouchableOpacity>
      {data &&
        data.articles.map((d, index) => {
          return (
            <View key={index}>
              {d.urlToImage && (
                <Image width={50} height={50} src={d.urlToImage} alt="image" />
              )}
              <View>{d.author}</View>
              <View>{d.title}</View>
            </View>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
