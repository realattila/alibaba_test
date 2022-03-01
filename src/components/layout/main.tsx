/* eslint-disable  */
import Header from "src/components/common/header";

interface MainLayourProps {
  darkMode: string;
}
const MainLayout: React.FC<MainLayourProps> = ({ children, darkMode }) => {
  return (
    <div>
      <Header darkMode={darkMode} />
      <div className='tw-py-16 tw-bg-neutral-50 dark:tw-bg-slate-700' style={{ minHeight: "calc(100vh - 64px)" }}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
