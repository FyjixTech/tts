import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Faq = () => {
    return (
        <>
            <div className='container mt-5'>
                <div className="row mt-5 mb-5">
                    <div className="container-fluid mt-5">
                        <div>
                            <center><h4 className='mb-4'>FAQs</h4></center>

                            <Accordion defaultExpanded>
                                <AccordionSummary

                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <h5 component="span">For whom is this Text-to-Speech platform designed for?
                                    </h5>
                                </AccordionSummary>
                                <AccordionDetails>
                                    The service is tailored for everyone, including Creators, Students, and Businesses. Our goal is to "Give Your Words A Voice. In Any Language. In Any Accent. At One Fair Price."
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <h5 component="span">What is the core value of your service?</h5>
                                </AccordionSummary>
                                <AccordionDetails>
                                    We operate on a Demo-First Approach and are loved for our One Fair Price For All Languages, Never Expiring Packs, and commitment that We Don't Save Your Data.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel3-content"
                                    id="panel3-header"
                                >
                                    <h5 component="span">How does the Text-to-Speech process work?</h5>
                                </AccordionSummary>
                                <AccordionDetails>
                                    It's a simple, 3-step process:
                                    <ol>
                                        <li>Enter Your Text</li>
                                        <li>Select Language & Tone</li>
                                        <li>Generate and Download Audio</li>
                                    </ol>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel4-content"
                                    id="panel4-header"
                                >
                                    <h5 component="span">What kind of variety is available for the voices?</h5>
                                </AccordionSummary>
                                <AccordionDetails>
                                    We support Multiple international English accents and regional Languages & Accents to help you find the perfect voice for your content.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel5-content"
                                    id="panel5-header"
                                >
                                    <h5 component="span">What is your pricing model?</h5>
                                </AccordionSummary>
                                <AccordionDetails>
                                    We offer Fair, Flexible Pricing where you Pay Only For What you Use. You Buy characters upfront and use them at your own pace ("Use As You Pay").
                                </AccordionDetails>
                            </Accordion>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel6-content"
                                    id="panel6-header"
                                >
                                    <h5 component="span">Do my purchased character packs expire?</h5>
                                </AccordionSummary>
                                <AccordionDetails>
                                    No. We offer Never Expiring Packs. Once you buy characters, they remain in your account with no expiry and no hidden costs.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel7-content"
                                    id="panel7-header"
                                >
                                    <h5 component="span">Are there discounts for large volume purchases?</h5>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Yes, we offer Bulk Discounts. The cost per character decreases significantly as you purchase larger packs (e.g., Business or Enterprise).
                                </AccordionDetails>
                            </Accordion>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel8-content"
                                    id="panel8-header"
                                >
                                    <h5 component="span">Can you detail your standard character pack prices?</h5>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Our pay-as-you-go packs are:
                                    <ul>
                                        <li><b>Starter:</b> ₹50 for 750 characters (₹0.066/character)</li>
                                        <li><b>Student:</b>  ₹250 for 5,000 characters (₹0.05/character)</li>
                                        <li><b>Pro:</b>  ₹1,000 for 25,000 characters (₹0.04/character)</li>
                                        <li><b>Business:</b> ₹3,000 for 80,000 characters (₹0.037/character)</li>
                                        <li><b>Enterprise:</b> ₹5,000 for 150,000 characters (₹0.033/character) </li>
                                    </ul>
                                    We also offer a Custom plan.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel9-content"
                                    id="panel9-header"
                                >
                                    <h5 component="span">Can I try the service before purchasing a pack?</h5>
                                </AccordionSummary>
                                <AccordionDetails>
                                    Yes, we encourage you to Try Before You Buy. You can type up to 5000 characters and hear them instantly. You can also Sign up free to generate and download three sample audio files.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel9-content"
                                    id="panel9-header"
                                >
                                    <h5 component="span">Do you store my input text or generated audio?</h5>
                                </AccordionSummary>
                                <AccordionDetails>
                                    No. Your privacy is a priority. We Don't Save Your Generated Audio, ensuring that your audio content remains private.
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Faq