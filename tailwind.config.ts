import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'arial': ["Arial", "sans-serif"],
        'sans': ['Poppins', 'ui-sans-serif', 'system-ui'],
        'serif': ['Playfair Display', 'ui-serif', 'Georgia'],
        'display': ['Playfair Display', 'ui-serif', 'Georgia'],
      },
      colors: {
        'senegal-green': '#00A651',
        'senegal-green-light': '#4CAF50',
        'senegal-green-dark': '#007A3D',
        'senegal-yellow': '#FDEF42',
        'senegal-gold': '#FFD700',
        'senegal-yellow-dark': '#E6D73A',
        'senegal-red': '#E31E24',
        'senegal-red-dark': '#DC143C',
        'senegal-red-light': '#FF6B6B',
        'senegal-brown': '#8B4513',
        'senegal-cream': '#FFF8DC',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      backgroundImage: {
        'gradient-senegal': 'linear-gradient(135deg, #00A651 0%, #FDEF42 50%, #E31E24 100%)',
        'gradient-senegal-soft': 'linear-gradient(135deg, rgba(0, 166, 81, 0.1) 0%, rgba(253, 239, 66, 0.1) 50%, rgba(227, 30, 36, 0.1) 100%)',
        'gradient-senegal-softe': 'linear-gradient(135deg,  #00A651 0%, #00a650e8 100%)',
        'gradient-green': 'linear-gradient(135deg, #00A651 0%, #4CAF50 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FDEF42 0%, #FFD700 100%)',
        'gradient-red': 'linear-gradient(135deg, #E31E24 0%, #DC143C 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        scroll: 'scroll 25s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
      },
      boxShadow: {
        'senegal': '0 4px 15px rgba(0, 166, 81, 0.3)',
        'senegal-lg': '0 8px 25px rgba(0, 166, 81, 0.4)',
        'gold': '0 4px 15px rgba(253, 239, 66, 0.3)',
        'gold-lg': '0 8px 25px rgba(253, 239, 66, 0.4)',
        'red': '0 4px 15px rgba(227, 30, 36, 0.3)',
        'red-lg': '0 8px 25px rgba(227, 30, 36, 0.4)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
