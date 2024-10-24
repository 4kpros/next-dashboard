import { Typography } from "antd";

const { Text } = Typography;

export default function DefaultTableHeaderInfo(props: {
  selectedItemsCount?: number | null;
  currentPage?: number | null;
  totalPages?: number | null;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
      <Text code className="line-clamp-1">
        {props.selectedItemsCount ?? 0} selected items
      </Text>
      <Text code className="line-clamp-1">
        Page {props.currentPage ?? 1}/{props.totalPages ?? 1}
      </Text>
    </div>
  );
}
