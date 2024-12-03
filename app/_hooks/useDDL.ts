import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

const useDDL = <T>({
  queryFn,
  isSearchable = false,
  extraParams,
}: TUseDDLProps<T>) => {
  const [isLoading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState<string | undefined>("");
  const [DDL, setDDL] = useState<(TDDLOption & T)[]>();

  const handleSearchText = (st: string) => {
    setSearchText(st);
  };

  const callQueryFn = useCallback(async () => {
    if (isSearchable && !queryFn) return;
    setLoading(true);
    try {
      const { data } = await (queryFn?.(
        searchText?.trim(),
        ...(extraParams ?? [])
      ) ?? {});
      setDDL(data);
    } catch (err) {
      setDDL([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchText, extraParams, isSearchable, queryFn]);

  useEffect(() => {
    callQueryFn();
    // eslint-disable-next-line
  }, [searchText]);

  const reset = useCallback(() => {
    setLoading(false);
    setSearchText(undefined);
    setDDL([]);
  }, []);

  return { isLoading, DDL, handleSearchText, reset };
};

export default useDDL;

type TUseDDLProps<T> = {
  queryFn?: (
    searchText?: string,
    ...rest: any
  ) => Promise<AxiosResponse<(TDDLOption & T)[]>>;
  isSearchable?: boolean;
  extraParams?: any[];
};
