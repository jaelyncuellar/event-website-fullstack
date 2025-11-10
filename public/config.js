export const EVENT_CONFIG = {
  /* --------------------------------------------------
     BASIC SITE SETTINGS
  -------------------------------------------------- */
    //SITE 
    siteTitle: "Aaliyah's Quinceañera",
    siteSubtitle: "Princess to Queen",

    // HERO 
    hero: {
    image: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/27feb2bb-aeb4-4a83-9fb6-8f3f2a15885e/67ca9d86-ae5e-42ba-95df-8997547b5754.png",
    alt: "Quince Princess",
    title: "Aaliyah's Quinceañera",
    subtitle: "Princess to Queen",
    cta: "RSVP!"
    },

    // NAVBAR
    navbar: { 
        items: [ 
            { label: "About", target: "#welcome" }, 
            { label: "Schedule", target: "#schedule-section" }, 
            { label: "Learn More", target: "#links-section" }, 
        ],
        themeToggleText: "Theme Mode"
    },

    // WELCOME 
    welcome: { 
        title: "Welcome", 
        paragraphs: [ 
            "You're invited to celebrate a special milestone — <strong>Aaliyah’s Quinceañera</strong>, a tradition that honors her growth, heritage, and the journey into young womanhood.",
            "A royal transformation from princess to queen. Surrounded by family, friends, and community, we’ll mark this meaningful day with music, food, and celebration.",
            "Join us as we honor Aaliyah’s roots and embrace the future with love, pride, and joy."
        ],
        padrinosTitle: "Aaliyah's Padrinos y Madrinos", 
        padrinosList: [
            { name: "Jeremy Zecker", role: "Venue" },
            { name: "Martha Canvas", role: "Food" },
            { name: "Prine Seet", role: "Decorations" }
        ]
    },

    /* RSVP */
    rsvpIntro:
        "We are excited to celebrate this unforgettable night with you.",
    rsvpDeadline: "January 1st, 2025",

    /* Modal Message */
    modalMessageIntro: "Thanks for RSVPing",
    modalMessageOutro: "We are looking forward to seeing you!",
    modal: { 
        image: { 
            src: "./img/rsvp-crown.png", 
            alt:"RSVP Success Image", 
            width:"200"
        }
    },
    /* Footer */
    footerName: "Jaelyn Cuellar",
    footerGitHub: "https://github.com/jaelyncuellar",

    /* Theme Colors (These override CSS variables on load) */
    theme: {
        accent: "#3553a5",
        accentSecondary: "#5b7fff",
        accentSoft: "#e7ecff",
    },

    /* Schedule Cards */
    schedule: [
        {
        title: "Dinner",
        text: "Enjoy delicious home-cooked Mexican foods and desserts!",
        image:
            "https://d1h2anuecgxlkn.cloudfront.net/networks/5/blog/t_320_320/eKIWiyRYjvKyrZuqvrGrpzM6hoseovFl26wFHz7j.webp",
        },
        {
        title: "Formal Presentation",
        text: "The Quinceañera will be recognized and introduced to the party guests.",
        image: "./img/aaliyah-crown.jpg",
        },
        {
        title: "Traditional Dances",
        text: "The Quinceañera will engage in dances with her Damas and Chambelanes.",
        image: "./img/dance.png",
        },
    ],

    /* Links Section */
    linksSection: {
        title: "Learn More", 
        items: [
            {
            title: "What is a Quinceañera?",
            link: "https://www.youtube.com/embed/_0LXMJYP76M?si=0hdcGnxGKtb1f_VW",
            type: "video",
            },
            {
            title: "Dress Code",
            text: "What to wear to a Quinceañera?",
            link: "https://www.villarussocatering.com/blog/quinceaneras-expect-wear",
            },
            {
            title: "Quinceañera 101",
            text: "Non-Latino? No worries! All are welcome.",
            link: "https://qbydavinci.com/blog/quinceanera-primer-for-non-latino-friends/",
            },
            {
            title: "Do's & Don'ts",
            text: "Curious about what to expect?",
            link: "https://www.arianavara.com/blog/navigating-quincea-era-etiquette-dos-and-don-ts-for-guests-and-the-honoree",
            }
        ]
    }
}