import React, { useEffect, useState, useCallback } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { TableVirtuoso } from "react-virtuoso";
import { getEnvironment } from "../utils";
import { useNavigate } from "react-router";

const columns = [
  { width: 200, label: "Transaction ID", dataKey: "transactionId" },
  { width: 200, label: "User", dataKey: "userEmail" },
  { width: 200, label: "Date", dataKey: "createdAt" },
  { width: 150, label: "Amount", dataKey: "payPrice" },
  { width: 150, label: "Action", dataKey: "_id" },
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

const fixedHeaderContent = () => (
  <TableRow>
    {columns.map((column) => (
      <TableCell
        key={column.dataKey}
        variant="head"
        align="center"
        style={{ width: column.width }}
        sx={{ backgroundColor: "background.paper", fontWeight: 600 }}
      >
        {column.label}
      </TableCell>
    ))}
  </TableRow>
);

const ApprovePayments = () => {
  const [paymentApproval, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accesstoken");

  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      const baseURL = getEnvironment();
      const apiName = "tts-get-payments-to-approve";
      const link = baseURL + apiName;

      const response = await fetch(link, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      if (response.ok && response.status === 200) {
        setPayments(data.data || []);
      } else {
        throw new Error("Failed to load payments");
      }
    } catch (error) {
      console.error("Fetch payments error:", error);
      navigate("/error");
    } finally {
      setLoading(false);
    }
  }, [token, navigate]);

  const handleApprove = async (transactionId) => {
    try {
      setLoading(true);
      const baseURL = getEnvironment();
      const apiName = "tts-approve-payments";
      const link = baseURL + apiName;

      const response = await fetch(link, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactionId }),
      });

      const data = await response.json();
      if (response.ok && data.msg === "success") {
        await fetchPayments();
      } else {
        console.error("Approval failed:", data);
      }
    } catch (error) {
      console.error("Error approving payment:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const rowContent = (_index, row) => (
    <>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align="center">
          {column.dataKey === "_id" ? (
            <Button
              size="small"
              variant="contained"
              color="success"
              disabled={loading}
              onClick={() => handleApprove(row.transactionId)}
            >
              {loading ? "..." : "Approve"}
            </Button>
          ) : column.dataKey === "createdAt" ? (
            new Date(row.createdAt).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })
          ) : (
            String(row[column.dataKey])
          )}
        </TableCell>
      ))}
    </>
  );

  return (
    <div className="container pt-5 pb-5">
      <Paper elevation={3}>
        <TableVirtuoso
          style={{ height: "400px" }}
          data={paymentApproval}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      </Paper>
    </div>
  );
};

export default ApprovePayments;
