import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Compass } from "lucide-react"; // For icons

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-32 px-6 text-center text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Unlock Your Learning Journey
        </h1>
        <p className="text-lg md:text-xl text-gray-200 dark:text-gray-400">
          Find the perfect course to upskill, explore new fields, and grow.
        </p>

        <form
          onSubmit={searchHandler}
          className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-gray-800 rounded-full px-4 py-3 shadow-lg max-w-2xl mx-auto"
        >
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for courses..."
            className="flex-grow border-none focus-visible:ring-0 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
          />
          <Button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-5 py-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition"
          >
            <Search size={18} />
            Search
          </Button>
        </form>

        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="mt-2 inline-flex items-center gap-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-white border border-blue-500 dark:border-gray-600 rounded-full px-6 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
        >
          <Compass size={18} />
          Explore Courses
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
