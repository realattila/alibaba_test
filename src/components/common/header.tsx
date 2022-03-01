/* eslint-disable  */
// MAIN
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// ICONS
import Icons from "src/icons";

// UTILITY
import { cookieKeys } from "src/utlity/keys";
import Link from "next/link";

interface HeaderProps {
  darkMode: string;
}
const Header: React.FC<HeaderProps> = ({ darkMode }) => {
  const { t } = useTranslation("common");

  const [isDark, setIsDark] = useState<boolean>(darkMode === "dark");

  useEffect(() => {
    const isDark =
      darkMode === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
    Cookies.set(cookieKeys.dark, isDark ? "dark" : "light");
    localStorage.theme = isDark ? "dark" : "light";
    isDark ? document.documentElement.classList.add("tw-dark") : document.documentElement.classList.remove("tw-dark");
    setIsDark(isDark);
  }, [darkMode]);

  const makeItDark = () => {
    localStorage.theme = "dark";
    Cookies.set(cookieKeys.dark, "dark");
    document.documentElement.classList.add("tw-dark");
    setIsDark(true);
  };

  const makeItLight = () => {
    localStorage.theme = "light";
    Cookies.set(cookieKeys.dark, "light");
    document.documentElement.classList.remove("tw-dark");
    setIsDark(false);
  };

  const handleClickBtn = () => (isDark ? makeItLight() : makeItDark());

  return (
    <div className='tw-relative tw-bg-white tw-shadow dark:tw-bg-slate-800'>
      <div className='my-container'>
        <div className='tw-flex tw-items-center tw-justify-between tw-w-full tw-h-16 tw-px-4 md:tw-px-0'>
          <Link href={{ pathname: "/" }}>
            <a>
              <h1 className='tw-text-lg tw-font-bold tw-text-neutral-900 dark:tw-text-white'>{t("header.title")}</h1>
            </a>
          </Link>
          <button
            onClick={handleClickBtn}
            className='tw-flex tw-items-center tw-justify-center tw-gap-2 tw-text-neutral-900 dark:tw-text-white'>
            {isDark ? (
              <Icons.Solid.Moon className='tw-w-4 tw-h-4 tw-fill-neutral-900 dark:tw-fill-white' />
            ) : (
              <Icons.Regular.Moon className='tw-w-4 tw-h-4 tw-fill-neutral-900 dark:tw-fill-white' />
            )}
            <span>{isDark ? t("header.darkMode.light") : t("header.darkMode.dark")}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
