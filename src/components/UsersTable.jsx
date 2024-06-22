import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UsersTable = ({ users, heading, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleRole = (e, email) => {
    e.preventDefault();
    const role = e.target.value;
    const user = {
      email,
      role,
    };
    axiosSecure.patch("/users", user).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          title: "Role has been saved",
          showConfirmButton: false,
          timer: 800,
        });
      }
    });

    console.log(email, role);
  };
  return (
    <div>
      <h2 className="text-center uppercase underline">{heading} Table</h2>
      <div className="overflow-x-auto mb-16">
        <table className="table table-zebra text-center">
          {/* head */}
          <thead>
            <tr className="bg-orange-300">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <form
                    onChange={(e) => handleRole(e, user.email)}
                    className="flex justify-center"
                  >
                    <div className="form-control">
                      <select
                        name="role"
                        defaultValue={user.role}
                        className="w-28 bg-red-500 rounded-lg text-white"
                      >
                        <option value="admin">Admin</option>
                        <option value="seller">Seller</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
