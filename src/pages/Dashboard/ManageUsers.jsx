import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle";
import UsersTable from "../../components/UsersTable";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const admins = users.filter((admin) => admin.role === "admin");
  const sellers = users.filter((seller) => seller.role === "seller");
  const user = users.filter((user) => user.role === "user");
  // console.log(admins, sellers, user);
  return (
    <div>
      <Helmet>
        <title>MediConnect || Manage Users</title>
      </Helmet>
      <SectionTitle heading="users"></SectionTitle>
      <Marquee>If you change your role you will be logged out first.</Marquee>

      <UsersTable
        users={admins}
        heading="admins"
        refetch={refetch}
      ></UsersTable>
      <UsersTable
        users={sellers}
        heading="sellers"
        refetch={refetch}
      ></UsersTable>
      <UsersTable users={user} heading="users" refetch={refetch}></UsersTable>
    </div>
  );
};

export default ManageUsers;
