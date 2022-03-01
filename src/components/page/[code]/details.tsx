/* eslint-disable  */
// MAIn
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useEffect, useState } from "react";

// Components
import ErrorOnData from "src/components/common/error_on_data";

// Hooks
import useFetch from "src/hooks/use_fetch";

interface DetailsProps {
  code: string;
}
const Details: React.FC<DetailsProps> = ({ code }) => {
  const fetch = useFetch<any>({ url: `/alpha/${code}` });

  const { t } = useTranslation("pages_[id]");

  const BorderdCountries = () => {
    if (!!fetch.data) {
      const borderListFetch = useFetch<any[]>({ url: "/all" });

      const [borderedList, setBorderedList] = useState<any[]>([]);

      useEffect(() => {
        if (!!borderListFetch.data) {
          let temp: any[] = [];
          borderListFetch.data.map((item) => {
            if ((fetch.data?.borders || []).includes(item.alpha3Code)) {
              temp.push(item);
            }
          });
          setBorderedList(temp);
        }
      }, [borderListFetch.data]);

      return (
        <div className='tw-flex tw-flex-wrap tw-gap-4'>
          <h4 className='tw-font-bold'>{t("details.borderCountries")}</h4>
          {borderListFetch.isLoading ? (
            <div className='tw-flex tw-flex-wrap tw-gap-4'>
              <div className='tw-w-24 tw-h-8 tw-rounded-md content-loading'></div>
              <div className='tw-w-24 tw-h-8 tw-rounded-md content-loading'></div>
              <div className='tw-w-24 tw-h-8 tw-rounded-md content-loading'></div>
            </div>
          ) : !!borderListFetch.error ? (
            <ErrorOnData className='tw-h-8 tw-w-44' />
          ) : (
            <div className='tw-flex tw-flex-wrap tw-gap-4'>
              {borderedList.map((item, index) => (
                <div
                  className='tw-px-4 tw-py-1 tw-bg-white tw-rounded tw-shadow dark:tw-bg-slate-800'
                  key={index * 21321}>
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    } else {
      return <></>;
    }
  };

  const RenderContent = () => {
    return !!fetch.data ? (
      <>
        <div className='tw-col-span-12 lg:tw-col-span-5 '>
          <div className='tw-flex tw-flex-col tw-justify-center tw-h-full'>
            <img className='tw-w-full' src={fetch.data?.flags?.png} />
          </div>
        </div>
        <div className='tw-col-span-12 lg:tw-col-span-7 tw-text-neutral-900 dark:tw-text-white'>
          <div className='tw-flex tw-flex-col tw-justify-center tw-h-full tw-gap-8'>
            <h1 className='tw-text-4xl tw-font-bold'>{fetch.data?.name}</h1>
            <div className='tw-grid tw-grid-cols-12 tw-gap-4 tw-text-sm lg:tw-gap-12'>
              <div className='tw-col-span-12 lg:tw-col-span-6'>
                <div className='tw-flex tw-flex-col tw-gap-2'>
                  <div>
                    <span className='tw-font-bold'>{t("details.nativeName")}</span>
                    <span>{fetch.data?.nativeName}</span>
                  </div>
                  <div>
                    <span className='tw-font-bold'>{t("details.population")}</span>
                    <span>{fetch.data?.population}</span>
                  </div>
                  <div>
                    <span className='tw-font-bold'>{t("details.region")}</span>
                    <span>{fetch.data?.region}</span>
                  </div>
                  <div>
                    <span className='tw-font-bold'>{t("details.subRegion")}</span>
                    <span>{fetch.data?.subregion}</span>
                  </div>
                  <div>
                    <span className='tw-font-bold'>{t("details.capital")}</span>
                    <span>{fetch.data?.capital}</span>
                  </div>
                </div>
              </div>
              <div className='tw-col-span-12 lg:tw-col-span-6'>
                <div className='tw-flex tw-flex-col tw-gap-2'>
                  <div>
                    <span className='tw-font-bold'>{t("details.topLevelDomain")}</span>
                    <span>
                      {fetch.data?.topLevelDomain.map(
                        (item: any, index: number) =>
                          `${item}${index + 1 != fetch.data?.topLevelDomain.length ? "," : ""} `
                      )}
                    </span>
                  </div>
                  <div>
                    <span className='tw-font-bold'>{t("details.currencies")}</span>
                    <span>
                      {fetch.data?.currencies.map(
                        (item: { code: any }, index: number) =>
                          `${item.code}${index + 1 != fetch.data?.currencies.length ? "," : ""} `
                      )}
                    </span>
                  </div>
                  <div>
                    <span className='tw-font-bold'>{t("details.languages")}</span>
                    <span>
                      {fetch.data?.languages.map(
                        (item: { name: any }, index: number) =>
                          `${item.name}${index + 1 != fetch.data?.languages.length ? "," : ""} `
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <BorderdCountries />
          </div>
        </div>
      </>
    ) : (
      <></>
    );
  };

  return (
    <>
      <Head>
        <title>{fetch.data?.name || ""}</title>
      </Head>
      <div className='tw-grid tw-grid-cols-12 tw-gap-8 tw-px-4 lg:tw-gap-20 md:tw-px-0'>
        {fetch.isLoading ? <PlaceHolder /> : !!fetch.error ? <ErrorOnData className='tw-h-96' /> : <RenderContent />}
      </div>
    </>
  );
};

const PlaceHolder = () => {
  return <div className='tw-col-span-12 tw-overflow-hidden tw-rounded-md tw-h-96 content-loading'></div>;
};
export default Details;
