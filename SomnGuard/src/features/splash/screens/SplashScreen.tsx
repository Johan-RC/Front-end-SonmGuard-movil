// app/index.tsx
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Pantalla de splash / animaciÃ³n de entrada.
//
// Secuencia (~5 segundos):
//   300ms  â†’ Logo: fade-in + scale-up con pequeÃ±o rebote (900ms)
//   1300ms â†’ Letras "SOMNGUARD" aparecen una a una, con fade + slide-up
//             (90ms entre cada letra â†’ 9 letras = ~810ms total)
//   2500ms â†’ Todo visible, el ojo sigue animÃ¡ndose
//   4200ms â†’ Fade-out de toda la pantalla (700ms)
//   4900ms â†’ Navega al login
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

import SomnGuardLogo from '@/shared/components/SomnGuardLogo';
import { theme } from '@/shared/theme';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import Animated2, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

// â”€â”€ Letras del nombre de la marca â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const LETTERS = 'SOMNGUARD'.split('');

// â”€â”€ Tiempos clave â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const LOGO_DELAY    = 300;   // ms antes de que aparezca el logo
const LOGO_DURATION = 900;   // ms de duraciÃ³n del logo
const LETTERS_START = 1300;  // ms cuando empieza la primera letra
const LETTER_STAGGER = 90;   // ms entre cada letra
const LETTER_DURATION = 380; // ms de duraciÃ³n de cada letra
const FADEOUT_START  = 4200; // ms cuando empieza el fade-out
const FADEOUT_DUR    = 700;  // ms de duraciÃ³n del fade-out

export default function SplashScreen() {
  const router = useRouter();

  // â”€â”€ Reanimated: controla el fade-out de toda la pantalla â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const screenOpacity = useSharedValue(1);

  // â”€â”€ Animated clÃ¡sico: logo â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale   = useRef(new Animated.Value(0.3)).current;

  // â”€â”€ Animated clÃ¡sico: una opacidad y translateY por cada letra â”€â”€â”€â”€
  const letterOpacity = useRef(LETTERS.map(() => new Animated.Value(0))).current;
  const letterTransY  = useRef(LETTERS.map(() => new Animated.Value(20))).current;

  function goToLogin() {
    router.replace('/(auth)/login');
  }

  useEffect(() => {
    // â”€â”€ 1) Logo: aparece con fade-in + scale con rebote â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue:         1,
        duration:        LOGO_DURATION,
        delay:           LOGO_DELAY,
        easing:          Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(logoScale, {
        toValue:         1,
        duration:        LOGO_DURATION,
        delay:           LOGO_DELAY,
        easing:          Easing.out(Easing.back(1.15)), // rebote suave al llegar
        useNativeDriver: false,
      }),
    ]).start();

    // â”€â”€ 2) Letras: aparecen en cascada, una a una â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    Animated.parallel(
      LETTERS.map((_, i) =>
        Animated.parallel([
          Animated.timing(letterOpacity[i], {
            toValue:         1,
            duration:        LETTER_DURATION,
            delay:           LETTERS_START + i * LETTER_STAGGER,
            easing:          Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),
          Animated.timing(letterTransY[i], {
            toValue:         0,
            duration:        LETTER_DURATION,
            delay:           LETTERS_START + i * LETTER_STAGGER,
            easing:          Easing.out(Easing.cubic),
            useNativeDriver: false,
          }),
        ])
      )
    ).start();

    // â”€â”€ 3) Fade-out final â†’ navegar al login â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    screenOpacity.value = withDelay(
      FADEOUT_START,
      withTiming(0, { duration: FADEOUT_DUR }, (finished) => {
        if (finished) runOnJS(goToLogin)();
      }),
    );
    // Intentional one-time splash animation setup; refs hold mutable animation state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // â”€â”€ Estilo animado de la pantalla completa â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const screenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  return (
    <Animated2.View style={[styles.container, screenStyle]}>

      {/* â”€â”€ Logo (SVG con ojo animado, sin texto) â”€â”€ */}
      <Animated.View
        style={{
          opacity:   logoOpacity,
          transform: [{ scale: logoScale }],
        }}
      >
        {/*
         * hideName=true â†’ SomnGuardLogo no renderiza el texto "SOMNGUARD".
         * Lo animamos letra por letra aquÃ­ abajo.
         */}
        <SomnGuardLogo size={140} hideName />
      </Animated.View>

      {/* â”€â”€ Nombre de la marca: letras animadas en cascada â”€â”€ */}
      <View style={styles.brandRow}>
        {LETTERS.map((letter, i) => (
          <Animated.Text
            key={i}
            style={[
              styles.brandLetter,
              {
                opacity:   letterOpacity[i],
                transform: [{ translateY: letterTransY[i] }],
              },
            ]}
          >
            {letter}
          </Animated.Text>
        ))}
      </View>

    </Animated2.View>
  );
}

// â”€â”€ Estilos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const styles = StyleSheet.create({
  container: {
    flex:            1,
    backgroundColor: theme.colors.background,
    alignItems:      'center',
    justifyContent:  'center',
    gap:             28,
  },

  /* Fila horizontal con todas las letras del nombre */
  brandRow: {
    flexDirection: 'row',
    alignItems:    'flex-end',
  },

  /* Cada letra individual */
  brandLetter: {
    color:         theme.colors.accent,
    fontSize:      34,
    fontWeight:    '900',
    letterSpacing: 2,
  },
});

