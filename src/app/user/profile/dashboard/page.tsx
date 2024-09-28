import CardsInsights from "@/components/ui/CardsInsights";
import React from "react";
import { dummyDashboardData } from "@/lib/dummyData";
import ChartsInsights from "@/components/ChartsInsights";
import PostPage from "@/app/seller/post/page";

const page = () => {
  const dashboardData = dummyDashboardData;

  return (
    <main className="flex flex-col gap-6">
      <h1 className="text-3xl sm:text-4xl font-bold">Dashboard</h1>
      <CardsInsights data={dashboardData} />
      <ChartsInsights data={dashboardData} />
      <PostPage/>
    </main>
  );
};

export default page;
