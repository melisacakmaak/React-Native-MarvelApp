import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View, ScrollView, Image, Linking} from 'react-native';
import styles from './CharacterDetail.styles';
import useFetch from '../../hooks/useFetch';
import Button from '../../Components/Button/Button';
import DetailCard from '../../Components/DetailCard';

const CharacterDetail = () => {
  const route = useRoute();
  const {id} = route.params;

  const {data} = useFetch(`characters/${id}`);

  async function openLink(url) {
    await Linking.openURL(url);
  }

  return (
    <ScrollView>
      <View style={styles.animated_header_component}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://static.wikia.nocookie.net/marveldatabase/images/e/e1/The_Marvel_Universe.png/revision/latest/scale-to-width-down/630?cb=20110513164401',
          }}
        />
      </View>
      {data &&
        data.map(characters => (
          <View style={styles.movieCard_container} key={characters.id}>
            <Text style={styles.name}>{characters.name}</Text>
            <Text style={styles.description}>{characters.description}</Text>
            <View style={styles.card_container}>
              <Text style={styles.card_text}>Comic:</Text>
              <ScrollView horizontal>
                {characters?.comics?.available > 0 &&
                  characters.comics.items.map(comic => (
                    <DetailCard comics={comic} />
                  ))}
              </ScrollView>
            </View>

            <View style={styles.card_container}>
              <Text style={styles.card_text}>Series</Text>
              <ScrollView horizontal>
                {characters?.series?.available > 0 &&
                  characters.series.items.map(comic => (
                    <DetailCard comics={comic} />
                  ))}
              </ScrollView>
            </View>
            <View style={styles.card_container}>
              <Text style={styles.card_text}>Detail Urls</Text>
              <ScrollView horizontal pagingEnabled>
                {characters?.urls &&
                  characters.urls.map(url => (
                    <Button
                      title={'Character ' + url.type}
                      onPress={() => openLink(url.url)}
                    />
                  ))}
              </ScrollView>
            </View>
          </View>
        ))}
    </ScrollView>
  );
};
export default CharacterDetail;
