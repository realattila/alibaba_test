/* eslint-disable  */
import { useTranslation } from "next-i18next";
import { DetailedHTMLProps, HTMLAttributes } from "react";

interface ErrorOnDataProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const ErrorOnData: React.FC<ErrorOnDataProps> = (props) => {
  const { t } = useTranslation("common");
  return (
    <div {...props}>
      <p className='tw-text-center dark:tw-text-white tw-text-neutral-900'>{t("errorOnData")}</p>
    </div>
  );
};
export default ErrorOnData;
