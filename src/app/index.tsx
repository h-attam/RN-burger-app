import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
          {/* Two-Line Menu Icon */}
          <TouchableOpacity activeOpacity={0.7} style={styles.menuButton}>
            <View style={styles.menuLineTop} />
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
            {BURGERS.map((burger) => (
              <View key={burger.id} style={styles.card}>
                <View style={styles.cardInner}>
                  {/* Burger Image Container with Soft Glow Box */}
                  <View style={styles.imageBox}>
                    {/* Rectangle 2 from assets */}
                    <Image
                      source={require('@/assets/Rectangle 2.png')}
                      style={styles.glowBg}
                      resizeMode="contain"
                    />
                    {/* Actual Burger Photo */}
                    <Image
                      source={burger.image}
                      style={styles.burgerImg}
                      resizeMode="contain"
                    />
                  </View>

                  {/* Burger Texts & Price */}
                  <View style={styles.cardInfo}>
                    <Text style={styles.burgerName} numberOfLines={1}>
                      {burger.name}
                    </Text>

                    <Text style={styles.burgerDesc} numberOfLines={1}>
                      {burger.description}
                    </Text>

                    <View style={styles.priceRow}>
                      <Text style={styles.burgerPrice}>{burger.price}</Text>

                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.addButton}>
                        <Ionicons name="add" size={17} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Floating Bottom Navigation Bar */}
        <View style={styles.bottomBarContainer}>
          <View style={styles.bottomBar}>
            {/* Location Pin */}
            <TouchableOpacity activeOpacity={0.7} style={styles.navButton}>
              <Ionicons name="location-outline" size={26} color="#2A6CD6" />
            </TouchableOpacity>

            {/* Center Floating Pink Cart Button */}
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
      </SafeAreaView>
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
    padding: 6,
    justifyContent: 'center',
  },
  menuLineTop: {
    width: 22,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginBottom: 5,
  },
  menuLineBottom: {
    width: 14,
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
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
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  filterLine1: {
    width: 16,
    height: 2.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginBottom: 3,
  },
  filterLine2: {
    width: 11,
    height: 2.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    marginBottom: 3,
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
  },
  card: {
    width: CARD_WIDTH,
    marginBottom: 28,
    alignItems: 'center',
  },
  cardInner: {
    width: BOX_SIZE,
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
  },
  glowBg: {
    position: 'absolute',
    width: BOX_SIZE,
    height: BOX_SIZE,
  },
  burgerImg: {
    width: BOX_SIZE * 0.9,
    height: BOX_SIZE * 0.75,
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
    color: '#80BDF3',
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
  bottomBarContainer: {
    position: 'absolute',
    bottom: 22,
    left: 20,
    right: 20,
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    height: 64,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 12,
  },
  navButton: {
    padding: 8,
  },
  pinkCartButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#EF4B81',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -22,
    shadowColor: '#EF4B81',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },
  cartIcon: {
    width: 24,
    height: 22,
    tintColor: '#FFFFFF',
  },
  piggyIcon: {
    width: 26,
    height: 24,
  },
});
