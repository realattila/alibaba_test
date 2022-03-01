/* eslint-disable  */
import { NextPage } from "next";
type component = React.ReactNode | JSX.Element;

export type MyPageComponent<p = {}> = NextPage<p & { darkMode?: string }> & {
  getLayout?: (page: NextPage<p & { darkMode?: string }> & { props?: p & { darkMode?: string } }) => component;
};
