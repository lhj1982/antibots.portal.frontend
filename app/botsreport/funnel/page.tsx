import FunnelChart from "@/app/components/FunnelChart";

const FunnelPage = () => {
    const totalWinners = 2000;
    const totalEntries= 718523;
    const totalSelected = 3387;
    const totalValidEntries = 718523;
    const notSelectedEntries = totalValidEntries - totalSelected;
    const invalidEntries = totalEntries - totalValidEntries;

  return (
    <div className="w-1/2 h-full">
      <h1>Funnel Page</h1>
      <FunnelChart
              completed={totalWinners}
              entries={totalEntries}
              invalidEntries={invalidEntries}
              notSelectedEntries={notSelectedEntries}
              selected={totalSelected}
              validEntries={totalValidEntries}
              showFailures test={123123}      />
    </div>
  );
};

export default FunnelPage;
