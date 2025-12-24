// ** Styles Inport
import styles from "./index.module.scss";

// ** Another Import
import { useState } from "react";
import { users } from "../../../../data/user";
import Table from "../../utils/components/table";
import { Column, User } from "../../utils/types/tableType";

function UserTable() {
  // ** State
  const [page, setPage] = useState<number>(1);

  const columns: Column<User>[] = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      sortable: true,
      // searchable: true
    },
    {
      key: "email",
      title: "Email",
      render: (_: any, record) => (
        <a href={`mailto:${record.email}`}>{record.email}</a>
      ),
      // searchable: true
    },
    {
      key: "phone",
      title: "Phone",
      dataIndex: "phone",
      // searchable: true
    },
    {
      key: "DOB",
      title: "Date of Birth",
      dataIndex: "dob",
      // searchable: true
    },
    {
      key: "age",
      title: "Age",
      dataIndex: "age",
      sortable: true,
      // searchable: true
    },
    {
      key: "actions",
      title: "Actions",
      align: "left",
      render: (_, record) => (
        <div className={styles.actions}>
          <button onClick={() => console.log("record edit", record)}>
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button onClick={() => console.log("record delete", record)}>
            <span className="material-symbols-outlined">add_box</span>
          </button>
          <button onClick={() => console.log("record delete", record)}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.wrapper}>
      <Table
        columns={columns}
        data={users}
        rowKey="id"
        pagination={{
          page,
          pageSize: 7,
          total: users.length,
          onChange: setPage,
        }}
      />
    </div>
  );
}

export default UserTable;
