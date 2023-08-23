import { ScoreList } from "./interface"


export const ratingNames = {
    0: "-4",
    1: "-3",
    2: "-2",
    3: "-1",
    5: "==",
    7: "+1",
    8: "+2",
    9: "+3",
    10: "+4"
}

export const ratingAspects: {
    [key in keyof ScoreList]: {
        title: string,
        description:string,
        scale: {
            0: string,
            1: string
            2: string,
            3: string,
            5: string,
            7: string,
            8: string,
            9: string,
            10:string
        }
    }
} = {
    graphics_avg: {
        title: "Looks & Visuals",
        scale: {
            0: "Visual Catastrophe",
            1: "Dull Palette",
            2: "Low-Res World",
            3: "Bland Landscapes",
            5: "Neutral Nexus",
            7: "Spectacular Scenes",
            8: "Visual Victory",
            9: "Masterpiece Canvas",
            10: "Beyond Reality"
        },
        description: "Evaluate the visual quality and aesthetics of the game's design. Your rating will reflect how much the game's visuals draw you into its world and enhance your overall gaming experience."
    },
    sound_avg: {
        title: "Sounds & Music",
        scale: {
            0: "Audio Nightmare",
            1: "Toneless Tunes",
            2: "Muffled Melodies",
            3: "Aural Adventures",
            5: "Harmonious Hub",
            7: "Ear Candy",
            8: "Sonic Magic",
            9: "Sound Masterpiece",
            10: "Eargasmic Bliss"
        },
        description: "Assess the game's sounds and music, considering how well the audio elements contribute to your overall gaming experience and immerse you in the game's atmosphere."
    },
    gameplay_avg: {
        title: "How It Plays",
        scale: {
            0: "Playable Pain?",
            1: "Frustration Fest",
            2: "Clunky Controls",
            3: "Playful Playthrough",
            5: "Playability Plateau",
            7: "Gameplay Glory",
            8: "Masterful Mechanics",
            9: "Thrilling Triumph",
            10: "Legendary Gameplay"
        },
        description: "Judge how the game plays, and how well the game mechanics engage, entertain you, and keep you coming back for more."
    },
    level_avg: {
        title: "Worlds & Levels",
        scale: {
            0: "Design Disaster",
            1: "Chaotic Chambers",
            2: "Basic Boredom",
            3: "So-So Stages",
            5: "OK Terrain",
            7: "Adventure Awaits",
            8: "Masterpiece Maps",
            9: "Epic Environments",
            10: "Reality Reimagined"
        },
        description: "Rate the creativity and complexity of the game's worlds and levels, considering how enjoyable and captivating the game's environments are and how well they contribute to your overall enjoyment."
    },
    balance_avg: {
        title: "Fairness & Challenge",
        scale: {
            0: "Unfair Nightmare",
            1: "Fiasco",
            2: "Uneven Odds",
            3: "Skewed Struggles",
            5: "Equilibrium Achieved",
            7: "Harmony in Play",
            8: "Perfect Balance",
            9: "Precision Balance",
            10: "Perfectly Balanced"
        },
        description: "Assess the fairness and challenge of the game, considering how well the game provides an equitable experience and maintains a satisfying level of difficulty."
    },
    story_avg: {
        title: "Plot & Story",
        scale: {
            0: "Plotless Abyss",
            1: "Confusing Chronicles",
            2: "Forgettable Tale",
            3: "So-So Storytelling",
            5: "Seems Ok",
            7: "Narration Nirvana",
            8: "Plot Perfection",
            9: "Legend Unfolded",
            10: "Mythic Narrative"
        },
        description: "Evaluate the plot and narrative quality, and how well the game's story engages, enthralls you, and adds depth to your gaming experience."
    },
    performance_avg: {
        title: "Performance & Smoothness",
        scale: {
            0: "Laggy Nightmare",
            1: "Slow-Mo Struggles",
            2: "Computer Heats Up",
            3: "I See Some Problems",
            5: "Playable Performance",
            7: "Seamless Speed",
            8: "Flawless Flow",
            9: "Turbocharged Thrills",
            10: "Lightning Speed"
        },
        description: "Rate the smoothness and speed of the game, considering how well the game maintains a smooth flow and enhances your immersion."
    },
    original_avg: {
        title: "Fresh Ideas",
        scale: {
            0: "Innovation Void",
            1: "Copycat Catastrophe",
            2: "Been There, Done That",
            3: "Common Concepts",
            5: "Idea Intersection",
            7: "Trailblazing Triumph",
            8: "Next-Gen Genius",
            9: "Limitless Creativity",
            10: "Visionary Vanguard"
        },
        description: "Judge the freshness of the game's ideas, and how innovative and exciting the game's ideas are in shaping a unique and engaging experience."
    },
    customization_avg: {
        title: "Customization. Your Style",
        scale: {
            0: "What?",
            1: "Limited Looks",
            2: "So-So Selection",
            3: "Couple Good Options",
            5: "Some Style Spectrum",
            7: "Tailored Trends",
            8: "Style Revolution",
            9: "Ultimate Uniqueness",
            10: "I AM A WALRUS NOW"
        },
        description: "Assess how much you can make the game your own, and whether the game lets you express your individuality by personalizing your experience."
    },
    microtransactions_avg: {
        title: "Money Matters",
        scale: {
            0: "Greed Epidemic",
            1: "Greedy Tricks",
            2: "Sensible Spending",
            3: "Purchase Puzzles",
            5: "Balanced Buys",
            7: "Maybe Sometimes...",
            8: "Money Not Required",
            9: "Cosmetics Only",
            10: "No-Pay Nirvana"
        },
        description: "Rate how the game handles money matters, and how well the game balances monetization with player experience, ensuring that spending money aligns with enhancing enjoyment."
    },
    support_avg: {
        title: "Game Support",
        scale: {
            0: "Abandoned Abyss",
            1: "Helpless Halt",
            2: "You Are Making It Worse",
            3: "Some Good Support",
            5: "Community Compass",
            7: "Community Care",
            8: "Heroic Help",
            9: "Support Superstars",
            10: "Infinite Assistance"
        },
        description: "Evaluate how well the game creators back their creation, ensuring that the game receives the necessary care, updates, and attention to maintain a high level of quality and enjoyment over time."
    },
    total: {
        title: "You Should Not See This",
        scale: {
            0: "You",
            1: "Should",
            2: "Not",
            3: "See",
            5: "This",
            7: "...",
            8: "I'll",
            9: "Find",
            10: "You -_-"
        },
        description: ""
    }
}

export const ratingPageAspectNamesArray: (keyof ScoreList)[] = [
    "graphics_avg",
    "sound_avg",
    "gameplay_avg",
    "level_avg",
    "balance_avg",
    "story_avg",
    "performance_avg",
    "original_avg",
    "customization_avg",
    "microtransactions_avg",
    "support_avg"
]