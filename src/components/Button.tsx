import React, {useContext} from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {ColorContext, ThemeContext} from '../context/ThemeContext';
import {Styles} from '../theme/GlobalStyles';

interface IButton {
  onPress: () => void;
  title: string;
  isBlue?: boolean;
  isGray?: boolean;
}

export const Button: React.FC<IButton> = ({title, onPress, isBlue, isGray}) => {
  const theme = useContext(ThemeContext);
  const color = useContext(ColorContext);
  return (
    <TouchableOpacity
      style={[
        isBlue
          ? [Styles.btnBlue, {backgroundColor: color}]
          : isGray
          ? [Styles.btnGray]
          : theme === 'light'
          ? [Styles.btnLight]
          : Styles.btnDark,
      ]}
      onPress={onPress}>
      <Text
        style={
          isBlue || isGray
            ? Styles.smallTextLight
            : theme === 'dark'
            ? Styles.smallTextLight
            : Styles.smallTextDark
        }>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
