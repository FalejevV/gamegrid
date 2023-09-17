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

export const ratingSymbols = {
    0: "----",
    1: "---",
    2: "---",
    3: "-",
    5: "==",
    7: "+",
    8: "++",
    9: "+++",
    10: "++++"
}

export const ratingAspects: {
    [key in keyof ScoreList]: {
        title: string,
        description: string,
        scale: {
            0: string,
            1: string
            2: string,
            3: string,
            5: string,
            7: string,
            8: string,
            9: string,
            10: string
        }
    }
} = {
    graphics_avg: {
        title: "Looks & Visuals",
        scale: {
            0: "Oops!",
            1: "Bit off",
            2: "Blurry",
            3: "So-so",
            5: "Decent",
            7: "Pretty good",
            8: "Impressive",
            9: "Almost perfect",
            10: "Top-notch!"
        },
        description: "How much do the game's visuals WOW you and draw you in?"
    },
    sound_avg: {
        title: "Sounds & Music",
        scale: {
            0: "Ouch, my ears!",
            1: "Kinda flat",
            2: "Bit muffled",
            3: "Average tunes",
            5: "Catchy beats",
            7: "Nice vibes",
            8: "Really good",
            9: "Almost flawless",
            10: "Music to my ears!"
        },
        description: "How do the game's sounds and music make you feel more into the game's vibe?"
    },
    gameplay_avg: {
        title: "How It Plays",
        scale: {
            0: "Hard to play",
            1: "Bit frustrating",
            2: "Awkward controls",
            3: "It's okay",
            5: "Pretty smooth",
            7: "Fun gameplay",
            8: "Really engaging",
            9: "Almost perfect",
            10: "Top-tier fun!"
        },
        description: "Judge how the game plays, and how well the game mechanics engage, entertain you, and keep you coming back for more."
    },
    level_avg: {
        title: "Worlds & Levels",
        scale: {
            0: "Not great",
            1: "Bit messy",
            2: "Kinda plain",
            3: "Average",
            5: "Decent design",
            7: "Fun to explore",
            8: "Well-crafted",
            9: "Super immersive",
            10: "Absolutely amazing"
        },
        description: "Are the game's worlds and levels creative enough to keep you hooked?"
    },
    balance_avg: {
        title: "Fairness & Challenge",
        scale: {
            0: "Totally unbalanced",
            1: "Feels off",
            2: "Leaning one way",
            3: "Slightly skewed",
            5: "Middle ground",
            7: "Balanced fun",
            8: "Almost perfect",
            9: "Just the right challenge",
            10: "Perfectly balanced"
        },
        description: "Does the game feel fair and challenging enough to keep you engaged?"
    },
    story_avg: {
        title: "Plot & Story",
        scale: {
            0: "What plot?",
            1: "Bit confusing",
            2: "Easy to forget",
            3: "Average story",
            5: "Decent tale",
            7: "Really engaging",
            8: "Great plot",
            9: "Almost legendary",
            10: "Epic story!"
        },
        description: "How hooked are you by the game's story and plot?"
    },
    performance_avg: {
        title: "Performance & Smoothness",
        scale: {
            0: "Super laggy",
            1: "Kinda slow",
            2: "Some hiccups",
            3: "A bit off",
            5: "Runs okay",
            7: "Pretty smooth",
            8: "No issues",
            9: "Super fast",
            10: "Instant response"
        },
        description: "How smooth and fast does the game feel to you?"
    },
    original_avg: {
        title: "Fresh Ideas",
        scale: {
            0: "Nothing new",
            1: "Feels familiar",
            2: "Some old ideas",
            3: "A bit typical",
            5: "Mix of old and new",
            7: "Pretty innovative",
            8: "Very fresh",
            9: "Super creative",
            10: "Never seen before!"
        },
        description: "How fresh and unique do the game's ideas feel to you?"
    },
    customization_avg: {
        title: "Customization. Your Style",
        scale: {
            0: "What?",
            1: "Few options",
            2: "It's okay",
            3: "Some cool choices",
            5: "Variety of styles",
            7: "Lots to choose from",
            8: "Make it yours",
            9: "Endless options",
            10: "Totally unique!"
        },
        description: "How much does the game let you add your own touch and express yourself?"
    },
    microtransactions_avg: {
        title: "Money Matters",
        scale: {
            0: "Feels greedy",
            1: "Too many buys",
            2: "Okay spending",
            3: "Some purchase pressure",
            5: "Fair pricing",
            7: "Optional buys",
            8: "Mostly free",
            9: "Just for looks",
            10: "No need to spend"
        },
        description: "Do you feel the in-game purchases are fair and add to the fun?"
    },
    support_avg: {
        title: "Game Support",
        scale: {
            0: "Feels abandoned",
            1: "Limited help",
            2: "Could be better",
            3: "Decent support",
            5: "Community driven",
            7: "Active updates",
            8: "Quick fixes",
            9: "Always there to help",
            10: "Top-tier support"
        },
        description: "Do you think the game creators keep improving and caring for the game to keep it fun over time?"
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