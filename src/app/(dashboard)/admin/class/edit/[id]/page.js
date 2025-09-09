import Title from "@/components/(site)/common/title";
import ClassForm from "../../component/form";
import { use } from "react";  // Next.js 15 style

const Page = ({ params }) => {
  const resolvedParams = use(params); // unwrap Promise
  return (
    <div>
      <Title title="Update Class" />
      <ClassForm id={resolvedParams.id} /> {/* এখানে "7" আসবে */}
    </div>
  );
};

export default Page;
