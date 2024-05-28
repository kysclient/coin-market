import { CoinData } from "../types/coin";

export function capitalizeFirstLetter(str: string): string {
  if (!str) return str; 

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatBitcoinPrice(price: number, currency: string): string {
  if (!price) {
    return "0";
  }
  const roundedPrice = price.toFixed(2);

  const formattedPrice = parseFloat(roundedPrice).toLocaleString();

  if (currency === "krw") {
    return `₩${formattedPrice}`;
  } else if (currency === "usd") {
    return `$${formattedPrice}`;
  } else {
    return formattedPrice;
  }
}

export function calculatePriceChange(percentage: number): {
  flag: boolean;
  value: string;
} {
  const flag = percentage >= 0 ? true : false;

  const value = flag
    ? Math.abs(percentage).toFixed(2) + "%"
    : "-" + Math.abs(percentage).toFixed(2) + "%";

  return { flag, value };
}

const USD_TO_USD_RATE = 1300;

function krwToUsd(krw: number): string {
  const usd = krw / USD_TO_USD_RATE;
  const roundedUsd = Math.round(usd * 100) / 100;
  const formattedUsd = roundedUsd.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return "$" + formattedUsd;
}

export function getCoinPriceWithCurrency(
  usdPrice: number,
  coinAmount: number,
  desiredCurrency: string
): string | number {
  const totalUsdPrice = usdPrice * coinAmount;
  if (desiredCurrency === "krw") {
    return krwToUsd(totalUsdPrice);
  } else if (desiredCurrency === "usd") {
    return totalUsdPrice;
  } else {
    throw new Error("Unsupported currency");
  }
}

export function toggleBookmark(
  coinData: CoinData,
  bookmarks: CoinData[],
  setBookmarks: (value: React.SetStateAction<CoinData[]>) => void,
  showMessage: (message: string) => void,
  removeBookmark?: (coinData: CoinData) => void
): void {
  const findObject: Object | undefined = bookmarks.find(
    (bookmark) => bookmark.symbol === coinData.symbol
  );

  let updatedBookmarks: CoinData[];
  if (!findObject) {
    updatedBookmarks = [...bookmarks, coinData];
    showMessage("북마크에 추가되었습니다.");
  } else {
    updatedBookmarks = bookmarks.filter(
      (bookmark: CoinData) => bookmark.symbol !== coinData.symbol
    );
    removeBookmark && removeBookmark(coinData);

    showMessage("북마크가 헤제되었습니다.");
  }
  setBookmarks(updatedBookmarks);
  localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
}
