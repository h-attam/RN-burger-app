import { StatusBar } from 'expo-status-bar';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-amber-50">
      <StatusBar style="dark" />
      <ScrollView contentContainerClassName="p-6 items-center">
        {/* Hero Section */}
        <View className="items-center mt-8 mb-6">
          <Text className="text-6xl mb-3">🍔</Text>
          <Text className="text-3xl font-extrabold text-amber-900 tracking-tight">
            Burger App
          </Text>
          <Text className="text-sm font-medium text-amber-700 mt-1 text-center">
            Expo + Tailwind CSS (NativeWind) Başarıyla Kuruldu!
          </Text>
        </View>

        {/* Feature Badges */}
        <View className="flex-row gap-2 mb-8">
          <View className="bg-amber-200/80 px-3 py-1.5 rounded-full border border-amber-300">
            <Text className="text-xs font-semibold text-amber-900">Expo SDK 58</Text>
          </View>
          <View className="bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-300">
            <Text className="text-xs font-semibold text-emerald-800">Tailwind CSS v3</Text>
          </View>
          <View className="bg-orange-100 px-3 py-1.5 rounded-full border border-orange-300">
            <Text className="text-xs font-semibold text-orange-800">NativeWind v4</Text>
          </View>
        </View>

        {/* Info Card */}
        <View className="w-full bg-white rounded-3xl p-6 shadow-sm border border-amber-100 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            🚀 Kurulum Tamamlandı
          </Text>
          <Text className="text-gray-600 text-sm leading-relaxed mb-4">
            Proje yapısı hazırlandı. Tailwind CSS sınıflarını (örneğin <Text className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded text-amber-800">{'className="bg-amber-500"'}</Text>) doğrudan React Native bileşenlerinizde kullanabilirsiniz.
          </Text>

          <View className="bg-amber-50 p-4 rounded-2xl border border-amber-200/60">
            <Text className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
              Sıradaki Adım
            </Text>
            <Text className="text-xs text-amber-800">
              Burger menüsü, sepet yönetimi veya detay ekranları gibi özellikleri adım adım inşa etmeye başlayabiliriz.
            </Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="w-full bg-amber-600 py-4 rounded-2xl items-center shadow-md active:bg-amber-700">
          <Text className="text-white font-bold text-base">
            Menüyü Keşfet 🍟
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
