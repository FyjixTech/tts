import React, { useState, useRef, useEffect } from 'react'
import {
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    ListItemText,
    TextField,
} from '@mui/material';
import { getEnvironment } from "../utils.js";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { UAParser } from 'ua-parser-js';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

const languages_list = [
    { code: 'bn-IN', label: 'Bangla (India)', enabled: true },
    { code: 'en-AU', label: 'English (Australia)', enabled: true },
    { code: 'en-CA', label: 'English (Canada)', enabled: true },
    { code: 'en-HK', label: 'English (Hong Kong SAR)', enabled: true },
    { code: 'en-IN', label: 'English (India) (Preview)', enabled: true },
    { code: 'en-IE', label: 'English (Ireland)', enabled: true },
    { code: 'en-KE', label: 'English (Kenya)', enabled: true },
    { code: 'en-NZ', label: 'English (New Zealand)', enabled: true },
    { code: 'en-NG', label: 'English (Nigeria)', enabled: true },
    { code: 'en-PH', label: 'English (Philippines)', enabled: true },
    { code: 'en-SG', label: 'English (Singapore)', enabled: true },
    { code: 'en-ZA', label: 'English (South Africa)', enabled: true },
    { code: 'en-TZ', label: 'English (Tanzania)', enabled: true },
    { code: 'en-GB', label: 'English (United Kingdom)', enabled: true },
    { code: 'en-US', label: 'English (United States)', enabled: true },
    { code: 'gu-IN', label: 'Gujarati (India)', enabled: true },
    { code: 'hi-IN', label: 'Hindi (India)', enabled: true },
    { code: 'kn-IN', label: 'Kannada (India)', enabled: true },
    { code: 'ml-IN', label: 'Malayalam (India)', enabled: true },
    { code: 'mr-IN', label: 'Marathi (India)', enabled: true },
    { code: 'ta-IN', label: 'Tamil (India)', enabled: true },
    { code: 'te-IN', label: 'Telugu (India)', enabled: true },
    { code: 'ur-IN', label: 'Urdu (India)', enabled: true },
];



const Demo = () => {

    const audioRef = useRef(null);

    const [loading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState("");

    const [voices, setVoices] = useState([]);
    const [voice, setVoice] = useState("");

    const [text, setText] = useState("");
    const [count, setCount] = useState(0)
    const [error, setError] = useState("");

    const [audio, setAudio] = useState(null);

    const [isPlaying, setIsPlaying] = useState(false);

    const alignment = "text";

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };
    useEffect(() => {
        const audioEl = audioRef.current;
        if (!audioEl) return;

        const handleEnded = () => setIsPlaying(false);
        audioEl.addEventListener("ended", handleEnded);

        return () => {
            audioEl.removeEventListener("ended", handleEnded);
        };
    }, [audio]);

    const fetchVoices = async (selectedLanguage = language) => {
        try {
            setIsLoading(true);
            const url = getEnvironment();
            const api = "tts-get-all-voices-for-sample";
            const link = url + api;

            const response = await fetch(link, {
                method: "POST",
                body: JSON.stringify({
                    "filters": {
                        "Locale": selectedLanguage || ""
                    }
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setVoices(data.voices || []);
            setVoice(""); // Reset voice selection when language changes
        } catch (err) {
            console.error("Error fetching voices:", err);
        } finally {
            setIsLoading(false);
        }
    };
    const handleLanguageChange = (newLanguage) => {
        setLanguage(newLanguage);
        fetchVoices(newLanguage);
    };
    const handleTextChange = (teext) => {
        setText(teext)
        setCount(teext.length)
    }

    function getClientInfo() {
        const parser = new UAParser();
        const result = parser.getResult();
        return {
            browser: `${result.browser.name || "Unknown"} ${result.browser.version || ""}`,
            os_info: `${result.os.name || "Unknown"} ${result.os.version || ""}`,
            device_type: result.device.type || "Desktop", // could be 'mobile', 'tablet', etc.
            screen_resolution: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language || "Unknown",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
        };
    }
    const handleRefreshButtonClick = async () => {
        window.location.reload()
    }
    const handleGenerateVoice = async () => {
        try {
            setIsLoading(true);
            setError("");
            const urla = getEnvironment();
            const api = "generate-free-sample-audio";
            const link = urla + api;
            if (alignment === "text") {
                const response = await fetch(link, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {
                            "inputas": alignment,
                            "lang": language,
                            "ShortName": voice.ShortName,
                            "mood": "",
                            "intensity": "",
                            rate: "",   // ✅ "+17%" or "-20%"
                            pitch: "", // ✅ "+2st" or "-3st"
                            volume: "",                 // ✅ "soft", "loud", etc.
                            "text": text,
                            "logData": getClientInfo()
                        }
                    )
                });
                if (!response.ok) {
                    const rr = await response.json()
                    console.log(rr.error)
                    setError(rr.error)
                    throw new Error("Failed to generate audio");
                }
                else {
                    // Instead of downloading, prepare streaming audio
                    const blob = await response.blob();
                    const audioURL = URL.createObjectURL(blob);
                    setAudio(audioURL); // store in state
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <div className="container">
                <center className='header'><h2>Try Free Demo</h2></center>
            </div>
            <div className="container">
                {loading && (
                    <div className="loader"></div>
                )}

                <div className="container sticky-top">
                    <div className="row">
                        {error && (
                            <Alert severity="error">
                                {error}
                            </Alert>
                        )}
                    </div>
                    <div className="container p-4">
                        <div className="container">
                            <div className="container mb-4">
                                {audio && (
                                    <>
                                        <div className="row">
                                        <center><h4>Login or Sign Up to download your audio.</h4></center>

                                            <div className="col-sm-12 col-lg-1 col-md-1">
                                                <audio
                                                    ref={audioRef}
                                                    src={audio}
                                                    style={{ display: "none" }}
                                                />

                                                <div onClick={toggleAudio} style={{ cursor: "pointer", fontSize: 50 }}>
                                                    {isPlaying ? (
                                                        <PauseCircleIcon style={{ fontSize: 50 }} />
                                                    ) : (
                                                        <PlayCircleIcon style={{ fontSize: 50 }} />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-lg-11 col-md-11 audio">
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Language</InputLabel>
                                    <Select
                                        label="Language"
                                        value={language}
                                        onChange={(e) => handleLanguageChange(e.target.value)}
                                    >
                                        {languages_list.map(lang => (
                                            <MenuItem
                                                key={lang.code}
                                                value={lang.code}
                                                disabled={!lang.enabled}      // <-- now you control it
                                            >
                                                <ListItemText primary={lang.label} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                            </div>

                            <div className="col-md-6 mb-3">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Voice</InputLabel>
                                    <Select
                                        label="Voice"
                                        value={voice}
                                        onChange={(e) => {
                                            setVoice(e.target.value)
                                        }}
                                        disabled={voices.length === 0}
                                    >
                                        <MenuItem value="">
                                            <em>Select Voice</em>
                                        </MenuItem>
                                        {voices.map((district, index) => (
                                            <MenuItem key={index} value={district}>
                                                <ListItemText primary={district.FriendlyName.replace("Microsoft ", "").replace("Online ", "")} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <label className="form-label mb-2">Character count</label>
                                    <small className="text-muted">{count} / 150</small>
                                </div>
                                <TextField
                                    fullWidth
                                    disabled={voice === "" ? true : false}
                                    onChange={(e) => handleTextChange(e.target.value)}
                                    label="Text"
                                    inputProps={{ maxLength: 150 }}
                                    variant="outlined"
                                    multiline
                                    rows={5}
                                />
                            </div>

                        </div>

                        {/* Action Buttons */}
                        <div className="row pb-3">
                            <div className="col-12">
                                <Box display="flex" gap={2} justifyContent="flex-end">
                                    <Button
                                        variant="outlined"
                                        onClick={handleRefreshButtonClick}
                                        disabled={loading}
                                    >
                                        Refresh Voices
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleGenerateVoice}
                                        disabled={loading || audio !==null}
                                    >
                                        Generate Voice
                                    </Button>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Demo