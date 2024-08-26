import {Insets, StyleSheet, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import {RobotoRegular} from '../../../config/fonts';
import Colors from '../../../config/colors';
import appScale from '../../../utils/appScale';
import {IS_iOS} from '../../../utils/environment';

interface HelpTabProps {
  onPress: () => void;
  title: string;
  isSelected: boolean;
}

const HIT_SLOP: Insets = {
  left: appScale(15),
  right: appScale(15),
  top: appScale(5),
  bottom: appScale(5),
};

const HelpTab: React.FC<HelpTabProps> = ({onPress, title, isSelected}) => {
  return (
    <TouchableHighlight
      hitSlop={IS_iOS ? undefined : HIT_SLOP}
      underlayColor={Colors.MYRTLE.default}
      onPress={isSelected ? undefined : onPress}
      style={[styles.tab, isSelected ? styles.selectedTab : undefined]}>
      <Text style={styles.tabText}>{title}</Text>
    </TouchableHighlight>
  );
};

export default HelpTab;

const styles = StyleSheet.create({
  tab: {
    marginHorizontal: appScale(40),
    borderBottomColor: Colors.MYRTLE.alt1,
    borderBottomWidth: 1,
    opacity: 0.4,
  },
  selectedTab: {
    opacity: 1,
    borderBottomColor: Colors.LIME_GREEN.default,
  },
  tabText: {
    color: Colors.LIME_GREEN.default,
    fontSize: appScale(20),
    fontWeight: 'bold',
    fontFamily: RobotoRegular,
  },
});
