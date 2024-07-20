import CreateLink from "@/components/create-link";
import Error from "@/components/error";
import LinkCard from "@/components/link-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/use-fetch";
import { getAllClicksForUrls } from "@/utiliti/clickFetch";
import { getAllUrls } from "@/utiliti/urlFetch";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getAllUrls);

  useEffect(() => {
    fnUrls();
  }, []);

  const {
    loading: loadingClicks,
    data: clicks,
    // eslint-disable-next-line no-unused-vars
    fn: fnClicks,
  } = useFetch(getAllClicksForUrls);

  let filteredUrls;
  if (urls && urls.length > 0) {
    filteredUrls = urls?.filter((url) =>
      url.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length || 0}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}
      {(filteredUrls || []).map((url, i) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))}
    </div>
  );
};

export default Dashboard;
