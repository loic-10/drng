import { AppointmentCreationDTO } from "./appointments.model";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  TimePicker,
} from "antd";
import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TextArea from "antd/es/input/TextArea";

dayjs.extend(customParseFormat);

const { Option } = Select;

export default function AppointmentForm(props: AppointmentFormProps) {
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  const format = "HH:mm:ss";

  const { date, requestDate, time } = props.model;
  const model = { ...props.model };

  return (
    <Form
      form={form}
      layout="vertical"
      name="register"
      onFinish={props.onFinish}
      initialValues={{
        ...model,
        date: dayjs(date, dateFormat),
        requestDate: dayjs(requestDate, dateFormat),
        time: dayjs(time, format),
      }}
      scrollToFirstError
    >
      <Space direction="vertical" size={20}>
        <Space direction="vertical">
          <span className="fw-bolder pb-3">General Information</span>
          <Space direction="horizontal" size="small" wrap align="center">
            <Form.Item name="code" label="Unique Code">
              <Input readOnly />
            </Form.Item>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="sex"
              label="Sex"
              rules={[{ required: true, message: "Please select sex!" }]}
            >
              <Select placeholder="select your sex">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="age"
              label="Age"
              rules={[{ required: true, message: "Please input age!" }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                  message: "Please input correct phone number!",
                  pattern: /^[0-9]{8,12}$/,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Space>
          <Divider />
          <span className="fw-bolder pb-3">Appointment Information</span>
          <Space direction="horizontal" size="small" wrap align="center">
            <Form.Item
              name="date"
              label="Appointment date"
              rules={[
                {
                  required: true,
                  message: "Please input appointment date!",
                },
              ]}
            >
              <DatePicker
                format={dateFormat}
                // disabledDate={disabledDate}
              />
            </Form.Item>
            <Form.Item
              name="firstTime"
              label="First time"
              rules={[
                {
                  required: true,
                  message: "Please select if is a first Time!",
                },
              ]}
            >
              <Select placeholder="select if is a first time">
                <Option value={false}>No</Option>
                <Option value={true}>Yes</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="requestDate"
              label="Request date"
              rules={[
                {
                  required: true,
                  message: "Please input request date!",
                },
              ]}
            >
              <DatePicker inputReadOnly={true} format={dateFormat} />
            </Form.Item>
            <Form.Item
              name="status"
              label="Appointment Status"
              rules={[
                {
                  required: true,
                  message: "Please select appointment Status!",
                },
              ]}
            >
              <Select placeholder="select appointment Status">
                {["missed", "rescheduled", "passed", "pending"].map(
                  (status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
            <Form.Item
              name="time"
              label="Appointment Time"
              rules={[
                {
                  type: "object" as const,
                  required: true,
                  message: "Please select appointment Time!",
                },
              ]}
            >
              <TimePicker format={format} />
            </Form.Item>
          </Space>
          <Divider />
          <span className="fw-bolder pb-3">Address Information</span>
          <Space direction="horizontal" size="small" wrap align="center">
            <Form.Item name="address" label="Address 1">
              <Input />
            </Form.Item>
            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Space>
          <Divider />
          <span className="fw-bolder pb-3">Notes</span>
          <Space direction="horizontal" size="small" wrap align="center">
            <Form.Item name="noteBefore" label="Before appointment">
              <TextArea />
            </Form.Item>
            <Form.Item name="noteAfter" label="After appointment">
              <TextArea />
            </Form.Item>
          </Space>
          <Divider />
          <Space direction="vertical" align="end" className="w-100">
            <Button
              className="ms-auto text-white border-0 shadow-lg"
              htmlType="submit"
              loading={props.isSubmitted}
              style={{ background: "#bd636f" }}
            >
              Save
            </Button>
          </Space>
        </Space>
      </Space>
    </Form>
  );
}

interface AppointmentFormProps {
  model: AppointmentCreationDTO;
  isSubmitted: boolean;
  onFinish(values: AppointmentCreationDTO): void;
}
