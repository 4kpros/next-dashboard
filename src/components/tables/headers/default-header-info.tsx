import { Typography } from "antd";

const { Text } = Typography;

export default function DefaultTableHeaderInfo(props: {
  showSelection?: boolean;
  selectedItemsCount?: number;
  currentPage?: number;
  totalPages?: number;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
      {props.showSelection === true ? (
        <Text code className="line-clamp-1">
          {props.selectedItemsCount ?? 0} selected items
        </Text>
      ) : (
        <div></div>
      )}
      <Text code className="line-clamp-1">
        Page {props.currentPage ?? 1}/{props.totalPages ?? 1}
      </Text>
    </div>
  );
}
