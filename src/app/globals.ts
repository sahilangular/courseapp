import { isAuthenticated } from "./middleware/isAuthenticate";

const user:any = isAuthenticated();


const userRole = async () => {
  const USER={
    role:user.role
}
};

export default userRole;



