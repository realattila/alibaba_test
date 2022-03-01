/* eslint-disable  */
//TYPES
import type { GetServerSideProps } from "next";
import { MyPageComponent } from "../src/types/generic";

// MAIN
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "next-i18next";

// Components
import MainLayout from "src/components/layout/main";
import CountryList from "src/components/page/index/country_list";
import Options from "src/components/page/index/options";

// HOOKS
import useFetch from "src/hooks/use_fetch";

const Home: MyPageComponent = () => {
  const fetch = useFetch<any[]>({ url: "/all" });

  const { t } = useTranslation("pages_index");

  return (
    <>
      <Head>
        <title>{t("title")}</title>
      </Head>

      <div className=''>
        <div className='my-container'>
          <div className='tw-flex tw-flex-col tw-gap-8'>
            <Options fetch={fetch} />
            <CountryList fetch={fetch} />
          </div>
        </div>
      </div>
    </>
  );
};

Home.getLayout = (page) => {
  return <MainLayout darkMode={page.props?.darkMode || ""}>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.locale) {
    throw Error("locale not found");
  }

  return {
    props: {
      ...(await serverSideTranslations(String(context.locale))),
      darkMode: context.req.cookies?.darkmode || "",
    },
  };
};

export default Home;
