import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
        <div className="relative">
          <img
            src={course.courseThumbnail}
            alt="course"
            className="w-full h-40 object-cover rounded-t-lg"
          />
          {/* Optional gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 rounded-t-lg pointer-events-none"></div>
        </div>
        <CardContent className="px-6 py-5 space-y-3">
          <h1 className="font-semibold text-xl text-gray-900 dark:text-gray-100 truncate hover:underline">
            {course.courseTitle}
          </h1>
          {/* Optional description snippet */}
          {/* <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {course.description}
          </p> */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-blue-500">
                <AvatarImage
                  src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
                  alt={course.creator?.name || "Instructor"}
                />
                <AvatarFallback>{course.creator?.name?.slice(0, 2).toUpperCase() || "IN"}</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm text-gray-800 dark:text-gray-300">
                {course.creator?.name}
              </h1>
            </div>
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs rounded-full transition">
              {course.courseLevel}
            </Badge>
          </div>
          <div className="text-lg font-extrabold text-green-600 dark:text-green-400">
            <span className="text-sm align-top">₹</span>
            <span>{course.coursePrice}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default Course;
