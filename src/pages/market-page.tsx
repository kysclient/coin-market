import { useCallback, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../services/apis";
import { CoinData } from "../../types/coin";
import { Select, Spinner } from "@geist-ui/core";
import MarketTable from "../components/market-table";

const MarketPage: React.FC = () => {
  const [marketList, setMarketList] = useState<CoinData[]>([]);
  const [vsCurrency, setVsCurrency] = useState<string>("krw");
  const [perPage, setPerPage] = useState<string>("50");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isShowMoreLoading, setIsShowMoreLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (isFetchMore?: boolean) => {
      setIsError(false);
      if (!isFetchMore) {
        setIsLoading(true);
      } else {
        setIsShowMoreLoading(true);
      }
      const response = await apiRequest.coins.getMarkets(vsCurrency, {
        order: "market_cap_desc",
        price_change_percentage: "1h,24h,7d",
        per_page: perPage,
        page: isFetchMore ? page + 1 : 1,
      });

      if (response.success) {
        setPage((prev) => prev + 1);
        const newMarketData: any = response.result;
        if (!isFetchMore) {
          setMarketList(newMarketData);
        } else {
          setMarketList((prevMarketData) => [
            ...prevMarketData,
            ...newMarketData,
          ]);
        }
      } else {
        setIsError(true);
      }
      setIsShowMoreLoading(false);
      setIsLoading(false);
    },
    [vsCurrency, perPage, page]
  );

  useEffect(() => {
    setPage(1);
    setMarketList([]);
  }, [perPage, vsCurrency]);

  const fetchMore = () => {
    fetchData(true);
  };

  const selectDataHandler = (
    field: "vsCurrency" | "perPage",
    value: string | string[]
  ) => {
    if (field === "vsCurrency") {
      setVsCurrency(value.toString());
    } else if (field === "perPage") {
      setPerPage(value.toString());
    }
  };

  const selects = useMemo(
    () => [
      {
        value: vsCurrency,
        options: [
          { value: "krw", label: "KRW" },
          { value: "usd", label: "USD" },
        ],
        onChange: (value: string | string[]) =>
          selectDataHandler("vsCurrency", value),
      },
      {
        value: perPage,
        options: [
          { value: "10", label: "10개 보기" },
          { value: "30", label: "30개 보기" },
          { value: "50", label: "50개 보기" },
        ],
        onChange: (value: string | string[]) =>
          selectDataHandler("perPage", value),
      },
    ],
    [vsCurrency, perPage]
  );

  useEffect(() => {
    fetchData(false);
  }, [vsCurrency, perPage]);

  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 mb-4">
        {selects.map((select, index) => (
          <Select
            key={index}
            value={select.value}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            placeholder=""
            onChange={select.onChange}
          >
            {select.options.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        ))}
      </div>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-8">
          <Spinner scale={2} />
        </div>
      ) : (
        <>
          <MarketTable
            isShowMoreLoading={isShowMoreLoading}
            fetchMore={fetchMore}
            currency={vsCurrency}
            data={marketList}
          />
        </>
      )}
      {isError && (
        <p className="text-red-400 text-center py-4">
          서버와의 통신이 실패하였습니다. 잠시 후 다시시도해주세요.
        </p>
      )}
    </section>
  );
};

export default MarketPage;
