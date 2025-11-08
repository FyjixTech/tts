import React, { useEffect, useState } from 'react';
import { getEnvironment } from "../utils.js";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',

  color: 'black',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const MyPayments = () => {
  const [payments, setPaymentsData] = useState([]);
  const token = sessionStorage.getItem("accesstoken");

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    const url = getEnvironment();
    const api = "get-my-payments";
    const link = url + api;
    try {
      const response = await fetch(link, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({})
      });

      const data = await response.json();
      console.log(data.data)
      setPaymentsData(data.data)
    }
    catch (error) {

    }
  }

  return (
    <div>
      <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ pt: 2, pl: 5, pb: 4 }}>
        My Payments
      </Typography>
      <Box sx={{ width: '90%' }}>
        <Stack spacing={3}>
          {payments ? <>
            {payments.map((payment, index) => (
              <Item key={index}>
                <div className="row">
                  <div className="col-1 center">
                    {payment.status === "QR_GENERATED" ? <> <PauseCircleFilledIcon /> </> : <>
                      {payment.status === "PAID_PENDING_APPROVAL" ? <> <AccessTimeIcon /> </> : <>
                        {
                          payment.status === "APPROVED" ? <> <CheckBoxIcon /> </> : <>
                            {
                              payment.status === "REJECTED" ? <> <CancelIcon /> </> : <></>
                            }
                          </>
                        }
                      </>}
                    </>}

                  </div>
                  <div className="col-11">
                    <b>Transaction Id: </b>{payment.transactionId}<br />
                    <b>Amount Paid: </b>₹{payment.payPrice}<br />
                    <b>Characters: </b>{payment.chars}<br />
                    <b>Status: </b>{payment.status === "QR_GENERATED" ? <> QR is generated. Please make the payment. Kindly contact support if the payment is done and the status is not "Pending For Approval". </> : <>
                      {payment.status === "PAID_PENDING_APPROVAL" ? <> Pending For Approval </> : <>
                        {
                          payment.status === "APPROVED" ? <> Approved </> : <>
                            {
                              payment.status === "REJECTED" ? <> Rejected. Please contact support if you think this is a mistake.</> : <></>
                            }
                          </>
                        }
                      </>}
                    </>}
                  </div>
                </div>

              </Item>
            ))}

          </> : <>No Paymnets Available</>}
        </Stack>
      </Box>
    </div>
  )
}

export default MyPayments