import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LinkIcon, LogOut } from "lucide-react";
import { BarLoader } from "react-spinners";
import { UrlState } from "@/contex";
import useFetch from "@/hooks/use-fetch";
import { logOut } from "@/utiliti/userFetch";

const Header = () => {
  const navigate = useNavigate();

  const { isAuthenticated, user, fetchUser } = UrlState();

  const { loading, fn: fnLogout } = useFetch(logOut);

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-16" alt="trimmer-logo" />
        </Link>
        <div>
          {!isAuthenticated ? (
            <Button onClick={() => navigate("/auth")}>LogIn </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={user?.data?.profile}
                    className="object-contain"
                  />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.data?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/dashboard" className="flex">
                    <LinkIcon className="mr-2 h-4 w-4" />
                    <span>My Links</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span
                    onClick={() => {
                      fnLogout();
                      fetchUser();
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
      {loading && <BarLoader className="mb-4" width="100%" color="#36d7b7" />}
    </>
  );
};

export default Header;
