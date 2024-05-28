import { useEffect, useState } from "react";
import { CoinData } from "../../types/coin";
import MarketTable from "../components/market-table";

const BookmarkPage: React.FC = () => {
  const [bookmarks, setBookmarks] = useState<CoinData[]>([]);
  const removeBookmark = (coinData: CoinData) => {
    setBookmarks(
      bookmarks.filter((bookmark) => bookmark.symbol !== coinData.symbol)
    );
  };

  useEffect(() => {
    const bookmarksData: string | null = localStorage.getItem("bookmarks");
    if (bookmarksData) {
      const parsedBookmarks: CoinData[] = JSON.parse(bookmarksData);
      setBookmarks(parsedBookmarks.sort((a, b) => b.market_cap - a.market_cap));
    }
  }, []);

  return (
    <section>
      <MarketTable data={bookmarks} currency="krw" isShowMoreLoading={false} removeBookmark={removeBookmark} />
    </section>
  );
};

export default BookmarkPage;
