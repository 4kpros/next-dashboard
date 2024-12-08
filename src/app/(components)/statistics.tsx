import { CustomContainer } from "@/components/container/custom-container";
import { theme as antdTheme } from "antd";

export default function Statistics() {
  // Ant design theme
  const { useToken } = antdTheme;
  const { token: theme } = useToken();
  
  return (
    <section
      style={{
        backgroundColor: theme.colorPrimary,
        color: "#fff",
      }}
      className="w-full py-12"
    >
      <CustomContainer>
        <div className="w-full flex flex-wrap -m-4 text-center">
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="font-bold sm:text-4xl text-3xl">+10</h2>
            <p className="leading-relaxed font-bold text-2xl">Schools</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="font-bold sm:text-4xl text-3xl">+145</h2>
            <p className="leading-relaxed font-bold text-2xl">Teachers</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="font-bold sm:text-4xl text-3xl">+8k</h2>
            <p className="leading-relaxed font-bold text-2xl">Students</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="font-bold sm:text-4xl text-3xl">+200</h2>
            <p className="leading-relaxed font-bold text-2xl">Parents</p>
          </div>
        </div>
      </CustomContainer>
    </section>
  );
}
