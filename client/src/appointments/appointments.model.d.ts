export interface AppointmentCreationDTO {
  name: string;
  address: string;
  city: string;
  age: number;
  sex: "male" | "female";
  email: string;
  phone: string;
  date: any;
  requestDate: any;
  time: any;
  firstTime: boolean;
  status: "missed" | "rescheduled" | "passed" | "pending";
  noteBefore: string;
  noteAfter: string;
}

export interface AppointmentDTO {
  _id: string;
  position: string;
  code: string;
  name: string;
  address: string;
  city: string;
  age: number;
  sex: "male" | "female";
  email: string;
  phone: string;
  date: any;
  requestDate: any;
  time: any;
  firstTime: boolean;
  status: "missed" | "rescheduled" | "passed" | "pending";
  noteBefore: string;
  noteAfter: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentUpdateDTO extends AppointmentCreationDTO {
  code: string;
}
