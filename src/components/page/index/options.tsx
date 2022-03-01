/* eslint-disable  */
// MAIN
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import ErrorOnData from "src/components/common/error_on_data";

// Hooks
import { useFetchReturnType } from "src/hooks/use_fetch";

// ICONS
import Icons from "src/icons";
import PageIndexAtom, { regionsType } from "src/store/page_index";

interface OptionsProps {
  fetch: useFetchReturnType<any[]>;
}

const Options: React.FC<OptionsProps> = ({ fetch }) => {
  const regionsList: regionsType[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  const { t } = useTranslation("pages_index");
  const router = useRouter();

  const inputSearchRef = useRef(null);

  const [toggleShowList, setToggleShowList] = useState<boolean>(false);

  const [pageIndexState, setPageIndexState] = useRecoilState(PageIndexAtom);
  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    router.push(
      {
        query: {
          search: e.target.value.toLowerCase(),
        },
      },
      undefined,
      { shallow: true }
    );
    setPageIndexState((pre) => ({ ...pre, search: e.target.value.toLowerCase() }));
  };

  const handleCloseShowList = () => setToggleShowList(false);
  const toggleshowList = () => setToggleShowList((pre) => !pre);

  const changeFilter = (val: regionsType) => {
    router.push(
      {
        query: {
          region: val,
        },
      },
      undefined,
      { shallow: true }
    );
    setPageIndexState((pre) => ({ ...pre, filter: val }));
    handleCloseShowList();
  };

  useEffect(() => {
    const listenToClick = window.addEventListener("click", (e) => {
      if (!document.getElementById("filter_list_by_region_container")?.contains(e.target as Node)) {
        handleCloseShowList();
      }
      return e;
    });
    setPageIndexState((pre) => ({
      ...pre,
      search: String(router.query?.search || ""),
      filter: regionsList.includes(router.query?.region as regionsType) ? (router.query?.region as regionsType) : null,
    }));
    return () => window.removeEventListener("click", listenToClick as any);
  }, []);

  useEffect(() => {
    if (!!inputSearchRef.current) {
      (inputSearchRef.current as any).focus();
    }
  }, [pageIndexState.filter]);

  return (
    <div className='tw-flex tw-flex-wrap tw-justify-between tw-gap-4 tw-px-4 md:tw-px-0'>
      {fetch.isLoading ? (
        <Placeholder />
      ) : !!fetch.error ? (
        <ErrorOnData className='tw-w-full tw-h-12' />
      ) : (
        <>
          <div className='tw-flex tw-items-center tw-w-full tw-max-w-md tw-gap-4 tw-px-6 tw-py-3 tw-overflow-hidden tw-bg-white tw-rounded-md tw-shadow dark:tw-bg-slate-800'>
            <Icons.Regular.MagnifyingGlass className='tw-w-4 tw-h-4 dark:tw-fill-white tw-fill-neutral-900' />
            <input
              ref={inputSearchRef}
              value={pageIndexState.search || ""}
              onChange={handleChangeInputValue}
              placeholder={t("search")}
              className='tw-w-full tw-bg-transparent focus:tw-outline-none focus-within:tw-outline-none tw-text-neutral-900 dark:tw-text-white'
            />
          </div>

          <div
            id='filter_list_by_region_container'
            className='tw-relative tw-w-60 tw-text-neutral-900 dark:tw-text-white'>
            <button
              onClick={() => toggleshowList()}
              className='tw-flex tw-items-center tw-justify-between tw-w-full tw-h-12 tw-px-4 tw-bg-white tw-rounded-md tw-shadow-sm dark:tw-bg-slate-800'>
              <span>{!!pageIndexState.filter ? pageIndexState.filter : t("filter.title")}</span>
              <Icons.Regular.AngleDown className='tw-w-4 tw-h-4 tw-fill-neutral-900 dark:tw-fill-white' />
            </button>
            {toggleShowList && (
              <div className='tw-absolute tw-flex tw-flex-col tw-w-full tw-mt-1 tw-overflow-hidden tw-bg-white tw-rounded-md tw-shadow tw-top-12 dark:tw-bg-slate-800'>
                <button
                  onClick={() => changeFilter("Africa")}
                  className='tw-w-full tw-px-4 tw-py-1 tw-my-1 tw-text-left'>
                  {t("filter.africa")}
                </button>
                <button
                  onClick={() => changeFilter("Americas")}
                  className='tw-w-full tw-px-4 tw-py-1 tw-my-1 tw-text-left'>
                  {t("filter.america")}
                </button>
                <button onClick={() => changeFilter("Asia")} className='tw-w-full tw-px-4 tw-py-1 tw-my-1 tw-text-left'>
                  {t("filter.asia")}
                </button>
                <button
                  onClick={() => changeFilter("Europe")}
                  className='tw-w-full tw-px-4 tw-py-1 tw-my-1 tw-text-left'>
                  {t("filter.europe")}
                </button>
                <button
                  onClick={() => changeFilter("Oceania")}
                  className='tw-w-full tw-px-4 tw-py-1 tw-my-1 tw-text-left'>
                  {t("filter.oceania")}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Placeholder = () => {
  return (
    <>
      <div className='tw-w-full tw-h-12 tw-max-w-md tw-overflow-hidden tw-rounded-md content-loading'></div>
      <div className='tw-h-12 tw-overflow-hidden tw-rounded-md tw-w-60 content-loading'></div>
    </>
  );
};

export default Options;
