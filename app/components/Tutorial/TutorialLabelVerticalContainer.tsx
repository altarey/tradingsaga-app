import React from 'react';
import {StyleSheet, View} from 'react-native';

const TutorialLabelVerticalContainer: React.FC<{top?: number; bottom?: number}> = ({children, top, bottom}) => (
  <View style={[styles.container, {top, bottom}]}>{children}</View>
);

export default TutorialLabelVerticalContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
});
