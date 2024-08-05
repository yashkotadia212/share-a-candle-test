import React, { useState } from "react";
import { Table, Tag, Input, Space, Button } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import convertCamelCaseToTitleCase from "../utils/convertCamelCaseToTitleCase";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import { GoFilter } from "react-icons/go";
import { HiOutlineSearch } from "react-icons/hi";
import { TbArrowsUpDown } from "react-icons/tb";

const AdminTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  let searchInput = null;
  const navigate = useNavigate();

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${convertCamelCaseToTitleCase(dataIndex)}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  function getEventStatusColor(status) {
    return eventTableLegendData.find((item) => item.text === status + " Event")
      .color;
  }

  const eventTableLegendData = [
    {
      text: "Non-customized Products",
      color: "#8D8D8D",
    },
    {
      text: "Customized Products",
      color: "#6A8BFF",
    },
    {
      text: "Upcoming Payout",
      color: "#B6B6B6",
    },
    {
      text: "Payout Completed",
      color: "#6AFFA6",
    },
    {
      text: "Payout Pending",
      color: "#FF766D",
    },
    {
      text: "Upcoming Event",
      color: "#C4E8C4",
    },
    {
      text: "Running Event",
      color: "#97C3F8",
    },
    {
      text: "Completed Event",
      color: "#94A5FE",
    },
  ];

  const columns = [
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
      ...getColumnSearchProps("eventName"),
      render: (text) => (
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                eventTableLegendData[getRandomIndex(eventTableLegendData)]
                  .color,
            }}
          ></div>
          <div>{text}</div>
        </div>
      ),
      filterIcon: (filtered) => (
        <HiOutlineSearch
          className="text-xl"
          style={{ color: filtered ? "#1890ff" : "#808080" }}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Upcoming", value: "Upcoming" },
        { text: "Running", value: "Running" },
        { text: "Completed", value: "Completed" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        return (
          <Tag
            color={getEventStatusColor(status)}
            className="!text-black rounded-xl px-3"
          >
            {status}
          </Tag>
        );
      },
      filterIcon: (filtered) => (
        <GoFilter
          className="text-xl"
          style={{ color: filtered ? "#1890ff" : "#808080" }}
        />
      ),
    },
    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
    },
    {
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
      sorter: (a, b) => a.sales - b.sales,
      render: (sales) => `$${sales}`,
      sortIcon: () => <TbArrowsUpDown className="text-lg text-gray-400" />,
    },
    {
      title: "My Earnings",
      dataIndex: "myEarnings",
      key: "myEarnings",
      sorter: (a, b) => a.myEarnings - b.myEarnings,
      render: (earnings) => `$${earnings}`,
      sortIcon: () => <TbArrowsUpDown className="text-lg text-gray-400" />,
    },
    {
      title: "Team Members",
      dataIndex: "teamMembers",
      sorter: (a, b) => a.teamMembers - b.teamMembers,
      key: "teamMembers",
      sortIcon: () => <TbArrowsUpDown className="text-lg text-gray-400" />,
    },
    {
      title: "Supporters",
      dataIndex: "supporters",
      key: "supporters",
      sorter: (a, b) => a.supporters - b.supporters,
      sortIcon: () => <TbArrowsUpDown className="text-lg text-gray-400" />,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => {
        return dayjs(date).format("D MMM YYYY");
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => {
        return dayjs(date).format("D MMM YYYY");
      },
    },
    {
      title: "Payout",
      dataIndex: "payout",
      key: "payout",
      render: (date) => {
        return (
          <Tag
            color={
              eventTableLegendData[Math.round(Math.random() * (4 - 2) + 2)]
                .color
            }
            className="!text-black rounded-xl px-3"
          >
            {dayjs(date).format("D MMM YYYY")}
          </Tag>
        );
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <LuPencil
          title="Edit Event"
          className="cursor-pointer text-lg text-gray-400 hover:text-gray-800 transition"
          onClick={() => navigate("/event-details")}
        />
      ),
    },
  ];

  const data = [
    {
      key: "1",
      eventName: "Event 1",
      status: "Upcoming",
      orders: 120,
      sales: 4500,
      myEarnings: 900,
      teamMembers: 5,
      supporters: 50,
      startDate: "2024-08-01",
      endDate: "2024-08-05",
      payout: "2024-08-10",
    },
    {
      key: "2",
      eventName: "Event 2",
      status: "Running",
      orders: 150,
      sales: 5200,
      myEarnings: 1040,
      teamMembers: 7,
      supporters: 75,
      startDate: "2024-08-02",
      endDate: "2024-08-06",
      payout: "2024-08-12",
    },
    {
      key: "3",
      eventName: "Event 3",
      status: "Completed",
      orders: 200,
      sales: 6500,
      myEarnings: 1300,
      teamMembers: 8,
      supporters: 100,
      startDate: "2024-08-03",
      endDate: "2024-08-07",
      payout: "2024-08-15",
    },
    {
      key: "4",
      eventName: "Event 4",
      status: "Upcoming",
      orders: 90,
      sales: 3100,
      myEarnings: 620,
      teamMembers: 4,
      supporters: 40,
      startDate: "2024-08-04",
      endDate: "2024-08-08",
      payout: "2024-08-20",
    },
    {
      key: "5",
      eventName: "Event 5",
      status: "Running",
      orders: 175,
      sales: 5800,
      myEarnings: 1160,
      teamMembers: 6,
      supporters: 80,
      startDate: "2024-08-05",
      endDate: "2024-08-09",
      payout: "2024-08-18",
    },
    {
      key: "6",
      eventName: "Event 6",
      status: "Completed",
      orders: 250,
      sales: 7500,
      myEarnings: 1500,
      teamMembers: 10,
      supporters: 120,
      startDate: "2024-08-06",
      endDate: "2024-08-10",
      payout: "2024-08-25",
    },
    {
      key: "7",
      eventName: "Event 7",
      status: "Upcoming",
      orders: 80,
      sales: 2900,
      myEarnings: 580,
      teamMembers: 3,
      supporters: 30,
      startDate: "2024-08-07",
      endDate: "2024-08-11",
      payout: "2024-08-22",
    },
    {
      key: "8",
      eventName: "Event 8",
      status: "Running",
      orders: 140,
      sales: 4900,
      myEarnings: 980,
      teamMembers: 5,
      supporters: 70,
      startDate: "2024-08-08",
      endDate: "2024-08-12",
      payout: "2024-08-24",
    },
    {
      key: "9",
      eventName: "Event 9",
      status: "Completed",
      orders: 180,
      sales: 6200,
      myEarnings: 1240,
      teamMembers: 7,
      supporters: 90,
      startDate: "2024-08-09",
      endDate: "2024-08-13",
      payout: "2024-08-28",
    },
    {
      key: "10",
      eventName: "Event 10",
      status: "Upcoming",
      orders: 110,
      sales: 4100,
      myEarnings: 820,
      teamMembers: 6,
      supporters: 60,
      startDate: "2024-08-10",
      endDate: "2024-08-14",
      payout: "2024-08-30",
    },
    {
      key: "11",
      eventName: "Event 11",
      status: "Running",
      orders: 160,
      sales: 5600,
      myEarnings: 1120,
      teamMembers: 8,
      supporters: 85,
      startDate: "2024-08-11",
      endDate: "2024-08-15",
      payout: "2024-08-27",
    },
    {
      key: "12",
      eventName: "Event 12",
      status: "Completed",
      orders: 190,
      sales: 6400,
      myEarnings: 1280,
      teamMembers: 9,
      supporters: 95,
      startDate: "2024-08-12",
      endDate: "2024-08-16",
      payout: "2024-09-01",
    },
    {
      key: "13",
      eventName: "Event 13",
      status: "Upcoming",
      orders: 105,
      sales: 4000,
      myEarnings: 800,
      teamMembers: 4,
      supporters: 55,
      startDate: "2024-08-13",
      endDate: "2024-08-17",
      payout: "2024-08-29",
    },
    {
      key: "14",
      eventName: "Event 14",
      status: "Running",
      orders: 130,
      sales: 4700,
      myEarnings: 940,
      teamMembers: 6,
      supporters: 65,
      startDate: "2024-08-14",
      endDate: "2024-08-18",
      payout: "2024-09-02",
    },
    {
      key: "15",
      eventName: "Event 15",
      status: "Completed",
      orders: 220,
      sales: 7100,
      myEarnings: 1420,
      teamMembers: 10,
      supporters: 110,
      startDate: "2024-08-15",
      endDate: "2024-08-19",
      payout: "2024-09-05",
    },
  ];

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    setSearchedColumn("");
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSizeOptions: ["5", "10", "20", "50"],
        defaultPageSize: 10,
        showSizeChanger: true,
      }}
      className="mt-5"
    />
  );
};

export default AdminTable;
