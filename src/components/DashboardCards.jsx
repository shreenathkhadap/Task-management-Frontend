function DashboardCards({
  totalTasks,
  pendingTasks,
  completedTasks,
  inProgressTasks,
}) {
  const cards = [
    {
      title: "Total Tasks",
      value: totalTasks,
    },
    {
      title: "Pending",
      value: pendingTasks,
    },
    {
      title: "Completed",
      value: completedTasks,
    },
    {
      title: "In Progress",
      value: inProgressTasks,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.title} className="bg-white shadow rounded-xl p-6">
          <h3 className="text-gray-500">{card.title}</h3>

          <p className="text-3xl font-bold mt-3">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;
