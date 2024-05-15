import plugin from "tailwindcss/plugin";

export const shadcnPlugin = plugin(
    function ({ addBase }) {
        addBase({
            ":root": {
                "--background": "0 0% 97%",
                "--foreground": "0 0% 15%",
                "--card": "0 0% 100%",
                "--card-foreground": "0 0% 15%",
                "--popover": "0 0% 96%",
                "--popover-foreground": "0 0% 0%",
                "--primary": "0 0% 15%",
                "--primary-foreground": "0 0% 95%",
                "--secondary": "0 0% 75%",
                "--secondary-foreground": "0 0% 0%",
                "--muted": "240 5% 93%",
                "--muted-foreground": "0 0% 30%",
                "--accent": "0 0% 90%",
                "--accent-foreground": "0 0% 0%",
                "--destructive": "0 65% 50%",
                "--destructive-foreground": "0 0% 100%",
                "--border": "0 0% 90%",
                "--input": "0 0 60%",
                "--ring": "0 0 50%",
                "--radius": "0.75rem"
            },
            "[data-theme='dark']": {
                "--background": "272 5% 7%",
                "--foreground": "0 0% 80%",
                "--card": "272 5% 5%",
                "--card-foreground": "0 0% 90%",
                "--popover": "272 5% 4%",
                "--popover-foreground": "0 0% 90%",
                "--primary": "0 0% 80%",
                "--primary-foreground": "0 0% 0%",
                "--secondary": "240 3.7% 15.9%",
                "--secondary-foreground": "0 0% 98%",
                "--muted": "240 4% 16%",
                "--muted-foreground": "0 0% 65%",
                "--accent": "272 5% 10%",
                "--accent-foreground": "0 0% 98%",
                "--destructive": "0 60% 55%",
                "--destructive-foreground": "0 0% 100%",
                "--border": "272 5% 17%",
                "--input": "272 5% 25%",
                "--ring": "272 5% 40%"
            }
        })
        addBase({
            "*": {
                "@apply border-border": {}
            },
            "body": {
                "@apply bg-background text-foreground": {}
            }
        })
    },
    {
        darkMode: ["class"],
        theme: {
            container: {
                center: true,
                padding: "2rem",
                screens: {
                    "2xl": "1400px",
                },
            },
            extend: {
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
                        from: { height: "0" },
                        to: { height: "var(--radix-accordion-content-height)" },
                    },
                    "accordion-up": {
                        from: { height: "var(--radix-accordion-content-height)" },
                        to: { height: "0" },
                    },
                },
                animation: {
                    "accordion-down": "accordion-down 0.2s ease-out",
                    "accordion-up": "accordion-up 0.2s ease-out",
                },
            },
        },
    }
)