import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const params = useLocalSearchParams<{
    id?: string;
    name?: string;
    description?: string;
    price?: string;
  }>();

  const title = params.name || 'Fresh Beef Burger with cheese';
  const description =
    params.description && params.description !== 'Beef with cheese'
      ? `${params.description}. Burger with crisp lettuce, pickled cucumbers, blue onions, grilled vegetables, and house dressing.`
      : 'Burger with a huge pork cutlet, pickled cucumbers, blue onions, grilled vegetables (green beans, bell peppers, carrots), oyster dressing, black cuttlefish ink bun.';

  const rawPriceStr = params.price || '$18.00';
  const unitPrice = parseFloat(rawPriceStr.replace(/[^0-9.]/g, '')) || 18.0;

  const [quantity, setQuantity] = useState(1);
  const totalPrice = `$${(unitPrice * quantity).toFixed(2)}`;

  // Animation shared value: 0 = State 1 (ilk görsel), 1 = State 2 (ikinci görsel / öne doğru sola kaymış)
  const animProgress = useSharedValue(0);
  const [webAnimated, setWebAnimated] = useState(false);

  useEffect(() => {
    // Sayfa açılır açılmaz öne ve sola doğru akıcı hareket
    animProgress.value = withTiming(1, {
      duration: 850,
      easing: Easing.out(Easing.cubic),
    });

    if (Platform.OS === 'web') {
      const timer = setTimeout(() => {
        setWebAnimated(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [animProgress]);

  // Burger Animasyon Stili (Daha sağdan başlayıp tam ORTADA konumlanma + öne gelerek büyüme)
  const animatedBurgerStyle = useAnimatedStyle(() => {
    const tx = interpolate(
      animProgress.value,
      [0, 1],
      [SCREEN_WIDTH * 0.22, 0]
    );
    const ty = interpolate(
      animProgress.value,
      [0, 1],
      [SCREEN_WIDTH * 0.02, 0]
    );
    const scale = interpolate(animProgress.value, [0, 1], [0.92, 1.04]);
    const rot = interpolate(animProgress.value, [0, 1], [3, 0]);

    return {
      transform: [
        { translateX: tx },
        { translateY: ty },
        { scale },
        { rotate: `${rot}deg` },
      ],
    };
  });

  // Domates Dilimi Animasyon Stili (Sağ alttan sol öne doğru fırlama ve dengeli konumlanma)
  const animatedTomatoStyle = useAnimatedStyle(() => {
    const tx = interpolate(
      animProgress.value,
      [0, 1],
      [SCREEN_WIDTH * 0.34, -SCREEN_WIDTH * 0.08]
    );
    const ty = interpolate(
      animProgress.value,
      [0, 1],
      [SCREEN_WIDTH * 0.12, SCREEN_WIDTH * 0.16]
    );
    const scale = interpolate(animProgress.value, [0, 1], [0.70, 1.04]);
    const rot = interpolate(animProgress.value, [0, 1], [18, -12]);

    return {
      transform: [
        { translateX: tx },
        { translateY: ty },
        { scale },
        { rotate: `${rot}deg` },
      ],
    };
  });

  // Web Platformu için CSS transition desteği
  const webBurgerStyle =
    Platform.OS === 'web'
      ? ({
          transition: 'transform 850ms cubic-bezier(0.33, 1, 0.68, 1)',
          transform: [
            {
              translateX: webAnimated ? 0 : SCREEN_WIDTH * 0.22,
            },
            {
              translateY: webAnimated ? 0 : SCREEN_WIDTH * 0.02,
            },
            { scale: webAnimated ? 1.04 : 0.92 },
            { rotate: webAnimated ? '0deg' : '3deg' },
          ],
        } as any)
      : undefined;

  const webTomatoStyle =
    Platform.OS === 'web'
      ? ({
          transition: 'transform 850ms cubic-bezier(0.33, 1, 0.68, 1)',
          transform: [
            {
              translateX: webAnimated
                ? -SCREEN_WIDTH * 0.08
                : SCREEN_WIDTH * 0.34,
            },
            {
              translateY: webAnimated
                ? SCREEN_WIDTH * 0.16
                : SCREEN_WIDTH * 0.12,
            },
            { scale: webAnimated ? 1.04 : 0.70 },
            { rotate: webAnimated ? '-12deg' : '18deg' },
          ],
        } as any)
      : undefined;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Figma ile Birebir Koyu Mavi/Mor Arka Plan Gradyanı */}
      <LinearGradient
        colors={['#6A52DA', '#4834A2', '#1B2664', '#0D193B', '#071026']}
        locations={[0, 0.26, 0.55, 0.8, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Üst Navigasyon Çubuğu */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.back()}
            style={styles.iconButton}>
            <Ionicons name="arrow-back" size={26} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
            <Ionicons name="ellipsis-horizontal" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Görsel Sahnesi: Burger ve Uçan Domates Dilimi */}
        <View style={styles.heroSection}>
          {/* Ana Burger Görseli */}
          <Animated.Image
            source={require('@/assets/detail_burger.png')}
            style={[
              styles.burgerImage,
              Platform.OS === 'web' ? webBurgerStyle : animatedBurgerStyle,
            ]}
            resizeMode="contain"
          />

          {/* Sliced Tomato (Öne ve Sola Doğru Uçan Domates Dilimi) */}
          <Animated.Image
            source={require('@/assets/detail_sliced_tomato.png')}
            style={[
              styles.tomatoImage,
              Platform.OS === 'web' ? webTomatoStyle : animatedTomatoStyle,
            ]}
            resizeMode="contain"
          />
        </View>

        {/* Alt İçerik Alanı */}
        <View style={styles.bottomContent}>
          {/* Başlık */}
          <Text style={styles.titleText}>{title}</Text>

          {/* Açıklama */}
          <Text style={styles.descText}>{description}</Text>

          {/* Miktar ve Fiyat Kartı */}
          <View style={styles.priceCard}>
            {/* Sol Miktar Seçici (+ 1 -) */}
            <View style={styles.quantityRow}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setQuantity((q) => q + 1)}
                style={styles.qtyButton}>
                <Ionicons name="add" size={18} color="#000000" />
              </TouchableOpacity>

              <Text style={styles.qtyText}>{quantity}</Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                style={styles.qtyButton}>
                <Ionicons name="remove" size={18} color="#000000" />
              </TouchableOpacity>
            </View>

            {/* Sağ Toplam Fiyat */}
            <View style={styles.priceContainer}>
              <Text style={styles.totalPriceLabel}>Total price</Text>
              <Text style={styles.totalPriceText}>{totalPrice}</Text>
            </View>
          </View>

          {/* Sepete Ekle Butonu (Add to cart) */}
          <TouchableOpacity activeOpacity={0.85} style={styles.addToCartButton}>
            <Image
              source={require('@/assets/Vector.png')}
              style={styles.cartIcon}
              resizeMode="contain"
            />
            <Text style={styles.addToCartText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#071026',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 4,
    zIndex: 20,
  },
  iconButton: {
    padding: 6,
  },
  heroSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible',
    minHeight: SCREEN_HEIGHT * 0.38,
  },
  burgerImage: {
    width: Math.min(SCREEN_WIDTH * 0.94, 400),
    height: Math.min(SCREEN_WIDTH * 0.72, 310),
    zIndex: 2,
  },
  tomatoImage: {
    position: 'absolute',
    width: 188.82,
    height: 141.62,
    zIndex: 10,
  },
  bottomContent: {
    paddingHorizontal: 28,
    paddingBottom: Platform.OS === 'ios' ? 12 : 24,
  },
  titleText: {
    fontSize: 27,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 35,
    letterSpacing: 0.2,
  },
  descText: {
    fontSize: 13.5,
    color: '#B5C4E3',
    lineHeight: 20,
    marginTop: 10,
    fontWeight: '400',
  },
  priceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(23, 44, 78, 0.75)',
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 16,
    marginTop: 22,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  qtyText: {
    fontSize: 19,
    fontWeight: '600',
    color: '#FFFFFF',
    marginHorizontal: 16,
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  totalPriceLabel: {
    fontSize: 11.5,
    color: '#8A9DBA',
    fontWeight: '400',
    marginBottom: 1,
  },
  totalPriceText: {
    fontSize: 27,
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  addToCartButton: {
    height: 54,
    backgroundColor: '#EF5DA8',
    borderRadius: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF5DA8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  cartIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
    marginRight: 10,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
