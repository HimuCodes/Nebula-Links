// Content configuration for Nebula Links
const profileConfig = {
    // Personal Information
    displayName: "himu",
    tagline: "NOISE WEAVER",
    bio: "Embedded coder, web tinkerer, film geek, music prod. Exploring the multiverse of skills, one dimension at a time.",
    avatar: "profile.jpg",
    
    // Primary Call-to-Action
    primaryCTA: {
        label: "Listen Now",
        url: "https://soundcloud.com/himumusic",
        icon: "fas fa-music"
    },
    
    // Social Links
    socialLinks: [
        {
            id: "twitter",
            label: "Twitter",
            url: "https://x.com/audbhida",
            icon: "fab fa-x-twitter"
        },
        {
            id: "github",
            label: "GitHub", 
            url: "https://github.com/HimuCodes",
            icon: "fab fa-github"
        },
        {
            id: "instagram",
            label: "Instagram",
            url: "https://www.instagram.com/audbhida/",
            icon: "fab fa-instagram"
        },
        {
            id: "linkedin",
            label: "LinkedIn",
            url: "https://www.linkedin.com/in/himanshutiwari17/",
            icon: "fab fa-linkedin"
        },
        {
            id: "email",
            label: "Email",
            url: "mailto:himanshu.tiwari.17@outlook.com",
            icon: "fas fa-envelope"
        },
        {
            id: "soundcloud",
            label: "SoundCloud",
            url: "https://soundcloud.com/himumusic",
            icon: "fab fa-soundcloud"
        },
        {
            id: "spotify",
            label: "Spotify",
            url: "https://open.spotify.com/user/31hbuvu7floclnteup4tifmx6urq?si=46aa5fa727fd4b8b",
            icon: "fab fa-spotify"
        },
        {
            id: "letterboxd",
            label: "Letterboxd",
            url: "https://boxd.it/59In3",
            icon: "fas fa-film"
        },
        {
            id: "discord",
            label: "Discord",
            url: "https://discord.com/users/510713457906024457",
            icon: "fab fa-discord"
        },
        {
            id: "mastodon",
            label: "Mastodon",
            url: "https://fosstodon.org/@himu",
            icon: "fab fa-mastodon"
        },
        {
            id: "resume",
            label: "Resume",
            url: "https://drive.google.com/file/d/1EPMvWfQ1q6JgZna5qi-CG_6UG7pyIYLE/view?usp=sharing",
            icon: "fas fa-file-alt"
        },
        {
            id: "website",
            label: "Personal Site",
            url: "#",
            icon: "fas fa-globe"
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = profileConfig;
}