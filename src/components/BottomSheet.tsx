import React, {ReactNode, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {colors} from '../theme/Colors';
import {normalize} from '../theme/metrics';

interface IBottomSheet {
  setStatus?: any;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  Children?: ReactNode;
  buttonText?: string;
  title?: string;
  onPress?: () => void;
}

export const BottomSheet: React.FC<IBottomSheet> = ({
  setStatus,
  style,
  Children,
  buttonText,
  title,
  onPress,
  titleStyle,
}) => {
  const slide = React.useRef(new Animated.Value(300)).current;
  const lastOffset = React.useRef(0);
  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationY: slide}}],
    {useNativeDriver: true},
  );

  const slideUp = () => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      lastOffset.current = 0;
      slide.setOffset(lastOffset.current);
      slide.setValue(0);
    });
  };

  const slideDown = () => {
    Animated.timing(slide, {
      toValue: 300,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      lastOffset.current = 300;
      slide.setOffset(lastOffset.current);
      slide.setValue(0);
    });
  };

  useEffect(() => {
    slideUp();
  }, []);

  const closeModal = () => {
    slideDown();

    setTimeout(() => {
      setStatus(false);
    }, 800);
  };

  return (
    <Pressable onPress={closeModal} style={styles.backdrop}>
      <Pressable style={[styles.size]}>
        <GestureHandlerRootView>
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={event => {
              if (event.nativeEvent.oldState === 4) {
                lastOffset.current += event.nativeEvent.translationY;
                if (lastOffset.current >= 300) {
                  closeModal();
                } else {
                  slideUp();
                }
              }
            }}>
            <Animated.View
              style={[
                styles.bottomSheet,
                {
                  transform: [
                    {translateY: Animated.add(slide, lastOffset.current)},
                  ],
                },
                style,
              ]}>
              <View style={styles.handle} />
              {Children}
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  handle: {
    backgroundColor: colors.light,
    width: 48,
    height: 5,
    alignSelf: 'center',
    marginVertical: normalize('vertical', 8),
  },
  backdrop: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: colors.backdrop,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },

  size: {
    width: '100%',
    height: '35%',
  },
  bottomSheet: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: normalize('horizontal', 24),
  },
  foot: {marginTop: 20},
});
