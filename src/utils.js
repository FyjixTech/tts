export const getEnvironment = () => {
  const env = process.env.REACT_APP_BACKEND_URL;
  return env;
};

export const voiceStyles = () => {
 const  VOICE_STYLES = {
    "cheerful": "Cheerful 😀",
    "sad": "Sad 😢",
    "angry": "Angry 😠",
    "chat": "Casual Chat 💬",
    "advertisement_upbeat":"Promotional 📈",
    "customerservice": "Customer Service ☎️",
    "assistant": "Assistant 🤖",
    "calm": "Calm 😌",
    "fearful": "Fearful 😨",
    "serious": "Serious 🧐",
    "depressed": "Depressed 😞",
    "excited": "Excited 🤩",
    "friendly": "Friendly 🙂",
    "terrified": "Terrified 😱",
    "unfriendly": "Unfriendly 🙃",
    "whispering": "Whispering 🤫",
    "hopeful": "Hopeful 🌈",
    "shouting": "Shouting 📢",
    "embarrassed": "Embarrassed 😳",
    "affectionate": "Affectionate ❤️",
    "narration-professional": "Narration (Professional) 🎙️",
    "narration-relaxed": "Narration (Relaxed) 🎧",
    "newscast-casual": "Newscast (Casual) 📰",
    "newscast-formal": "Newscast (Formal) 📰",
    "sports-commentary": "Sports Commentary ⚽",
    "sports-commentary-excited": "Sports Commentary (Excited) 🏆",
}

return VOICE_STYLES;
}