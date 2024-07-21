import {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  FlatList,
} from 'react-native';
import {colors} from './src/theme/Colors';
import {ColorContext, ThemeContext} from './src/context/ThemeContext';
import {MyKeyboard} from './src/components/MyKeyboard';
import {BottomSheet} from './src/components/BottomSheet';
import {SvgImage} from './src/components/SvgImages';
import {dataColor} from './src/data/dataColor';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [color, setColor] = useState(colors.blue);
  const [bottomSheet, setBottomSheet] = useState<boolean>(false);

  const handleOnPress = (color: string) => {
    setColor(color);
    setBottomSheet(false);
  };
  return (
    <ThemeContext.Provider value={theme}>
      <ColorContext.Provider value={color}>
        <SafeAreaView
          style={
            theme === 'light'
              ? styles.container
              : [styles.container, styles.containColor]
          }>
          <Pressable style={styles.icon} onPress={() => setBottomSheet(true)}>
            <SvgImage
              color={theme === 'light' ? colors.dark : colors.white}
              source={require('./src/assets/settings.svg')}
            />
          </Pressable>

          <MyKeyboard />
          {bottomSheet && (
            <BottomSheet
              Children={
                <FlatList
                  numColumns={4}
                  data={dataColor}
                  ListHeaderComponent={
                    <Switch
                      value={theme === 'dark'}
                      onValueChange={() =>
                        setTheme(theme === 'light' ? 'dark' : 'light')
                      }
                    />
                  }
                  renderItem={({item, index}) => (
                    <Pressable
                      onPress={() => handleOnPress(item.color)}
                      key={index}
                      style={{
                        backgroundColor: item.color,
                        width: 50,
                        height: 50,
                        margin: 10,
                      }}
                    />
                  )}
                />
              }
              setStatus={setBottomSheet}
            />
          )}
        </SafeAreaView>
      </ColorContext.Provider>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    alignSelf: 'flex-end',
    padding: 25,
  },
  containColor: {backgroundColor: 'black'},
});
