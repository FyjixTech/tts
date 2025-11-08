import React, { useEffect, useState } from 'react'
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  ListItemText,
  TextField,
} from '@mui/material';
import { getEnvironment, voiceStyles } from "../utils.js";
import Grid from '@mui/material/Grid';
import logo from "../assets/logo3.png"
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import { useNavigate } from 'react-router';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as toxicity from '@tensorflow-models/toxicity';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import TemporaryDrawer from './sidebar.jsx';
import Instructions from './instructions.jsx';
import { UAParser } from 'ua-parser-js';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from 'prop-types';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
import SpeedIcon from '@mui/icons-material/Speed';
import { Link } from 'react-router';
import HearingIcon from '@mui/icons-material/Hearing';

const Input = styled(MuiInput)`
  width: 42px;
`;

const intensityLabels = {
  0.5: "Subtle",
  1: "Normal",
  1.5: "Strong",
  2: "Exaggerated",
  3: "Over the Top",
};

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={intensityLabels[value] || value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.node,
};

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: '#007bff',
  height: 5,
  padding: '15px 0',
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
    '&:before': {
      boxShadow:
        '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
    },
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: -6,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&::before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: '#000',
      ...theme.applyStyles('dark', {
        color: '#fff',
      }),
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
    height: 5,
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    boxShadow: 'inset 0px 0px 4px -2px #000',
    backgroundColor: '#d0d0d0',
  },
  ...theme.applyStyles('dark', {
    color: '#0a84ff',
  }),
}));
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const voiceStylesa = voiceStyles();

const Home = () => {
  const [loading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("");

  const [languages, setLanguages] = useState({});
  const [voice, setVoice] = useState("");
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [count, setCount] = useState(0)
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [alignment, setAlignment] = React.useState('text');
  const [volume, setVolume] = React.useState(30);
  const [mood, setMood] = useState("");
  const [intensitty, setIntensitty] = useState("");
  const [rate, setRate] = useState(0)
  const [pitch, setPitch] = useState(1)
  const [voiceinfo, setVoiceInfo] = useState("");

  const [clearcheck, setClearCheck] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleRefreshButtonClick = async () => {
    window.location.reload()
  }

  const fetchLanguages = async () => {
    try {
      setIsLoading(true);
      setLanguage("")
      setVoice("")
      setVoices([])
      const url = getEnvironment();
      const api = "tts-get-all-languages";
      const link = url + api;
      const token = sessionStorage.getItem("accesstoken");

      const response = await fetch(link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const data2 = Object.entries(data.languages[0]).sort((a, b) => a[1].localeCompare(b[1]));
      setLanguages(data2)
    } catch (err) {
      console.error("Error fetching voices:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSliderChange = (event, newValue) => {
    setVolume(newValue);
  };

  const handleInputChange = (event) => {
    setVolume(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (volume < 0) {
      setVolume(0);
    } else if (volume > 100) {
      setVolume(100);
    }
  };
  const fetchVoices = async (selectedLanguage = language) => {
    try {
      setIsLoading(true);
      const url = getEnvironment();
      const api = "tts-get-all-voices";
      const link = url + api;
      const token = sessionStorage.getItem("accesstoken");

      const response = await fetch(link, {
        method: "POST",
        body: JSON.stringify({
          "filters": {
            "Locale": selectedLanguage || ""
          }
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
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

  const volumeMap = (val) => {
    if (val < 20) return "x-soft";
    if (val < 40) return "soft";
    if (val < 60) return "medium";
    if (val < 80) return "loud";
    return "x-loud";
  };

  const newMap = (val) => {
    if (val == "x-soft") return "-50%";
    if (val == "soft") return "-25%";
    if (val == "medium") return "0%";
    if (val == "loud") return "+25%";
    if (val == "x-loud") return "+50%";
    if (val == "silent") return "-100%";
  }
  const setVoiceInformation = async (e) => {
    const selectedVoice = e.target.value; // get actual object
    const category = (selectedVoice["VoiceTag"]["ContentCategories"]).join(",  ");
    const personalities = (selectedVoice["VoiceTag"]["VoicePersonalities"]).join(", ");

    const string = `This voice is suitable for ${category}, providing an appropriate tone and style for those contexts. It carries a personality that is ${personalities}, designed to make interactions sound more engaging and natural.`;

    setVoiceInfo(string);
  };
  const mapPich = (val) => {

    if (val == 0) return "0Hz";
    if (val < 0) return "" + pitch + "Hz";
    if (val > 0) return "" + pitch + "Hz";

  }
  const handleGenerateVoice = async () => {
    try {
      setIsLoading(true);
      setError(""); // Clear any previous errors

      const token = sessionStorage.getItem("accesstoken");
      const urla = getEnvironment();
      const api = "tts-generate-audio";
      const link = urla + api;
      const threshold = 0.1;
      if (alignment === "text") {
        // Wait for toxicity check to complete before proceeding
        const model = await toxicity.load(threshold);
        const predictions = await model.classify([text]);
        // Check for toxic content
        for (let i = 0; i < 7; i++) {

          if (predictions[i].results[0].probabilities[1] > 0.1) {
            setError("That input triggered our content filters. Fyjix keeps your data private — but we draw the line at hate or harm. Try again respectfully.");
            setIsLoading(false);
            return; // Exit early if toxic content is detected
          }
          // Only proceed with API call if toxicity check passed
        }
        const response = await fetch(link, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            {
              "inputas": alignment,
              "lang": language,
              "ShortName": voice.ShortName,
              "mood": mood,
              "intensity": intensitty,
              rate: rate,   // ✅ "+17%" or "-20%"
              pitch: pitch, // ✅ "+2st" or "-3st"
              volume: volume,                 // ✅ "soft", "loud", etc.
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
        else{
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
  
          const a = document.createElement("a");
          a.href = url;
          a.download = "fyjix_voice.mp3";
          a.click();
  
          window.URL.revokeObjectURL(url);

        }


       
      }
      else {
        // Only proceed with API call if toxicity check passed
        // const response = await fetch(link, {
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ "text": text, "ShortName": voice.ShortName, "logData": getClientInfo() })
        // });

        // if (!response.ok) {
        //   const data = await response.json();
        //   setError(data.data)
        //   throw new Error("Failed to generate audio");
        // }

        // const blob = await response.blob();
        // const url = window.URL.createObjectURL(blob);

        // const a = document.createElement("a");
        // a.href = url;
        // a.download = "fyjix_voice.mp3";
        // a.click();

        // window.URL.revokeObjectURL(url); // Clean up
      }

    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/")
  }

  return (
    <>

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
          <div className="row mb-4">
            <div className="col-sm-2 col-lg-2 col-md-2">
              <img src={logo} className='logohome' />
            </div>
            <div className="col-sm-2 col-lg-9 col-md-9">
              <Typography variant="h5" component="h1" gutterBottom>
                Voice Generator
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Select your preferences to generate a voice
              </Typography>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={open}>
                  <Box sx={style}>

                    <Instructions />
                  </Box>
                </Fade>
              </Modal>
            </div>
            <div className="col">
              <div className="d-flex flex-row flex-md-column align-items-center gap-2 mb-2">
                {/* <button
                  onClick={handleLogout}
                  className='btn btn-danger'
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "1000px",
                    height: "40px",
                    width: "40px"
                  }}>
                  <PowerSettingsNewRoundedIcon />
                </button> */}

                {/* <Link
                  to="/how-to-use"
                  className='btn btn-info-button'
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "1000px",
                    height: "40px",
                    width: "40px"
                  }}>
                  <InfoOutlineIcon />
                </Link> */}
              </div>
            </div>
          </div>

          {/* Main Controls */}
          {/* <div className="row mb-4">
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="text">Text</ToggleButton>
              <ToggleButton disabled value="xml">XML...Coming Soon</ToggleButton>
            </ToggleButtonGroup>
          </div> */}
          <div className="row">
            {/* Language Selection */}
            <div className="col-md-6 mb-3">
              <FormControl fullWidth variant="outlined">
                <InputLabel>Language</InputLabel>
                <Select
                  label="Language"
                  value={language}

                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  {Object.entries(languages).map(([value, label]) => (
                    <MenuItem key={label[0]} value={label[0]}>
                      <ListItemText primary={label[1]} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Voice Selection */}
            <div className="col-md-6 mb-3">
              <FormControl fullWidth variant="outlined">
                <InputLabel>Voice</InputLabel>
                <Select
                  label="Voice"
                  value={voice}
                  onChange={(e) => {
                    setVoice(e.target.value)
                    setVoiceInformation(e)}}
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

          {voiceinfo && (
            <>
              <div className="row mb-3">
                <div className="col">
                  <span className="text-success">{voiceinfo}</span>
                </div>
              </div>
            </>
          )}


          {/* <div className="row mb-2">
            <div className="col-md-6">
              <FormControl fullWidth variant="outlined">
                <InputLabel>Mood</InputLabel>
                <Select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  disabled={voice === "" ? true : false}
                  label="Mood"
                >
                  {Object.entries(voiceStylesa).map(([value, label]) => (
                    <MenuItem key={value} value={value}>

                      <ListItemText primary={label} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="col-md-6">
              <Box>
                <Typography gutterBottom>Intensity</Typography>
                <IOSSlider
                  aria-label="ios slider"
                  onChange={(e) => setIntensitty(e.target.value)}
                  max={3}
                  step={null}   // disables free dragging, forces only marks
                  marks={[
                    { value: 0.5, label: "Subtle" },
                    { value: 1, label: "Default" },
                    { value: 1.5, label: "Strong" },
                    { value: 2, label: "Exaggerated" },
                    { value: 3, label: "Over the Top" },
                  ]}
                  ValueLabelComponent={ValueLabelComponent}
                  defaultValue={1}
                  valueLabelDisplay="on"
                />
              </Box>

            </div>

          </div> */}

          {/* <div className="row">
            <div className="col-md-6 mb-3">
              <Box>
                <Typography id="input-slider" gutterBottom>
                  Volume
                </Typography>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid>
                    <VolumeUp />
                  </Grid>
                  <Grid size="grow">
                    <Slider
                      value={typeof volume === 'number' ? volume : 0}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider"
                    />
                  </Grid>

                </Grid>
              </Box>
            </div>
            <div className="col-md-6 mb-3">
              <Box>
                <Typography id="input-slider" gutterBottom>
                  Rate
                </Typography>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid>
                    <SpeedIcon />
                  </Grid>
                  <Grid size="grow">
                    <Slider
                      min={-50}
                      max={50}
                      value={typeof rate === "number" ? rate : 0}
                      onChange={(e, newValue) => setRate(newValue)}
                    />
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div> */}

          {/* <div className="row mb-3">
            <div className="col-md-6">
              <Box>
                <Typography id="input-slider" gutterBottom>
                  Pitch
                </Typography>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid>
                    <HearingIcon />
                  </Grid>
                  <Grid size="grow">
                    <Slider
                      min={-10}
                      max={10}
                      value={typeof pitch === "number" ? pitch : 0}
                      onChange={(e, newValue) => setPitch(newValue)}
                    />
                  </Grid>

                </Grid>
              </Box>
            </div>
          </div> */}

          {/* Profile Section */}
          <div className="row mb-4">
            <div className="col">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="form-label mb-2">Character count</label>
                <small className="text-muted">{count} / 5000</small>
              </div>
              <TextField
                fullWidth
                disabled={voice === "" ? true : false}
                onChange={(e) => handleTextChange(e.target.value)}
                label="Text"
                inputProps={{ maxLength: 5000 }}
                variant="outlined"
                multiline
                rows={10}
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
                  disabled={loading || !voice}
                >
                  Generate Voice
                </Button>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home