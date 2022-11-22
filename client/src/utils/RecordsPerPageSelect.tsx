export default function RecordsPerPageSelect(props: RecordsPerPageSelectProps) {
  return (
    <div className="mb-3" style={{ width: "150px" }}>
      <label>Records per page:</label>
      <select
        className="form-control"
        defaultValue={5}
        onChange={({ currentTarget: { value } }) => {
          props.onChange(parseInt(value, 10));
        }}
      >
        {[5, 10, 25, 50].map((value) => (
          <option value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
}

interface RecordsPerPageSelectProps {
  onChange(recordsPerPage: number): void;
}
