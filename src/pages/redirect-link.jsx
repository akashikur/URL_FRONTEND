import useFetch from "@/hooks/use-fetch";
import { storeClicks } from "@/utiliti/clickFetch";
import { getLongUrl } from "@/utiliti/urlFetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const { id } = useParams();
  const { loading, data, fn } = useFetch(getLongUrl);

  const { loading: loadingStats, fn: fnStats } = useFetch(storeClicks);

  useEffect(() => {
    fn(id);
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats({
        id: data?._id,
        originalUrl: data?.original_url,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLink;
