/* eslint-disable  */
// MAIN
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

// Components
import ErrorOnData from "src/components/common/error_on_data";

// STATe
import PageIndexAtom from "src/store/page_index";

// HOOKS
import useFetch, { useFetchReturnType } from "src/hooks/use_fetch";

interface CountryListProps {
  fetch: useFetchReturnType<any[]>;
}

const CountryList: React.FC<CountryListProps> = ({ fetch }) => {
  const PageIndexStateValue = useRecoilValue(PageIndexAtom);
  const [filterdData, setFilterdData] = useState<any[]>();
  const { t } = useTranslation("pages_index");

  useEffect(() => {
    if (!!PageIndexStateValue.search.length || PageIndexStateValue.filter) {
      if (!!fetch.data?.length) {
        setFilterdData(() => {
          const filter = fetch.data.filter((item) => {
            if (!!PageIndexStateValue.filter) {
              if (!!PageIndexStateValue.search) {
                return (
                  PageIndexStateValue.filter === item.region &&
                  (item.name as string).toLowerCase().includes(PageIndexStateValue.search)
                );
              } else {
                return PageIndexStateValue.filter === item.region;
              }
            } else {
              if (!!PageIndexStateValue.search) {
                return (item.name as string).toLowerCase().includes(PageIndexStateValue.search);
              }
              // No Filter
              else {
                return true;
              }
            }
          });

          return filter;
        });
      }
    } else {
      setFilterdData([]);
    }
  }, [PageIndexStateValue.search, PageIndexStateValue.filter]);

  const RenderItems = () => {
    return (
      (!!String(PageIndexStateValue.search || "") || !!PageIndexStateValue.filter ? filterdData : fetch.data) || []
    ).map((item, index) => {
      return (
        <div key={index * 100} className='tw-col-span-12 lg:tw-col-span-4 md:tw-col-span-6 xl:tw-col-span-3'>
          <Link href={{ pathname: item.alpha3Code }}>
            <a className='tw-flex tw-flex-col tw-overflow-hidden tw-bg-white tw-rounded-md tw-shadow dark:tw-bg-slate-800'>
              <img src={item.flags.png} className='tw-object-cover tw-w-full tw-h-52 ' />
              <div className='tw-p-4 dark:tw-text-slate-100 tw-text-neutral-900'>
                <h2 className='tw-w-full tw-mb-4 tw-text-lg tw-font-bold'>{item.name}</h2>
                <div className='tw-text-sm'>
                  <div>
                    <span className='tw-font-bold'>{t("countryList.card.population")}: </span>
                    <span>{item.population}</span>
                  </div>
                  <div>
                    <span className='tw-font-bold'>{t("countryList.card.region")}: </span>
                    <span>{item.region}</span>
                  </div>
                  <div>
                    <span className='tw-font-bold'>{t("countryList.card.capital")}: </span>
                    <span>{item.capital}</span>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>
      );
    });
  };

  return (
    <div className='tw-grid tw-grid-cols-12 tw-gap-8 tw-px-4 lg:tw-gap-20 md:tw-px-0 '>
      {fetch.isLoading ? (
        <Placeholder />
      ) : !!fetch.error ? (
        <div className='tw-col-span-12'>
          <ErrorOnData className='tw-h-96' />
        </div>
      ) : (
        RenderItems()
      )}
    </div>
  );
};

const Placeholder = () => {
  return (
    <>
      <div className='tw-col-span-12 lg:tw-col-span-4 md:tw-col-span-6 xl:tw-col-span-3'>
        <div className='tw-w-full tw-overflow-hidden tw-rounded-md content-loading tw-h-80'></div>
      </div>
      <div className='tw-col-span-12 lg:tw-col-span-4 md:tw-col-span-6 xl:tw-col-span-3'>
        <div className='tw-w-full tw-overflow-hidden tw-rounded-md content-loading tw-h-80'></div>
      </div>
      <div className='tw-col-span-12 lg:tw-col-span-4 md:tw-col-span-6 xl:tw-col-span-3'>
        <div className='tw-w-full tw-overflow-hidden tw-rounded-md content-loading tw-h-80'></div>
      </div>
      <div className='tw-col-span-12 lg:tw-col-span-4 md:tw-col-span-6 xl:tw-col-span-3'>
        <div className='tw-w-full tw-overflow-hidden tw-rounded-md content-loading tw-h-80'></div>
      </div>
      <div className='tw-col-span-12 lg:tw-col-span-4 md:tw-col-span-6 xl:tw-col-span-3'>
        <div className='tw-w-full tw-overflow-hidden tw-rounded-md content-loading tw-h-80'></div>
      </div>
      <div className='tw-col-span-12 lg:tw-col-span-4 md:tw-col-span-6 xl:tw-col-span-3'>
        <div className='tw-w-full tw-overflow-hidden tw-rounded-md content-loading tw-h-80'></div>
      </div>
      <div className='tw-col-span-12 lg:tw-col-span-4 md:tw-col-span-6 xl:tw-col-span-3'>
        <div className='tw-w-full tw-overflow-hidden tw-rounded-md content-loading tw-h-80'></div>
      </div>
      <div className='tw-col-span-12 lg:tw-col-span-4 md:tw-col-span-6 xl:tw-col-span-3'>
        <div className='tw-w-full tw-overflow-hidden tw-rounded-md content-loading tw-h-80'></div>
      </div>
      <div className='tw-col-span-12 lg:tw-col-span-4 md:tw-col-span-6 xl:tw-col-span-3'>
        <div className='tw-w-full tw-overflow-hidden tw-rounded-md content-loading tw-h-80'></div>
      </div>
      <div className='tw-col-span-12 lg:tw-col-span-4 md:tw-col-span-6 xl:tw-col-span-3'>
        <div className='tw-w-full tw-overflow-hidden tw-rounded-md content-loading tw-h-80'></div>
      </div>
    </>
  );
};

export default CountryList;
