import ActionsDialog from "./ActionsDialog";
import { Appointment } from "./columns";
const ActionsTable = ({ actions }: { actions: Appointment }) => {
  return (
    <div className="flex gap-2">
      <ActionsDialog buttonLabel={"scheduled"} data={actions} />
      <ActionsDialog buttonLabel={"cancel"} data={actions} />
    </div>
  );
};

export default ActionsTable;
