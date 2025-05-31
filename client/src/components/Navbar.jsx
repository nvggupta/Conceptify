import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center px-6 h-full">
        <div className="flex items-center gap-3">
          <School size={30} className="text-blue-600" />
          <Link to="/">
            <h1 className="text-2xl font-extrabold text-blue-700">
              Conceptify
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer rounded-full border p-1 hover:shadow-md transition">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={user?.photoUrl}
                      alt="User"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="text-base font-semibold">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                 {user.role === 'student' && <DropdownMenuItem>
                    <Link to="/my-learning">📘 My Learning</Link>
                  </DropdownMenuItem> }
                  <DropdownMenuItem>
                    <Link to="/profile">✏️ Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    🔓 Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">🧭 Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="rounded-md px-4 py-1 text-sm"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-1 text-sm"
                onClick={() => navigate("/login")}
              >
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="text-xl font-extrabold text-blue-700">Conceptify</h1>
        <MobileNavbar user={user} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
   console.log(user);
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6 flex flex-col gap-4">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle className="text-lg font-bold">
            <Link to="/">Conceptify</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mt-2" />

        {user ? (
          <nav className="flex flex-col gap-3 mt-4 text-base">
            {user.role === 'student' &&<Link to="/my-learning" className="hover:text-blue-600 transition">
              📘 My Learning
            </Link>}
            <Link to="/profile" className="hover:text-blue-600 transition">
              ✏️ Edit Profile
            </Link> 
            <button
              onClick={logoutHandler}
              className="text-left text-red-500 hover:underline"
            >
              🔓 Log out
            </button>
            {user?.role === "instructor" && (
              <SheetFooter className="mt-4">
                <SheetClose asChild>
                  <Button
                    onClick={() => navigate("/admin/dashboard")}
                    className="bg-blue-600 text-white w-full"
                  >
                    🧭 Dashboard
                  </Button>
                </SheetClose>
              </SheetFooter>
            )}
          </nav>
        ) : (
          <div className="flex flex-col gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="w-full rounded-md"
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/login")}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md"
            >
              Signup
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
