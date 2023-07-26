import { Game } from "./interface"

const database:Game[] = [
    {
        id:"dest2123",
        name:"Destiny 2",
        image:"https://files.backbon3.com/cdn-cgi/image/width=648,height=396,fit=scale-down/content/originals/940d2209-6f9d-40de-8341-e0b4d2420cb2.jpeg",
        publisher: "Activision",
        date:new Date(Date.parse('17 Dec, 2017')),
        tags: [
            "Action",
            "Shooter",
            "First-Person",
            "Arcade"
        ],
        description:"The last safe city on Earth has fallen and lays in ruins, occupied by a powerful new enemy and his elite army, the Red Legion. Every player creates his own character called a “Guardian,” humanity’s chosen protectors. As a Guardian in Destiny 2, players must master new abilities and weapons to reunite the city’s forces, stand together and fight back to reclaim their home.",
    },
    {
        id:"redread123",
        name:"Red Dead Redemption 2",
        image:"https://stoffelpresents.com/wp-content/uploads/2018/11/RDR2-TITLE.jpg",
        publisher: "Rockstar Games",
        date:new Date(Date.parse('6 Dec, 2019')),
        tags: [
            "Open World",
            "Western",
            "Action",
            "Shooter"
        ],
        description:"Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, RDR2 is the epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang, on the run across America at the dawn of the modern age. Also includes access to the shared living world of Red Dead Online.",
    },
    {
        id:"disco123",
        name:"Disco Elysium",
        image:"https://cdn1.epicgames.com/ff52981b1d9947978153c7a7f8bc6d90/offer/EGS_DiscoElysiumTheFinalCut_ZAUM_S5-1920x1080-d4811511d7c3b0442ccf811184e3e68a.jpg",
        publisher: "ZA/UM",
        date:new Date(Date.parse('Mar 30, 2021')),
        tags: [
            "Noir",
            "RPG",
            "Choises Matter"
        ],
        description:"Disco Elysium - The Final Cut is a groundbreaking role playing game. You’re a detective with a unique skill system at your disposal and a whole city to carve your path across. Interrogate unforgettable characters, crack murders or take bribes. Become a hero or an absolute disaster of a human being.",
    },
    {
        id:"elden123",
        name:"Elden Ring",
        image:"https://stevivor.com/wp-content/uploads/2022/02/elden-ring.jpg",
        publisher: "Bandai Namco Games",
        date:new Date(Date.parse('Feb 25, 2022')),
        tags: [
            "Open World",
            "RPG",
            "Action",
        ],
        description:"Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. As you explore, the joy of discovering unknown and overwhelming threats await you, leading to a high sense of accomplishment.",
    },
    {
        id:"skyrim123",
        name:"The Elder Scrolls V: Skyrim ",
        image:"https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_4/H2x1_NSwitch_TheElderScrollsVSkyrim_image1280w.jpg",
        publisher: "Bethesda Softworks",
        date:new Date(Date.parse('Nov 11, 2011')),
        tags: [
            "Open World",
            "RPG",
            "Adventure",
            "Fantasy"
        ],
        description:"It is now 4E 201. The High King of Skyrim has been killed, and the threat of Civil War looms over the land of Skyrim. One side wishes to secede from the weakened Third Empire, while the other wishes to remain a part of it. ",
    },
    {
        id:"portal123",
        name:"Portal 2",
        image:"https://cdn.akamai.steamstatic.com/steam/apps/620/capsule_616x353.jpg?t=1683129624",
        publisher: "Valve Software",
        date:new Date(Date.parse('Apr 18, 2011')),
        tags: [
            "Action",
            "Sci-fi",
            "Arcade",
        ],
        description:"The single-player portion of Portal 2 introduces a cast of dynamic new characters, a host of fresh puzzle elements, and a much larger set of devious test chambers. Players will explore never-before-seen areas of the Aperture Science Labs and be reunited with GLaDOS.",
    },

]


export const testTags:string[] = [
    "Action",
    "Adventure",
    "Survival",
    "RPG",
    "Indie",
    "Western",
    "Sci-fi",
    "Strategy",
    "Racing",
    "Sports",
    "Simulator",
    "Platformer",
    "Free To Play",
    "Shooter",
    "First-Person",
    "Arcade",
    "Open World",
    "Noir",
    "Choises Matter",
    "Fantasy"
]

export const testPlatform:string[] =[
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "Mobile",
]

export const testPlayers:string[] = [
    "Singleplayer",
    "Multiplayer",
    "Local Multiplayer",
    "Massively Multiplayer",
    "Multiplayer Co-op"
]

export const testAspects:string[] = [
    "Graphics",
    "Sound Design",
    "Gameplay",
    "Story/Narrative",
    "Innovation",
    "Atmosphere",
    "Customization",
    "Microtransactions",
    "Stability",
    "Replayability",
    "Progression",
    "Community"
]

export default database