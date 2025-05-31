import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error.message || "Failed to update profile");
    }
  }, [error, updateUserData, isSuccess, isError]);

  if (isLoading) return <h1 className="text-center text-xl">Loading Profile...</h1>;

  const user = data?.user;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="font-bold text-3xl text-center md:text-left mb-6">Your Profile</h1>

      <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex flex-col items-center">
          <Avatar className="h-28 w-28 md:h-32 md:w-32 mb-3 shadow-md">
            <AvatarImage src={user?.photoUrl} alt={user?.name || "User"} />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex-1 w-full">
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold text-gray-800 dark:text-gray-100">Name:</span>
              <span className="ml-2 text-gray-700 dark:text-gray-300">{user?.name}</span>
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-800 dark:text-gray-100">Email:</span>
              <span className="ml-2 text-gray-700 dark:text-gray-300">{user?.email}</span>
            </p>
            <p className="text-lg">
              <span className="font-semibold text-gray-800 dark:text-gray-100">Role:</span>
              <span className="ml-2 text-gray-700 dark:text-gray-300">{user?.role?.toUpperCase()}</span>
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-4">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Your Profile</DialogTitle>
                <DialogDescription>
                  Update your personal information and profile picture.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={updateUserHandler}
                  disabled={updateUserIsLoading}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-semibold text-xl mb-4">Enrolled Courses</h2>
        {user?.enrolledCourses.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">You haven't enrolled in any courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
