import type {Config} from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
		},
		extend: {
			screens: {
				xls: {max: "1536px"},
				xl: {max: "1280px"},
				lg: {max: "1024px"},
				md: {max: "768px"},
				sm: {max: "640px"},
				xs: {max: "460px"},
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: {height: "0"},
					to: {height: "var(--radix-accordion-content-height)"},
				},
				"accordion-up": {
					from: {height: "var(--radix-accordion-content-height)"},
					to: {height: "0"},
				},
				"pop-up": {
					"0%": {
						transform: "scale(0)",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
				blob: {
					"0%": {
						transform: "scale(1)",
					},
					"33%": {
						transform: "scale(1.1)",
					},
					"66%": {
						transform: "scale(0.9)",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
				move: {
					"0%": {
						transform: "translateX(100%)",
					},
					"100%": {
						transform: "translateX(0%)",
					},
				},
				"width-slide": {
					"0%": {
						width: "100%",
					},
					"100%": {
						width: "0%",
					},
				},
				"slide-lin": {
					"0%": {
						transform: "translateX(20%)",
						opacity: "0",
					},
					"100%": {
						transform: "translateX(0%)",
						opacity: "1",
					},
				},
				"slide-rin": {
					"0%": {
						transform: "translateX(-20%)",
						opacity: "0",
					},
					"100%": {
						transform: "translateX(0%)",
						opacity: "1",
					},
				},
				"slide-up": {
					"0%": {
						transform: "translateY(20%)",
						opacity: "0",
					},
					"100%": {
						transform: "translateY(0%)",
						opacity: "1",
					},
				},

				grow: {
					"0%": {
						top: "30px",
						left: "30px",
						width: "0",
						height: "0",
						opacity: "0",
					},
					"4.9%": {
						top: "36px",
						left: "36px",
						width: "0",
						height: "0",
						opacity: "0",
					},
					"5%": {
						top: "36px",
						left: "36px",
						width: "0",
						height: "0",
						opacity: "1",
					},
					"100%": {
						top: "0",
						left: "0",
						width: "72px",
						height: "72px",
						opacity: "0",
					},
				},
				"gradient-x": {
					"0%": {
						"background-position": "0% 50%",
					},
					"100%": {
						"background-position": "100% 50%",
					},
				},
				shake: {
					"0%": {
						transform: "translateX(10%)",
					},
					"20%": {
						transform: "translateX(-10%)",
					},
					"50%": {
						transform: "translateX(10%)",
					},
					"70%": {
						transform: "translateX(-10%)",
					},
					"100%": {
						transform: "translateX(0%)",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				blob: "blob 7s infinite",
				move: "move .4s ease-in-out",
				"width-slide": "width-slide .4s ease-in-out",
				"pop-up": "pop-up .3s ease-in",
				"slide-up": "slide-up .4s ease-in-out",
				"slide-lin": "slide-lin .4s ease-in-out",
				"slide-rin": "slide-rin .4s ease-in-out",
				grow: "grow 1.2s linear infinite",
				"grow-slow": "grow -0.5s linear infinite",
				"gradient-x": "gradient-x .5s ease-in-out infinite",
				shake: "shake .5s ease-in-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
