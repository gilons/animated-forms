import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PanResponder,
  Animated,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/Feather';

export default function AuthLayout(props) {
  const {title, children, goBack, maxHeight} = props;
  const marginY = React.useRef(new Animated.Value(100.0)).current;
  const imageOpacity = React.useRef(new Animated.Value(0.0)).current;
  const containerHeight = React.useRef(0);
  const currentImageHeight = React.useRef(0);
  const screenHeight = Dimensions.get('screen').height;
  const marginViewHeight = React.useRef(0);
  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        marginY.setOffset(marginY._value);
        imageOpacity.setOffset(imageOpacity._value);
      },
      onPanResponderMove: (_, gestureEvent) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        if (currentImageHeight.current <= 100) {
          const newOpacity = parseFloat(
            ((100 - currentImageHeight.current) / 100).toFixed(2),
          );
          imageOpacity.setValue(newOpacity);
        } else {
          imageOpacity.setValue(0.001);
        }
        marginY.setValue(gestureEvent.dy);
        //setPreviousMove(gestureEvent.dy)
        //return Animated.event([null, { dy: gestureEvent.dy }], { useNativeDriver: false })
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        marginY.flattenOffset();
        //imageOpacity.flattenOffset();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  function updateContainerHeight(event) {
    containerHeight.current = event.nativeEvent.layout.height;
  }

  /*function setPreviousMove(value) {
          if(timeout.current) clearTimeout(timeout.current)
          timeout.current = setTimeout(() => {
              containerHeight.current = value
              timeout.current = null
          },50)
      }*/

  function checkImageHeightAndReset(event) {
    currentImageHeight.current = event.nativeEvent.layout.height;
  }
  return (
    <ScrollView
      style={styles.scrollView}
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}>
      <View style={styles.mainContainer} onLayout={updateContainerHeight}>
        <View style={styles.goBackContainer}>
          <TouchableOpacity style={styles.goBack} onPress={goBack}>
            <AntDesign name={'arrow-left'} style={styles.iconStyle} />
          </TouchableOpacity>
          <View>
            <Animated.Image
              resizeMode={'cover'}
              source={require('../../images/image.jpg')}
              style={[styles.imageProfile, {opacity: imageOpacity}]}
            />
          </View>
        </View>
        <Animated.Image
          onLayout={checkImageHeightAndReset}
          resizeMode={'cover'}
          style={[styles.imageStyle(maxHeight), {height: marginY}]}
          source={require('../../images/image.jpg')}
        />
        <View style={styles.titleContainer}>
          <Text
            ellipsizeMode={'tail'}
            numberOfLines={1}
            style={styles.titleText}>
            {title}
          </Text>
        </View>
        {children}
        <View {...panResponder.panHandlers} style={styles.draggerContainer}>
          <View style={styles.dragger}></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 30,
    backgroundColor: 'white',
    width: '95%',
    borderTopLeftRadius: 0,
    marginBottom: '1%',
    borderTopRightRadius: 0,
    maxHeight: '99%',
    alignSelf: 'center',
    elevation: 6,
  },
  scrollView: {},
  imageStyle(maxHeight) {
    return {
      width: '100%',
      maxHeight: maxHeight || 300,
      opacity: 1,
    };
  },
  imageProfile: {
    width: 35,
    height: 35,
    borderRadius: 30,
    marginLeft: null,
    zIndex: 20,
    marginRight: '6%',
  },
  draggerContainer: {
    width: '90%',
    alignSelf: 'center',
    margin: '2%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    minHeight: 30,
    justifyContent: 'center',
  },
  dragger: {
    height: 4,
    opacity: 0.3,
    width: 100,
    backgroundColor: 'gray',
    borderRadius: 5,
    elevation: 1,
  },
  iconStyle: {
    color: 'black',
    fontSize: 20,
  },
  titleContainer: {
    marginTop: '8%',
    marginBottom: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  titleText: {
    fontWeight: '400',
    fontSize: 40,
  },
  goBack: {
    height: 30,
    width: 30,
    marginLeft: '6%',
    borderRadius: 25,
    elevation: 2,
    zIndex: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackContainer: {
    position: 'absolute',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: '10%',
  },
});
