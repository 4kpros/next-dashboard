import {
  ClearOutlined,
  DeleteOutlined,
  PlusOutlined,
  PrinterOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";

const { Search } = Input;

export default function DefaultTableHeader(props: {
  searchKeyword?: string | null;
  onAdd?: () => void;
  onSearch?: () => void;
  onRefresh?: () => void;
  onDelete?: () => void;
  onPrint?: () => void;
  onClearSearch?: () => void;
}) {
  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={props.onAdd}
        >
          Add
        </Button>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          className="max-w-[500px] flex-1"
          onSubmit={props.onSearch}
        />
        {props.searchKeyword != undefined && props.searchKeyword != null ? (
          <div className="flex flex-wrap items-center gap-2">
            <p className="line-clamp-1">
              Results for{" "}
              <b className="font-extrabold">{props.searchKeyword ?? ""}</b>
            </p>
            <Button
              icon={<ClearOutlined width={18} height={18} />}
              onClick={props.onClearSearch}
            >
              Clear
            </Button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button icon={<SyncOutlined />} onClick={props.onRefresh}>
          Refresh
        </Button>
        <Button icon={<DeleteOutlined />} onClick={props.onDelete}>
          Delete
        </Button>
        <Button icon={<PrinterOutlined />} onClick={props.onPrint}>
          Print
        </Button>
      </div>
    </div>
  );
}
