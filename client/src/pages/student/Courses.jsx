import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError)
    return (
      <div className="text-center py-20 text-red-600 text-xl font-semibold">
        Some error occurred while fetching courses.
      </div>
    );

  return (
    <section className="bg-gray-50 dark:bg-[#121212] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white">
          Explore Our Top Courses
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses?.map((course, index) => (
                <Course key={index} course={course} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow hover:shadow-xl transition duration-300 ease-in-out">
      <Skeleton className="w-full h-40 rounded-t-2xl" />
      <div className="p-5 space-y-4">
        <Skeleton className="h-6 w-3/4 rounded" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-14" />
        </div>
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
};
