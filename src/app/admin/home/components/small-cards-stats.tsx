import { theme as antdTheme } from "antd";

export default function SmallCardsStats() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();
  
  return (
    <div className="w-full flex items-start justify-between gap-2">
      <div
        style={{
          background: theme.colorBgContainer,
          borderRadius: theme.borderRadius,
        }}
        className="w-full p-4"
      >
        <h1 className="text-xl font-bold">50%</h1>
        <p>Percentage of success</p>
      </div>
      <div
        style={{
          background: theme.colorBgContainer,
          borderRadius: theme.borderRadius,
        }}
        className="w-full p-4"
      >
        <h1 className="text-xl font-bold">50%</h1>
        <p>Percentage of success</p>
      </div>
      <div
        style={{
          background: theme.colorBgContainer,
          borderRadius: theme.borderRadius,
        }}
        className="w-full p-4"
      >
        <h1 className="text-xl font-bold">50%</h1>
        <p>Percentage of success</p>
      </div>
      <div
        style={{
          background: theme.colorBgContainer,
          borderRadius: theme.borderRadius,
        }}
        className="w-full p-4"
      >
        <h1 className="text-xl font-bold">50%</h1>
        <p>Percentage of success</p>
      </div>
      <div
        style={{
          background: theme.colorBgContainer,
          borderRadius: theme.borderRadius,
        }}
        className="w-full p-4"
      >
        <h1 className="text-xl font-bold">50%</h1>
        <p>Percentage of success</p>
      </div>
    </div>
  );
}
