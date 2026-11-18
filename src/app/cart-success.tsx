import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartSuccessScreen() {
  const scale = useSharedValue(0.6);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Tatlı bir pop-in animasyonu
    scale.value = withSpring(1, { damping: 13, stiffness: 120 });
    opacity.value = withSpring(1);

    // 2.8 saniye sonra ana sayfaya otomatik yönlendirme
    const timer = setTimeout(() => {
      router.replace('/');
    }, 2800);

    return () => clearTimeout(timer);
  }, [scale, opacity]);

  const animatedBoxStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressScreen = () => {
    router.replace('/');
  };

  return (
    <Pressable
      onPress={handlePressScreen}
      style={styles.container}
      accessibilityRole="button"
      accessibilityLabel="Go back to home">
      <StatusBar style="light" />

      {/* Figma Frame 9 ile Birebir Mor/Mavi Arka Plan Gradyanı */}
      <LinearGradient
        colors={['#3B62DE', '#5A4ECA', '#6B3EB6', '#4A2882', '#1A1843']}
        locations={[0, 0.28, 0.55, 0.78, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          {/* Pembe Kutu ve Çift Tik İkonu (Assets'teki BG.png ve double_check.png) */}
          <Animated.View style={[styles.badgeWrapper, animatedBoxStyle]}>
            <Image
              source={require('@/assets/BG.png')}
              style={styles.bgBox}
              resizeMode="contain"
            />
            <Image
              source={require('@/assets/double_check.png')}
              style={styles.tickIcon}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Figma Başlık ve Açıklama Yazıları */}
          <Text style={styles.doneTitle}>Done!</Text>
          <Text style={styles.subText}>Oder added to the cart</Text>
        </View>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1843',
    ...(Platform.OS === 'web' && ({ cursor: 'pointer' } as any)),
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  badgeWrapper: {
    width: 118,
    height: 98,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 20,
    shadowColor: '#EF5DA8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  bgBox: {
    width: 118,
    height: 98,
    position: 'absolute',
  },
  tickIcon: {
    width: 58,
    height: 34,
    zIndex: 2,
  },
  doneTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
    marginBottom: 8,
    textAlign: 'center',
  },
  subText: {
    fontSize: 15,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.92)',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
