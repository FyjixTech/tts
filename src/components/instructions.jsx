import React from 'react'
import Typography from '@mui/material/Typography';


const Instructions = () => {
    return (
        <div>
            <Typography id="transition-modal-title" variant="h6" component="h2" sx={{pt:5, pl:5}}>
                Instructions
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2, pr:5,pl:5, pb:5}}>
                <p>If you're generating voice in regional or non-Latin languages
                    like <b>Hindi </b>,<b>Telugu </b>,<b>Tamil </b>,<b>Gujarati   </b> or <b>Chinese </b>
                    please type your text in the <b>native script</b>.</p>
                <p> ❌ Kem cho dosto (Incorrect for Gujarati)</p>
                <p> ✅ કેમ છો મિત્રો (Correct)</p>
                <p></p>
                <p> ❌ Miru ela unnaru? (Incorrect for Telegu)</p>
                <p> ✅ మీరు ఎలా ఉన్నారు? (Correct)</p>
                <p></p>
                <p> ❌ Ni hao (Incorrect for Chinese)</p>
                <p> ✅ 你好 (Correct)</p>
                <p>Typing in English (Romanized text) will lead to inaccurate pronunciation.</p>
            </Typography>
        </div>
    )
}

export default Instructions