/* eslint-disable  */
import API from "src/services/api";
import useSWR, { KeyedMutator } from "swr";

interface useFetchProps {
  url: string;
  params?: any;
}

export type useFetchReturnType<T> = {
  data: T;
  isLoading: boolean;
  error: any;
  mutate: KeyedMutator<any>;
};

type useFetchType = <T>(arg: useFetchProps) => useFetchReturnType<T>;

const fetcher = ({ url, params }: useFetchProps) => {
  return API({ method: "get", url, params }).then((res) => res.data);
};

const useFetch: useFetchType = ({ url, params = "" }) => {
  const { data, error, mutate } = useSWR(url, (r) => fetcher({ url: r, params }), {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      // Never retry on 404.
      if (error.status === 404) return;
      // Only retry up to 10 times.
      if (retryCount >= 2) return;
      // Retry after 5 seconds.
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  return {
    data: data,
    isLoading: !error && !data,
    error: error,
    mutate,
  };
};

export default useFetch;
