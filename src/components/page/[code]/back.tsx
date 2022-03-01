/* eslint-disable  */
import { useTranslation } from "next-i18next";
import Link from "next/link";
import Icons from "src/icons";

const Back: React.FC = () => {
  const { t } = useTranslation("pages_[id]");
  return (
    <div className='tw-px-4 md:tw-px-0'>
      <Link href={{ pathname: "/" }}>
        <a className='tw-flex tw-items-center tw-justify-between tw-h-8 tw-px-4 tw-bg-white tw-rounded-md tw-shadow dark:tw-bg-slate-800 tw-text-neutral-900 dark:tw-text-white tw-w-28'>
          <Icons.Regular.ArrowLeftLong className='tw-w-4 tw-h-4 tw-fill-neutral-900 dark:tw-fill-white' />
          <span>{t("back")}</span>
        </a>
      </Link>
    </div>
  );
};

export default Back;
