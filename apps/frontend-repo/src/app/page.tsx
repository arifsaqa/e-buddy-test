import Navbar from "../components/organisms/Navbar";
import UserTable from "../components/organisms/UserTable";

export const metadata = {
  title: "Ebuddy-test | user crud",
};

export default function Store() {
  return (
    <>
      <Navbar />
      <UserTable/>
    </>
  );
}
