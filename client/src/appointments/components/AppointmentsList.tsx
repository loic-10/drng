import { AppointmentDTO } from "../appointments.model";
import {
  Button,
  Col,
  Input,
  InputNumber,
  Pagination,
  Row,
  Slider,
  Space,
  Table,
} from "antd";
import "antd/dist/reset.css";
import { connect, useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { IonIcon } from "@ionic/react";
import { createOutline, filter, search, trash } from "ionicons/icons";
import Highlighter from "react-highlight-words";
import moment from "moment-timezone";
import { Link } from "react-router-dom";
import { AppointmentState, deleteAppointment } from "../../redux";
import CustomConfirm from "../../utils/CustomConfirm";
import { ColumnsType, ColumnType } from "antd/es/table";
import { FilterConfirmProps, SortOrder } from "antd/es/table/interface";
import { searchAppointments } from "../helpers";

function AppointmentsList() {
  const pageSize = 8;

  const [state, setState] = useState<{
    orderDirection: { [name: string]: SortOrder };
    searchText: string;
    left: number;
    right: number;
    totalPage: number;
    current: number;
    minIndex: number;
    maxIndex: number;
  }>({
    orderDirection: {},
    searchText: "",
    left: 33,
    right: 50,
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  });

  const { appointments: _appointments, _search } = useSelector(
    (state: { appointment: AppointmentState }) => state.appointment
  );

  const [appointments, setAppointments] = useState([..._appointments]);

  useEffect(() => {
    setAppointments(searchAppointments(_appointments, _search));
  }, [_search]);

  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch<any>();

  function getData(data: AppointmentDTO[], current: number, pageSize: number) {
    return data
      ?.map((data: any) => ({ ...data, key: data.code }))
      .slice((current - 1) * pageSize, current * pageSize);
  }

  const handleSearchAge = (
    selectedKeys: React.Key[],
    confirm: {
      (param?: FilterConfirmProps | undefined): void;
      (param?: FilterConfirmProps | undefined): void;
      (): void;
    }
  ) => {
    confirm();
  };

  const handleSearch = (selectedKeys: any[], confirm: () => void) => {
    confirm();
    setState({ ...state, searchText: selectedKeys[0] });
  };

  const handleReset = (
    selectedKeys: string | any[],
    confirm: () => void,
    clearFilters: () => void
  ) => {
    setSearchInput("");
    clearFilters();
    confirm();
    setState({ ...state, searchText: selectedKeys[0] });
  };

  const getColumnFiltersProps: ColumnType<AppointmentDTO> = {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div style={{ padding: 8 }}>
        <Row
          itemType="flex"
          gutter={10}
          style={{ marginBottom: 8, alignItems: "center" }}
        >
          <Col>Range:</Col>
          <Col>
            <InputNumber
              value={state.left}
              onChange={(e: any) => {
                console.log(e);
                setState({ ...state, left: e });
                setSelectedKeys(
                  (_search ? appointments : _appointments)
                    .filter((d) => e <= d.age)
                    .map((d) => d.code)
                );
              }}
            />
          </Col>
          <Col>
            <InputNumber
              value={state.right}
              onChange={(e: any) => {
                setState({ ...state, right: e });
                setSelectedKeys(
                  (_search ? appointments : _appointments)
                    .filter((d) => d.age <= e)
                    .map((d) => d.code)
                );
              }}
            />
          </Col>
        </Row>
        <Row
          onClick={() => {
            handleSearchAge(selectedKeys, confirm);
            setSelectedKeys(
              (_search ? appointments : _appointments)
                .filter((d) => state.left <= d.age && d.age <= state.right)
                .map((d) => d.code)
            );
          }}
        >
          <Button
            type="primary"
            className="btn btn-primary"
            block
            size="small"
            onClick={() => {
              handleSearchAge(selectedKeys, confirm);
              setSelectedKeys(
                (_search ? appointments : _appointments)
                  .filter((d) => state.left <= d.age && d.age <= state.right)
                  .map((d) => d.code)
              );
            }}
          >
            Confirm
          </Button>
        </Row>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <IonIcon
        className="text-black h-5 w-5"
        style={{ color: filtered ? "#1890ff" : undefined }}
        icon={filter}
      />
    ),
    onFilter: (value: any, record: any) =>
      state.left <= record.age && record.age <= state.right,
    render: (text: string) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  };

  const getColumnSearchProps: any = (dataIndex: string | number) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div className="custom-filter-dropdown">
        <Input
          ref={(node: any) => {
            if (node?.input?.value) setSearchInput(node?.input?.value);
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          className="btn btn-primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset("", confirm, clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: any) => (
      <IonIcon
        className="text-black h-4 w-4"
        style={{ color: filtered ? "#1890ff" : undefined }}
        icon={search}
      />
    ),
    onFilter: (value: string, record: any) =>
      record[dataIndex]
        ?.toString()
        ?.toLowerCase()
        .includes(value.toLowerCase()),
    render: (text: { toString: () => any }) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });
  const changeOrder = (name: string, direction: SortOrder) => () => {
    setState({
      ...state,
      orderDirection: { ...state.orderDirection, [name]: direction },
    });
    console.log({ name, direction, state });
  };
  const handleChange = (page: number) => {
    setState({
      ...state,
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };

  moment.tz.setDefault("Afrca/Douala");

  const columns: ColumnsType<AppointmentDTO> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      sorter: (a, b) => a.code.length - b.code.length,
      ...getColumnSearchProps("code"),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      ...getColumnSearchProps("age"),
      ...getColumnFiltersProps,
    },
    {
      title: (
        <div className="flex justify-between font-bold text-sm text-black p-0">
          Gender{" "}
          <div>
            <svg
              onClick={changeOrder("sex", "ascend")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>

            <svg
              onClick={changeOrder("sex", "descend")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-3 h-3 font-bold text-black"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      ),
      dataIndex: "sex",
      key: "sex",
      filters: [
        {
          text: "male",
          value: "male",
        },
        {
          text: "female",
          value: "female",
        },
      ],
      sortOrder: state.orderDirection["sex"] || null,
      ...getColumnSearchProps("sex"),
      filterIcon: (filtered: any) => (
        <IonIcon className="text-black h-5 w-5" icon={filter} />
      ),
      onFilter: (value: any, record: { sex: string | any[] }) =>
        record.sex.indexOf(value) === 0,
    },
    {
      title: (
        <div className="flex justify-between font-bold text-sm text-black p-0">
          Phone
        </div>
      ),
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: (
        <div className="flex justify-between font-bold text-sm text-black p-0">
          Address
        </div>
      ),
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      // filterIcon: filtered=><IonIcon className="text-black h-4 w-4" icon={search}/> ,
      //  onFilter: (value, record) => record.address.indexOf(value) === 0
    },
    {
      title: (
        <div className="flex justify-between font-bold text-sm text-black p-0">
          AppointmentDate{" "}
          <div>
            <svg
              onClick={changeOrder("date", "ascend")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>

            <svg
              onClick={changeOrder("date", "descend")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-3 h-3 font-bold text-black"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      ),
      dataIndex: "date",
      key: "date",
      sortOrder: state.orderDirection["date"] || null,
      ...getColumnSearchProps("date"),
    },
    {
      title: (
        <div className="flex justify-between font-bold text-sm text-black p-0">
          DateOfRecordEntry{" "}
          <div>
            <svg
              onClick={changeOrder("requestDate", "ascend")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>

            <svg
              onClick={changeOrder("requestDate", "descend")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-3 h-3 font-bold text-black"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      ),
      dataIndex: "requestDate",
      key: "requestDate",
      compare: (a: { requestDate: string }, b: { requestDate: any }) => {
        return a.requestDate.localeCompare(b.requestDate);
      },
      sortOrder: state.orderDirection["requestDate"] || null,
      ...getColumnSearchProps("requestDate"),
    },
    {
      dataIndex: "status",
      title: (
        <div className="flex justify-between font-bold text-sm text-black p-0">
          Status{" "}
          <div>
            <svg
              onClick={changeOrder("status", "ascend")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-3 h-3"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>

            <svg
              onClick={changeOrder("status", "descend")}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-3 h-3 font-bold text-black"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      ),
      key: "status",
      render: (status: any) => {
        let appearance = "";
        switch (status) {
          case "passed":
            appearance = " bg-success bg-opacity-25 text-success";
            break;
          case "missed":
            appearance = " bg-danger bg-opacity-25 text-danger";
            break;
          case "rescheduled":
            appearance = " bg-warning bg-opacity-25 text-warning";
            break;
          case "pending":
            appearance = " bg-info bg-opacity-25 text-info";
            break;
        }
        return (
          <span
            className={`${appearance} p-2 fw-bold rounded text-capitalize shadow-sm`}
          >
            {status}
          </span>
        );
      },
      filters: [
        {
          text: "passed",
          value: "passed",
        },
        {
          text: "missed",
          value: "missed",
        },
        {
          text: "rescheduled",
          value: "rescheduled",
        },
        {
          text: "pending",
          value: "pending",
        },
      ],

      filterIcon: () => (
        <IonIcon className="text-black h-5 w-5" icon={filter} />
      ),
      onFilter: (value: any, record: { status: string | any[] }) =>
        record.status.indexOf(value) === 0,
      sortOrder: state.orderDirection["status"] || null,
      ...getColumnSearchProps("status"),
    },
    {
      title: (
        <div className="flex justify-between font-bold text-sm text-black p-0">
          Action
        </div>
      ),
      key: "action",
      render: (_: any, record: { code: any }) => (
        <Space size="middle">
          <IonIcon
            onClick={(e) =>
              CustomConfirm(() =>
                dispatch(deleteAppointment({ code: record.code }))
              )
            }
            defaultValue={record.code}
            className=" h-5 w-5 cursor-pointer text-[#d4383e]"
            icon={trash}
          />

          {/* // </button>  href={`./registration/${record.code}`} */}
          <Link to={`/appointments/edit/${record.code}`}>
            <div>
              <IonIcon
                className=" h-5 w-5 cursor-pointer text-[#708f7f]"
                icon={createOutline}
              />
            </div>
          </Link>
        </Space>
      ),
    },
  ];
  return (
    <div className="">
      <Table
        className="overflow-hidden max-[1400px]:overflow-scroll  "
        rowClassName={() => "rowClassName1"}
        pagination={false}
        columns={columns}
        dataSource={getData(
          _search ? appointments : _appointments,
          state.current,
          pageSize
        )}
      />
      <div className="flex  w-auto  justify-center items-center h-auto mt-8">
        <Pagination
          pageSize={pageSize}
          current={state.current}
          total={(_search ? appointments : _appointments).length}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default connect()(AppointmentsList);
