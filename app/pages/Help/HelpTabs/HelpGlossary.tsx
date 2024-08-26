import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {RobotoRegular} from '../../../config/fonts';
import Colors from '../../../config/colors';
import GLOSSARY from '../../../config/glossary';
import TextLink from '../../../components/Text/TextLink';
import appScale from '../../../utils/appScale';

const HelpGlossary = () => {
  return (
    <FlatList
      style={styles.flatList}
      data={GLOSSARY}
      keyExtractor={(item) => item.title}
      renderItem={({item}) => {
        const {title, description, readMoreLink} = item;
        return (
          <View style={styles.itemContainer}>
            <View style={styles.titleView}>
              <Text style={[styles.text, styles.titleText]}>{title}</Text>
            </View>
            <Text style={[styles.text, styles.descriptionText]}>
              {description}{' '}
              {readMoreLink && (
                <TextLink style={[styles.text, styles.seeMoreLink]} url={readMoreLink} label="Read more..." />
              )}
            </Text>
          </View>
        );
      }}
    />
  );
};

export default HelpGlossary;

const styles = StyleSheet.create({
  flatList: {
    padding: appScale(10),
  },
  itemContainer: {
    marginBottom: appScale(24),
  },
  text: {
    fontFamily: RobotoRegular,
    color: Colors.WHITE.default,
    paddingHorizontal: appScale(10),
    textAlign: 'justify',
  },
  seeMoreLink: {
    fontSize: appScale(16),
  },
  titleView: {
    backgroundColor: Colors.MYRTLE.alt1,
    minHeight: appScale(40),
    justifyContent: 'center',
    marginBottom: appScale(16),
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: appScale(18),
    paddingHorizontal: appScale(10),
  },
  descriptionText: {
    fontSize: appScale(16),
  },
});
