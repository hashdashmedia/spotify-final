import type { ServicePageContent, Testimonial } from '../../types';

const generateTestimonials = (count: number, subject: string, avatarIds: number[]): Testimonial[] => {
    const names = ["Alex R.", "Jenna L.", "Marco V.", "Sarah K.", "Chris P.", "Maria G.", "Leo F.", "Aisha B.", "Tom H.", "Chloe S."];
    const handles = ["@indiepop", "@singersongwriter", "@djmarco", "@marketingminds", "@beatmakerchris", "@mariagrooves", "@leofunk", "@aishabeats", "@tomhifi", "@chloesoul"];
    const reviews = [
        `My song's visibility exploded after using this service for ${subject}. Finally got on a Discover Weekly playlist!`,
        `The jump in my ${subject} got me noticed by two different music blogs. It’s a huge credibility boost.`,
        `My new releases are finally getting the attention they deserve from day one, all thanks to building my ${subject}.`,
        `After boosting a few key episodes with ${subject}, my podcast jumped into the Top 100 for my category. I even landed my first sponsor!`,
        `Incredible results! The ${subject} were delivered fast and looked completely organic. Highly recommend.`,
        `I was skeptical at first, but the increase in ${subject} was undeniable. My engagement is up across the board.`,
        `The customer support was fantastic and the ${subject} provided the social proof I needed to get my foot in the door.`,
        `If you're serious about your music, this is a must-have. The ${subject} gave my profile the professional look it needed.`,
        `Game-changer. The boost in ${subject} helped my track trigger the algorithm and reach thousands of new listeners.`,
        `Simple, safe, and effective. The ${subject} are top quality and my numbers have never looked better.`
    ];

    const testimonials: Testimonial[] = [];
    for (let i = 0; i < count; i++) {
        testimonials.push({
            name: names[i % names.length],
            handle: handles[i % handles.length],
            avatar: `https://picsum.photos/id/${avatarIds[i % avatarIds.length]}/100/100`,
            review: reviews[i % reviews.length],
            rating: 4 + Math.random(), // Random rating between 4.0 and 5.0
        });
    }
    return testimonials;
};

const playsTestimonials = generateTestimonials(127, 'plays', [1025, 1011, 1012, 1005, 1006, 1008, 1013, 1015]);
const listenersTestimonials = generateTestimonials(142, 'monthly listeners', [1027, 1028, 1029, 1031, 1032, 1033, 1035, 1036]);
const followersTestimonials = generateTestimonials(119, 'followers', [1040, 1041, 1042, 1043, 1044, 1045, 1047, 1048]);
const podcastTestimonials = generateTestimonials(108, 'podcast plays', [1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057]);


const servicePagesContentData: ServicePageContent[] = [
    {
        id: 'plays',
        slug: 'buy-spotify-plays',
        hero: {
            headline: 'Amplify Your Sound: Buy Real Spotify Plays to Get Heard',
            subheadline: "Kickstart your track's journey. More plays increase your chances of landing on algorithmic playlists like Discover Weekly and Release Radar.",
            ctaText: 'View Packages',
            inputPlaceholder: 'Enter Your Spotify Track Link',
            trustIcons: ['Premium Quality Plays', '100% Safe & Anonymous', 'Fast Delivery']
        },
        benefits: {
            headline: 'Stop Being Invisible. Start Getting Noticed.',
            items: [
                { title: 'Trigger the Algorithm', description: 'High play counts signal to Spotify that your track is popular, increasing its visibility across the platform.', icon: 'algorithm' },
                { title: 'Boost Social Proof', description: 'A track with thousands of plays looks more credible and appealing to new, organic listeners. Nobody wants to be the first to a party.', icon: 'social' },
                { title: 'Attract Industry Attention', description: "Impress A&R reps, bloggers, and promoters with tangible proof of your song's traction.", icon: 'industry' }
            ]
        },
        howItWorks: {
            headline: 'Get Your Plays in 3 Simple Steps',
            steps: [
                { title: 'Choose Your Package', description: 'Select the number of plays that fits your goals and budget.' },
                { title: 'Provide Your Track Link', description: 'Paste the URL of your Spotify song. No password is ever required.' },
                { title: 'Watch Your Plays Grow', description: 'Complete the secure checkout and see the results within 24-48 hours.' }
            ]
        },
        pricing: {
            headline: 'Find the Perfect Plan to Boost Your Track'
        },
        credibility: {
            headline: 'Why Choose Us?',
            guarantees: [
                { title: 'Premium Quality', description: 'Real-looking streams from active profiles to ensure safety.' },
                { title: 'Money-Back Guarantee', description: 'If we fail to deliver, you get a full refund.' },
                { title: '24/7 Customer Support', description: 'Our team is here to help you around the clock.' },
                { title: 'Secure & Confidential', description: 'Your privacy is our priority.' }
            ],
            testimonials: playsTestimonials
        },
        faq: {
            items: [
                { question: 'Are these plays from real people or bots?', answer: 'Our plays come from a network of real-looking profiles, designed to appear authentic to the Spotify algorithm. This ensures the safety and effectiveness of our service.' },
                { question: 'Is buying Spotify plays safe for my account?', answer: 'Yes, our methods are 100% safe. We use promotional techniques that comply with Spotify\'s terms of service, so your account is never at risk.' },
                { question: 'How long does it take to receive the plays?', answer: 'Delivery typically starts within 24-48 hours of your order. The plays are delivered gradually to ensure a natural growth pattern.' },
                { question: 'Will these plays get me royalties?', answer: 'While our plays are from premium-quality profiles, they are for promotional purposes only and are not eligible for royalties.' },
                { question: 'Can I split the plays across multiple songs?', answer: 'Our standard packages are for a single track to maximize its algorithmic impact. For custom orders, please contact our support team.' }
            ]
        },
        finalCta: {
            headline: 'Ready to Make Your Music Go Viral?',
            subheadline: "Don't let your talent go unheard. Give your track the boost it deserves today.",
            ctaText: 'See All Play Packages'
        },
        seo: {
            title: 'Buy Spotify Plays | Real & Fast | SpotifyBoost',
            description: 'Buy real Spotify plays to boost your track\'s visibility, trigger the algorithm, and get noticed. Safe, fast, and high-quality plays from SpotifyBoost.',
            url: 'buy-spotify-plays'
        }
    },
    {
        id: 'listeners',
        slug: 'buy-spotify-monthly-listeners',
        hero: {
            headline: 'Build Your Credibility: Buy Spotify Monthly Listeners',
            subheadline: "Show labels, promoters, and fans that your music has a consistent and growing audience. Monthly listeners are the #1 metric for artist authority.",
            ctaText: 'Boost My Listeners',
            inputPlaceholder: 'Enter Your Spotify Artist/Profile Link',
            trustIcons: ['Real Listener Profiles', '28-Day Guarantee', '100% Confidential']
        },
        benefits: {
            headline: 'Look Like a Pro, Not an Amateur.',
            items: [
                { title: 'Gain Instant Authority', description: 'A high monthly listener count is the ultimate social proof. It tells everyone your music is in demand right now.', icon: 'authority' },
                { title: 'Attract Industry Gatekeepers', description: 'A&R scouts and booking agents look at this number first. A strong profile opens doors to deals and gigs.', icon: 'industry' },
                { title: 'Increase Organic Discovery', description: 'A popular-looking profile encourages new users to check out your music, leading to more organic streams and followers.', icon: 'discovery' }
            ]
        },
        howItWorks: {
            headline: 'Elevate Your Profile in Minutes',
            steps: [
                { title: 'Choose Your Listener Package', description: 'Select the number of monthly listeners you want to add to your profile.' },
                { title: 'Provide Your Artist Link', description: 'Enter the URL of your Spotify artist profile. We never ask for your password.' },
                { title: 'See Your Listener Count Rise', description: 'Complete your purchase and watch your monthly listener count increase over the next few days.' }
            ]
        },
        pricing: {
            headline: 'Packages Designed for Serious Artists'
        },
        credibility: {
            headline: 'The SpotifyBoost Advantage',
            guarantees: [
                { title: 'Guaranteed Retention', description: 'Our listeners are guaranteed to stay on your profile for at least 28 days.' },
                { title: 'Profile Safe', description: 'Our service is 100% safe and compliant with Spotify\'s guidelines.' },
                { title: 'Targeted Audience', description: 'We can target listeners from specific regions to match your fanbase.' },
                { title: 'Dedicated Support', description: 'Our expert team is available 24/7 to assist you.' }
            ],
            testimonials: listenersTestimonials
        },
        faq: {
            items: [
                { question: 'How are monthly listeners different from followers?', answer: 'Monthly listeners are the number of unique individuals who have streamed your music in the last 28 days. Followers are users who have explicitly chosen to "follow" your artist profile. Both are important, but monthly listeners often carry more weight for industry professionals.' },
                { question: 'How long will the monthly listeners stay on my profile?', answer: 'The listeners we send will count towards your total for the standard 28-day rolling period defined by Spotify. We guarantee they will stick for this period.' },
                { question: 'Is this service safe for my Spotify for Artists account?', answer: 'Absolutely. Our promotion methods are discreet and safe, ensuring your account remains in good standing.' },
                { question: 'Where do the listeners come from?', answer: 'Our listeners come from our global network of music enthusiasts and playlists. This ensures a diverse and authentic-looking audience.' }
            ]
        },
        finalCta: {
            headline: 'Ready to Be Taken Seriously?',
            subheadline: 'Invest in your artist profile and build the credibility you need to succeed.',
            ctaText: 'View Monthly Listener Plans'
        },
        seo: {
            title: 'Buy Spotify Monthly Listeners | SpotifyBoost',
            description: 'Buy real Spotify monthly listeners to boost your artist profile\'s credibility. Attract labels, promoters, and new fans with SpotifyBoost.',
            url: 'buy-spotify-monthly-listeners'
        }
    },
    {
        id: 'followers',
        slug: 'buy-spotify-followers',
        hero: {
            headline: 'Grow Your Fanbase: Buy Real Spotify Followers',
            subheadline: "Build a loyal audience that gets notified of your new releases. More followers mean more instant streams on day one.",
            ctaText: 'Grow My Following',
            inputPlaceholder: 'Enter Your Spotify Artist/Profile Link',
            trustIcons: ['Real User Profiles', 'Permanent Followers', 'Organic Growth Pattern']
        },
        benefits: {
            headline: 'Turn Casual Listeners into Dedicated Fans.',
            items: [
                { title: 'Secure Future Streams', description: 'Every follower is notified when you release new music, guaranteeing an initial spike in plays for every song.', icon: 'streams' },
                { title: 'Build a Community', description: 'A strong follower count shows you have a dedicated fanbase, which is attractive to collaborators and brands.', icon: 'community' },
                { title: 'Long-Term Investment', description: "Unlike monthly listeners, followers are permanent. It's an asset that grows and supports your career over time.", icon: 'investment' }
            ]
        },
        howItWorks: {
            headline: 'Build Your Fanbase in 3 Easy Steps',
            steps: [
                { title: 'Select a Follower Package', description: 'Choose the number of new followers you want for your artist profile.' },
                { title: 'Enter Your Artist Profile URL', description: 'Just provide your Spotify artist link. No password needed!' },
                { title: 'Welcome Your New Followers', description: 'After checkout, we begin adding your new followers with a natural delivery speed.' }
            ]
        },
        pricing: {
            headline: 'Plans to Build Your Loyal Audience'
        },
        credibility: {
            headline: 'Why Grow With Us?',
            guarantees: [
                { title: 'Permanent Followers', description: 'The followers we deliver are permanent and will not disappear over time.' },
                { title: 'Real Profiles', description: 'We provide followers from real-looking, active profiles for maximum authenticity.' },
                { title: 'Gradual Delivery', description: 'We add followers over time to mimic organic growth and ensure safety.' },
                { title: '24/7 Support', description: 'Our support team is always ready to help with any questions.' }
            ],
            testimonials: followersTestimonials
        },
        faq: {
            items: [
                { question: 'What is the difference between followers and monthly listeners?', answer: 'Followers are permanent fans who get notifications about your new music. Monthly listeners are the unique people who have played your music in the last 28 days. Followers are for long-term fanbase building.' },
                { question: 'Will these followers listen to my music?', answer: 'Our service is designed to provide followers for social proof. While some may listen, we do not guarantee streams from these followers.' },
                { question: 'Will the followers I buy ever disappear?', answer: 'No, the followers are permanent. We offer a lifetime guarantee on our follower packages.' },
                { question: 'How quickly will I get the followers?', answer: 'Delivery is gradual to ensure it looks natural. Smaller packages can take a few days, while larger ones may take longer. You will see a steady increase.' }
            ]
        },
        finalCta: {
            headline: 'Ready to Build Your Tribe?',
            subheadline: 'Start building a real connection with your audience today.',
            ctaText: 'See All Follower Packages'
        },
        seo: {
            title: 'Buy Spotify Followers | Real & Permanent | SpotifyBoost',
            description: 'Buy real and permanent Spotify followers to grow your fanbase and increase new release visibility. Safe, fast, and guaranteed by SpotifyBoost.',
            url: 'buy-spotify-followers'
        }
    },
    {
        id: 'podcast',
        slug: 'buy-spotify-podcast-plays',
        hero: {
            headline: 'Top the Charts: Buy Spotify Podcast Plays',
            subheadline: "Boost your episode's rankings, attract new subscribers, and catch the eye of potential sponsors with increased plays.",
            ctaText: 'Boost My Podcast',
            inputPlaceholder: 'Enter Your Spotify Podcast Episode Link',
            trustIcons: ['High-Retention Plays', 'Chart-Boosting Formula', 'Safe & Anonymous']
        },
        benefits: {
            headline: 'Get Heard Above the Noise.',
            items: [
                { title: 'Climb the Spotify Charts', description: "More plays are a key factor in Spotify's podcast ranking algorithm. Higher rankings mean more organic discovery.", icon: 'charts' },
                { title: 'Attract Sponsorships', description: 'Brands want to partner with popular podcasts. A high play count is the proof they need to see a good ROI.', icon: 'sponsors' },
                { title: 'Build Authority', description: 'A well-played episode establishes you as an expert in your niche, making it easier to attract high-profile guests and loyal listeners.', icon: 'authority' }
            ]
        },
        howItWorks: {
            headline: 'Amplify Your Episode in 3 Simple Steps',
            steps: [
                { title: 'Choose Your Play Package', description: 'Select the number of plays you need for your podcast episode.' },
                { title: 'Provide Your Episode Link', description: 'Paste the URL of the specific Spotify episode you want to promote. No password required.' },
                { title: 'Watch Your Rankings Climb', description: 'Complete the payment and see your episode\'s play count and visibility increase.' }
            ]
        },
        pricing: {
            headline: 'Plans to Make Your Podcast a Hit'
        },
        credibility: {
            headline: 'The Podcaster\'s Choice',
            guarantees: [
                { title: 'High Retention', description: 'Our plays have high retention rates, signaling to Spotify that your content is engaging.' },
                { title: 'Safe & Discreet', description: 'Our service is confidential and safe for your podcast and Spotify account.' },
                { title: 'Chart Focused', description: 'Our methods are designed to help your podcast climb the Spotify charts.' },
                { title: 'Expert Support', description: 'Get 24/7 support from our team of podcast marketing experts.' }
            ],
            testimonials: podcastTestimonials
        },
        faq: {
            items: [
                { question: 'Can I split plays across multiple podcast episodes?', answer: 'Each order is for a single episode URL to maximize its impact on the charts. You can place separate orders for different episodes.' },
                { question: 'Will these plays help me get more subscribers?', answer: 'Increased plays and chart visibility often lead to more organic discovery, which can result in more subscribers (followers) for your podcast.' },
                { question: 'Are the plays from specific countries?', answer: 'Our standard packages come from a worldwide audience. For geo-targeted plays, please contact our support for a custom order.' },
                { question: 'How does this affect my download stats in Spotify for Podcasters?', answer: 'Our promotional plays are registered as online streams/plays within Spotify\'s ecosystem and will be reflected in your Spotify for Podcasters analytics.' }
            ]
        },
        finalCta: {
            headline: 'Ready to Be the Next Big Podcast?',
            subheadline: "Give your content the audience it deserves and start growing your show today.",
            ctaText: 'View Podcast Play Packages'
        },
        seo: {
            title: 'Buy Spotify Podcast Plays | SpotifyBoost',
            description: 'Buy Spotify podcast plays to boost your episode rankings, attract sponsors, and grow your audience. High-retention and safe plays from SpotifyBoost.',
            url: 'buy-spotify-podcast-plays'
        }
    }
];

export const servicePagesData = servicePagesContentData.reduce((acc, page) => {
    acc[page.slug] = page;
    return acc;
}, {} as Record<string, ServicePageContent>);
