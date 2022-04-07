/* eslint-disable import/no-anonymous-default-export */
import { useRouter } from "next/router";
import React from "react";
/**
 *  @returns { ...init }
 */
export default (fetcher, data, options = {}, isServerErrorWorking) => (init = {}) => {
  const [result, setResult] = React.useState(init);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState({});

  const router = useRouter();

  const reload = React.useCallback(
    async (signal) => {
      try {
        setLoading(true);
        let res = await fetcher(data, { ...options, signal });
        setResult(res);
        setLoading(false);
      } catch (err) {


        setResult(init);
        setLoading(false);
        setError(err);

        if (err.status === 401) {
          router.replace("/auth/login");
          return;
        }

        if (isServerErrorWorking) {
          if (err.status === "404") {
            router.replace("/404");
          } else {
            router.replace("/500")
          }
        }

      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fetcher, options]
  );

  React.useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    reload(signal);

    return () => abortController.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return {
    result,
    error,
    loading,
    setResult: (value) => {
      setResult(value);
    },
    reload: () => {
      const abortController = new AbortController();
      const signal = abortController.signal;

      reload(signal);

      return () => abortController.abort();
    }
  };
};
