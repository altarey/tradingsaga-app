import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {RobotoRegular} from '../../../config/fonts';
import Colors from '../../../config/colors';
import GAMEPLAY_ITEMS from '../../../config/gameplay';
import appScale from '../../../utils/appScale';

const ICON_SIZE = appScale(50);

const HelpGamePlay = () => {
  return (
    <FlatList
      data={GAMEPLAY_ITEMS}
      keyExtractor={(item) => item.title}
      renderItem={({item}) => {
        const {title, image, description, icon} = item;
        return (
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.imageContainer}>
              {image && <Image style={[styles.image, {height: image.size}]} source={image.source} />}
            </View>
            <View style={styles.contentContainer}>
              {icon && (
                <View style={styles.iconContainer}>
                  <Image style={styles.icon} source={icon} />
                </View>
              )}
              <Text style={styles.text}>{description}</Text>
            </View>
          </View>
        );
      }}
    />
  );
};

export default HelpGamePlay;

const styles = StyleSheet.create({
  container: {
    padding: appScale(4),
    marginBottom: appScale(10),
    paddingHorizontal: 20,
  },
  titleContainer: {
    padding: appScale(10),
    backgroundColor: Colors.MYRTLE.alt1,
    marginBottom: appScale(6),
  },
  titleText: {
    color: 'white',
    fontSize: appScale(20),
    fontWeight: 'bold',
    fontFamily: RobotoRegular,
  },
  contentContainer: {
    paddingHorizontal: appScale(10),
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  text: {
    color: 'white',
    fontSize: appScale(16),
    fontFamily: RobotoRegular,
    flex: 1,
    textAlign: 'justify',
  },
  imageContainer: {
    padding: appScale(10),
  },
  image: {
    resizeMode: 'contain',
  },
  iconContainer: {
    justifyContent: 'center',
    marginRight: appScale(16),
  },
  icon: {
    resizeMode: 'contain',
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
});
