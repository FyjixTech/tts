import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableVirtuoso } from "react-virtuoso"; 
import { getEnvironment } from "../utils";
import { useNavigate } from "react-router";


const columns = [
  { width: 200, label: "Transaction Id", dataKey: "transactionId" },
  { width: 200, label: "User", dataKey: "userEmail" },
  { width: 200, label: "Date", dataKey: "createdAt" },
  { width: 150, label: "Amount", dataKey: "payPrice" },
  { width: 150, label: "", dataKey: "_id" },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="center"
          style={{ width: column.width }}
          sx={{ backgroundColor: "background.paper" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

const ApprovePayments = () => {
  const [paymentApproval, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accesstoken");

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleApprove = async (transactionId) => {
    try {
      const baseURL = getEnvironment();
      const apiName = "tts-approve-payments";
      const link = baseURL + apiName;
      const response = await fetch(link, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionId: transactionId }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.msg === "success") {
        await fetchPayments(); // Refresh the table
      }
    } catch (error) {
      console.error("Error approving payment:", error);
    }
  };
  const fetchPayments = async () => {
    try {
      setIsLoading(true);
      const baseURL = getEnvironment();
      const apiName = "tts-get-payments-to-approve";
      const link = baseURL + apiName;
      const response = await fetch(link, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({})      
      });
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        if (response.status === 200) {
          setPayments(data.data);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      navigate("/error");
    }
  };
  const rowContent = (_index, row) => (
    <>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align="center">
          {column.dataKey === "_id" ? (
            <button
              className="btn btn-primary"
              onClick={() => handleApprove(row.transactionId)}
            >
              Approve
            </button>
          ) : (
            String(row[column.dataKey])
          )}
        </TableCell>
      ))}
    </>
  );
  return (
    <div>
      <div className="container pt-5 pb-5">
        <Paper>
          <TableVirtuoso
            style={{ height: "400px", overflow: "auto" }}
            data={paymentApproval}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </div>
    </div>
  )
}

export default ApprovePayments