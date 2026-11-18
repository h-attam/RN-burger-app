# Burger Siparis Uygulamasi (RN Burger App)

Bu proje, modern bir mobil restoran ve burger siparis arayuzunun Figma tasarimina birebir sadik kalinarak gelistirilmis bir React Native uygulamasidir. Figma prototipindeki tum detaylar, renk gecisleri, tipografi ve mikro-etkilesimli animasyonlar ozenle koda aktarilmistir.

## Ekran Goruntusu

<img src="./assets/Screen-2026-11-18-043908.gif" width="300" alt="Ekran Goruntusu" />

## Tasarim Referansi

Uygulamanin tum ekranlari, bilesenleri, renk paletleri ve animasyon akislari ozel bir Figma tasarimi referans alinarak hazirlanmistir:

- Derin mavi ve mor tonlarindaki ozel arka plan gradyanlari
- Urun listeleme kartlari ve hover/dokunma efektleri
- Urun detay sayfasindaki dinamik perspektif ve gecis animasyonlari
- Sepete ekleme sonrasi onay durumu ekrani (Done / Oder added to the cart)

## Kullanilan Teknolojiler

- React Native (0.88.1)
- React (19.3.0)
- Expo (SDK 58)
- Expo Router (Dosya tabanli yonlendirme mimarisi)
- TypeScript (Tip guvenligi ve guclu tip tanimlari)
- React Native Reanimated (4.7.1 - Yuksek performansli 60/120 fps arayuz animasyonlari)
- NativeWind & Tailwind CSS (Yardimci stil siniflari)
- Expo Linear Gradient (Figma gradyan gecisleri)
- Expo Vector Icons (Ionicons ikon seti)
- React Native Safe Area Context (Cihaz centik ve guvenli alan yonetimi)

## Ekranlar ve Ozellikler

### 1. Ana Sayfa (Home Screen)

- Sol ust menu butonu ve bildirim zili
- Baslik ve kategoriye gore dinamik alt baslik alani
- Kategori secim kapsulleri (Burger, Pasta, Salads)
- 2 sutunlu urun kartlari grid yapisi:
  - Urun gorsellerinin uzerine gelindiginde veya dokunuldugunda sag/sol kolona gore farkli acilarda donme (+10deg / -10deg), yukari kayma ve buyume animasyonu
  - Sadece kart uzerindeki arti butonuna tiklandiginda detay sayfasina gecis
- Alt gezinme cubugu (Ozel sepet butonu ve konum/kumbara ikonlari)

### 2. Urun Detay Sayfasi (Product Detail Screen)

- Geri donus ve secenekler ust cubugu
- Giris Animasyonu: Detay sayfasina girildiginde burger ve dilimlenmis domates gorselleri sagdan ekrana girer; burger tam ortaya otururken domates dilimi one ve sola dogru firlayarak perspektif etkisi olusturur.
- Cift Burger Animasyonu: Miktar artirildiginda (adet 2 veya uzeri oldugunda), birinci burgerin arkasindan ikinci bir burger animasyonla sag uste cikar ve on burger hafif sola acilarak derinlik saglar. Miktar 1'e dusuruldugunde arka burger tekrar saklanir.
- Etkilesimli adet secici (+ / -) ve Figma prototipine uygun fiyatlandirma mantigi.
- Ozel pembe "Add to cart" butonu.

### 3. Sepet Onay Ekrani (Cart Success Screen)

- Figma Frame 9 tasarimiyla birebir uyumlu onay ekrani.
- Pembe kutucuk ve cift onay (tick) isareti.
- "Done!" ve "Oder added to the cart" bilgilendirme metinleri.
- Ekrana dokunuldugunda veya belirli bir sure sonra otomatik olarak ana sayfaya donus.

## Kurulum ve Calistirma

Projeyi yerel ortamda calistirmak icin asagidaki adimlari izleyebilirsiniz:

1. Bagimliliklari yukleyin:

```bash
npm install
```

2. Gelistirme sunucusunu baslatin:

```bash
npx expo start
```

3. Uygulamayi calistirmak istediginiz platformu secin:

- iOS Simulator icin: Terminalde `i` tusuna basin
- Android Emulator icin: Terminalde `a` tusuna basin
- Web tarayici icin: Terminalde `w` tusuna basin
- Gercek cihazda test etmek icin: Cihazinizdaki Expo Go uygulamasi ile terminaldeki QR kodu taratin

## Kod Standartlari ve Kontroller

Projede TypeScript tip kontrolleri asagidaki komutla yapilabilir:

```bash
npx tsc --noEmit
```
