import ProfileCard from "../UI/ProfileCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../features/userSlice";
import Loading from "../UI/Loading";

const ProfilePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const { user } = useSelector((state) => state.user);

  if (!user) {
    return <Loading />;
  }
  return (
    <div className="text-white">
      <ProfileCard
        name={user.name}
        email={user.email}
        age={user.age}
        phone={user.phone}
        profileImage={user.profileImage}
      />
    </div>
  );
};

export default ProfilePage;
