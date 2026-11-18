import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface BurgerItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: any;
}

const BURGERS: BurgerItem[] = [
  {
    id: '1',
    name: 'Beef Burger',
    description: 'Beef with cheese',
    price: '$18.00',
    image: require('@/assets/burgers/beef-burger.png'),
  },
  {
    id: '2',
    name: 'Rancho Burger',
    description: 'Beef with egg',
    price: '$16.00',
    image: require('@/assets/burgers/rancho-burger.png'),
  },
  {
    id: '3',
    name: 'Tehas Burger',
    description: 'Beef with tomato',
    price: '$12.00',
    image: require('@/assets/burgers/tehas-burger.png'),
  },
  {
    id: '4',
    name: 'Chicken Burger',
    description: 'Beef with chiken',
    price: '$9.00',
    image: require('@/assets/burgers/chicken-burger.png'),
  },
];

const CATEGORIES = ['Burger', 'Pasta', 'Salads'];

function BurgerCardContent({
  burger,
  index,
  isHovered,
}: {
  burger: BurgerItem;
  index: number;
  isHovered: boolean;
}) {
  // 1. ve 3. ürünler (sol kolon, index 0 ve 2) -> Sağa dönecek (+10deg)
  // 2. ve 4. ürünler (sağ kolon, index 1 ve 3) -> Sola dönecek (-10deg)
  const isRightColumn = index % 2 === 1;
  const targetRotation = isRightColumn ? -10 : 10;

  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const translateY = useSharedValue(0);
  const glowScale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(isHovered ? 1.62 : 1, {
      damping: 14,
      stiffness: 180,
    });
    rotate.value = withSpring(isHovered ? targetRotation : 0, {
      damping: 14,
      stiffness: 180,
    });
    translateY.value = withSpring(isHovered ? -14 : 0, {
      damping: 14,
      stiffness: 180,
    });
    glowScale.value = withSpring(isHovered ? 1.15 : 1, {
      damping: 14,
      stiffness: 180,
    });
  }, [isHovered, targetRotation, scale, rotate, translateY, glowScale]);

  const animatedBurgerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { rotate: `${rotate.value}deg` },
        { scale: scale.value },
      ],
    };
  });

  const animatedGlowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: glowScale.value }],
    };
  });

  const webBurgerStyle =
    Platform.OS === 'web'
      ? ({
          transitionProperty: 'transform',
          transitionDuration: '300ms',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: [
            { translateY: isHovered ? -14 : 0 },
            { rotate: isHovered ? `${targetRotation}deg` : '0deg' },
            { scale: isHovered ? 1.62 : 1 },
          ],
        } as any)
      : undefined;

  const webGlowStyle =
    Platform.OS === 'web'
      ? ({
          transitionProperty: 'transform',
          transitionDuration: '300ms',
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: [{ scale: isHovered ? 1.15 : 1 }],
        } as any)
      : undefined;

  return (
    <View style={[styles.innerWrapper, isHovered && styles.activeCard]}>
      {/* Burger Image Container with Soft Glow Box */}
      <View pointerEvents="none" style={styles.imageBox}>
        {/* Rectangle 2 from assets */}
        {Platform.OS === 'web' ? (
          <Image
            source={require('@/assets/Rectangle 2.png')}
            style={[styles.glowBg, webGlowStyle]}
            resizeMode="contain"
          />
        ) : (
          <Animated.Image
            source={require('@/assets/Rectangle 2.png')}
            style={[styles.glowBg, animatedGlowStyle]}
            resizeMode="contain"
          />
        )}
        {/* Animated Burger Photo */}
        {Platform.OS === 'web' ? (
          <Image
            source={burger.image}
            style={[styles.burgerImg, webBurgerStyle]}
            resizeMode="contain"
          />
        ) : (
          <Animated.Image
            source={burger.image}
            style={[styles.burgerImg, animatedBurgerStyle]}
            resizeMode="contain"
          />
        )}
      </View>

      {/* Burger Texts & Price */}
      <View pointerEvents="none" style={styles.cardInfo}>
        <Text style={styles.burgerName} numberOfLines={1}>
          {burger.name}
        </Text>

        <Text style={styles.burgerDesc} numberOfLines={1}>
          {burger.description}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.burgerPrice}>{burger.price}</Text>

          <View style={styles.addButton}>
            <Ionicons name="add" size={17} color="#FFFFFF" />
          </View>
        </View>
      </View>
    </View>
  );
}

function AnimatedBurgerCard({
  burger,
  index,
}: {
  burger: BurgerItem;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverIn = () => setIsHovered(true);
  const handleHoverOut = () => setIsHovered(false);

  const webMouseHandlers =
    Platform.OS === 'web'
      ? ({
          onMouseEnter: handleHoverIn,
          onMouseLeave: handleHoverOut,
          onPointerEnter: handleHoverIn,
          onPointerLeave: handleHoverOut,
        } as any)
      : {};

  return (
    <View
      {...webMouseHandlers}
      style={[styles.card, isHovered && styles.activeCard]}>
      <Pressable
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
        onPressIn={handleHoverIn}
        onPressOut={handleHoverOut}
        {...webMouseHandlers}
        style={[
          styles.cardInner,
          Platform.OS === 'web' && ({ cursor: 'pointer' } as any),
        ]}>
        <BurgerCardContent
          burger={burger}
          index={index}
          isHovered={isHovered}
        />
      </Pressable>
    </View>
  );
}

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Burger');

  return (
    <View style={styles.container} className="flex-1 bg-[#2562C8]">
      <StatusBar style="light" />

      {/* Full Background Gradient matching Figma */}
      <LinearGradient
        colors={['#2562C8', '#485BD2', '#7652DC', '#5635B8', '#321D74']}
        locations={[0, 0.22, 0.55, 0.78, 1]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        {/* Top Header */}
        <View style={styles.header}>
          {/* Three-Line Staggered Menu Icon */}
          <TouchableOpacity activeOpacity={0.7} style={styles.menuButton}>
            <View style={styles.menuLineTop} />
            <View style={styles.menuLineMiddle} />
            <View style={styles.menuLineBottom} />
          </TouchableOpacity>

          {/* Bell / Notification Icon */}
          <TouchableOpacity activeOpacity={0.7} style={styles.bellButton}>
            <Ionicons name="notifications" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Title & Subtitle */}
          <View style={styles.titleSection}>
            <Text style={styles.titleText}>Good Bites</Text>
            <Text style={styles.subtitleText}>delicious burgers!</Text>
          </View>

          {/* Category Tabs Pill Bar */}
          <View style={styles.categoryBar}>
            <View style={styles.categoryList}>
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    activeOpacity={0.7}
                    onPress={() => setSelectedCategory(cat)}
                    style={styles.categoryItem}>
                    {isSelected && <View style={styles.categoryDot} />}
                    <Text
                      style={[
                        styles.categoryText,
                        isSelected && styles.categoryTextSelected,
                      ]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Filter / Sort Icon (3 Lines) */}
            <TouchableOpacity activeOpacity={0.7} style={styles.filterButton}>
              <View style={styles.filterLine1} />
              <View style={styles.filterLine2} />
              <View style={styles.filterLine3} />
            </TouchableOpacity>
          </View>

          {/* Burgers 2-Column Grid */}
          <View style={styles.gridContainer}>
            {BURGERS.map((burger, index) => (
              <AnimatedBurgerCard
                key={burger.id}
                burger={burger}
                index={index}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Floating Bottom Navigation Bar (Figma Rectangle 6) */}
      <View
        style={[
          styles.bottomBar,
          Platform.OS === 'web' &&
            ({
              boxShadow: '0px 10px 4px rgba(0, 0, 0, 0.25)',
            } as any),
        ]}>
        {/* Arka plan katmanı: Figma matrix(1, 0, 0, -1, 0, 0) */}
        <View style={styles.bottomBarBg} pointerEvents="none" />

        {/* Location Pin */}
        <TouchableOpacity activeOpacity={0.7} style={styles.navButton}>
          <Image
            source={require('@/assets/location-icon.png')}
            style={styles.locationIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Center Pink Cart Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.pinkCartButton}>
          <Image
            source={require('@/assets/Vector.png')}
            style={styles.cartIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Piggy Bank Icon from Assets */}
        <TouchableOpacity activeOpacity={0.7} style={styles.navButton}>
          <Image
            source={require('@/assets/Vector (1).png')}
            style={styles.piggyIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const CARD_WIDTH = (SCREEN_WIDTH - 24 * 2 - 16) / 2;
const BOX_SIZE = Math.min(CARD_WIDTH, 142);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2562C8',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  menuButton: {
    width: 32,
    padding: 6,
    justifyContent: 'center',
  },
  menuLineTop: {
    width: 11,
    height: 2.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  menuLineMiddle: {
    width: 20,
    height: 2.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginBottom: 4,
  },
  menuLineBottom: {
    width: 11,
    height: 2.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  bellButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120,
  },
  titleSection: {
    marginTop: 6,
    marginBottom: 22,
  },
  titleText: {
    fontSize: 36,
    fontWeight: '400',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    marginTop: 4,
  },
  categoryBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  categoryList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
  },
  categoryDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: '#F8A816',
    marginRight: 7,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#BDB6EE',
  },
  categoryTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  filterButton: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterLine1: {
    width: 18,
    height: 2.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginBottom: 3.5,
  },
  filterLine2: {
    width: 12,
    height: 2.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginBottom: 3.5,
  },
  filterLine3: {
    width: 6,
    height: 2.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'visible',
  },
  card: {
    width: CARD_WIDTH,
    marginBottom: 28,
    alignItems: 'center',
    zIndex: 1,
    overflow: 'visible',
  },
  activeCard: {
    zIndex: 30,
  },
  cardInner: {
    width: '100%',
    alignItems: 'center',
    overflow: 'visible',
  },
  innerWrapper: {
    width: BOX_SIZE,
    overflow: 'visible',
  },
  cardInfo: {
    width: '100%',
    paddingLeft: 8,
    paddingRight: 2,
  },
  imageBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
    overflow: 'visible',
  },
  glowBg: {
    position: 'absolute',
    width: BOX_SIZE,
    height: BOX_SIZE,
  },
  burgerImg: {
    width: BOX_SIZE * 0.94,
    height: BOX_SIZE * 0.8,
  },
  burgerName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 0.2,
    alignSelf: 'flex-start',
  },
  burgerDesc: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
    alignSelf: 'flex-start',
  },
  priceRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  burgerPrice: {
    color: '#88F9E4',
    fontSize: 15,
    fontWeight: '400',
  },
  addButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#381E6E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  bottomBar: {
    position: 'absolute',
    left: '2.93%' as any,
    right: '3.2%' as any,
    top: '91.5%' as any,
    bottom: '1.6%' as any,
    backgroundColor: '#FFFFFF',
    borderRadius: 47,
    paddingHorizontal: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  bottomBarBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 47,
    transform: [{ scaleY: -1 }],
  },
  navButton: {
    padding: 8,
  },
  pinkCartButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EF5DA8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF5DA8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  cartIcon: {
    width: 22,
    height: 20,
    tintColor: '#FFFFFF',
  },
  locationIcon: {
    width: 26,
    height: 24,
  },
  piggyIcon: {
    width: 26,
    height: 24,
  },
});
