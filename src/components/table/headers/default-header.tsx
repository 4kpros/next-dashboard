import {
  ClearOutlined,
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  SyncOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import { SearchProps } from "antd/es/input";

const { Search } = Input;

export default function DefaultTableHeader(props: {
  isLoading?: boolean;
  isFetching?: boolean;
  canAdd?: boolean;
  canDeleteMultiple?: boolean;
  canUpload?: boolean;
  canDownload?: boolean;
  isDeletingSelection?: boolean;
  selectedItemsCount?: number;
  searchKeyword?: string | null;
  onAdd?: () => void;
  onSearch?: SearchProps["onSearch"];
  onRefresh?: () => void;
  onDelete?: () => void;
  onUpload?: () => void;
  onDownload?: () => void;
  onClearSearch?: () => void;
}) {
  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        {props.canAdd === true ? (
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={props.onAdd}
          >
            Add
          </Button>
        ) : null}
        <Search
          allowClear
          placeholder="Input search text"
          enterButton="Search"
          size="large"
          className="max-w-[500px] flex-1"
          onSearch={props.onSearch}
        />
        {props.searchKeyword && props.searchKeyword?.length >= 1 ? (
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
        <Button
          loading={props.isFetching}
          icon={<SyncOutlined />}
          onClick={props.onRefresh}
        >
          Refresh
        </Button>
        {props.canDeleteMultiple === true ? (
          <Button
            loading={props.isDeletingSelection}
            disabled={
              (props.selectedItemsCount ?? 0) < 1 || props.isLoading == true
            }
            icon={<DeleteOutlined />}
            onClick={props.onDelete}
          >
            Delete
          </Button>
        ) : null}
        {props.canUpload === true ? (
          <Button
            disabled={props.isLoading}
            icon={<UploadOutlined />}
            onClick={props.onUpload}
          >
            Import
          </Button>
        ) : null}
        {props.canDownload === true ? (
          <Button
            disabled={props.isLoading}
            icon={<DownloadOutlined />}
            onClick={props.onDownload}
          >
            Export
          </Button>
        ) : null}
      </div>
    </div>
  );
}
