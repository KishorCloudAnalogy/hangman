import React, { useEffect, useState } from "react";
import Table from "rc-table";
import Spinner from "./Spinner";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const hideTimerHandler = () => {};

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 200,
      render: (value) => {
        return new Date(value).toLocaleDateString();
      },
    },
    {
      title: "Error",
      dataIndex: "error",
      key: "error",
      width: 200,
    },
    {
      title: "Finish",
      dataIndex: "finish",
      key: "finish",
      width: 200,
      render: (value) => <input type="checkbox" checked={value} />,
    },
  ];

  const getHistory = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    fetch("http://localhost:3008/savedHistory", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setLoading(true);
        if (result && result.data && result.data.length > 0) {
          setHistory(result.data);
        } else {
          setHistory([]);
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert("Something went wrong.");
      });
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItem: "center" }}
    >
      {loading ? (
        <Table columns={columns} data={history} />
      ) : (
        <Spinner hideTimer={hideTimerHandler} />
      )}
    </div>
  );
};

export default History;
