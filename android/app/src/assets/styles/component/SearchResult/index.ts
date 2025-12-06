import { StyleSheet } from 'react-native';
import { variable } from '../../variable';

export const Searchstyles = StyleSheet.create({
  UserMessage: {
    backgroundColor: variable.basecolor1Dark, // replace $basecolor1-dark
    color: '#0B1729',
    borderRadius: 22,
    maxWidth: '70%',
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 34,
  },

  UserMessageText: {
    color: variable.basecolorDark,
    margin: 0,
  },

  AiMessage: {
    color: '#0B1729',
    width: '100%',
    paddingBottom: 34,
    minWidth: '100%',
    flexDirection: 'row', // same as display: flex (default is column)
  },

  AiMessageText: {
    color: variable.basecolorDark, // replace $basecolor-dark
    margin: 0,
  },

  AiMessageNormal: {
    paddingRight: 34,
  },

  Box: {
    // Uncomment if you want styles same as SCSS
    // paddingVertical: 10,
    // paddingHorizontal: 24,
    // borderRadius: 22,
    // backgroundColor: '#F2F6F4',
  },
});
