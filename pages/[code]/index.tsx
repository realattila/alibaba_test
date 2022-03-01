/* eslint-disable  */
// Main
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// Components
import MainLayout from "src/components/layout/main";
import Back from "src/components/page/[code]/back";
import Details from "src/components/page/[code]/details";

// TYPES
import { MyPageComponent } from "src/types/generic";

interface DetailPageProps {
  code: string;
}
const DetailPage: MyPageComponent<DetailPageProps> = ({ code }) => {
  return (
    <div className='my-container'>
      <div className='tw-flex tw-flex-col tw-gap-8'>
        <Back />
        <Details code={code} />
      </div>
    </div>
  );
};

DetailPage.getLayout = (page) => {
  return <MainLayout darkMode={page.props?.darkMode || ""}>{page}</MainLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.locale) {
    throw Error("locale not found");
  }

  if (!context.query?.code) {
    return {
      redirect: "/",
      props: {},
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(String(context.locale))),
      darkMode: context.req.cookies?.darkmode || "",
      code: String(context.query?.code),
    },
  };
};

export default DetailPage;
