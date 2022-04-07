import React from "react";
import { AuthAPI } from "apis";
import { useRouter } from "next/router"
import { Spin } from "antd";
import Loading from "components/Loading";

const AuthContext = React.createContext({
  logout: () => { },
  user: {},
  session: ""
});

export default function useAuth() {

  const { logout, session, user } = React.useContext(AuthContext)

  return {
    logout,
    session,
    user
  };
}



export function AuthContainer({ children }) {

  const router = useRouter();
  const [session, setSession] = React.useState("session");
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);


  const logout = async () => {
    await AuthAPI.logout();
    router.reload();
  };

  React.useEffect(() => {

    if (!loading) {
      setLoading(true);
    }

    (async () => {

      let user = {};
      try {
        user = await AuthAPI.me();

        if (!user) {
          router.replace("/auth/login");
          return;
        }
        setUser(user);
      } catch (err) {
        console.log("error",)
        router.replace("/auth/login")
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.basePath]);

  if (loading) {

    return <Loading />
  }

  return (
    <AuthContext.Provider
      value={{
        logout,
        session,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export function useAuthControl() {
  const router = useRouter()

  const [filter] = React.useState({});

  const {
    result: data,
    loading,
    error
  } = useFetch(AuthAPI.me, filter)({});

  const logout = async () => {
    // await AuthAPI.logout();
    // router.reload();
  };

  if (error) {

  }

  if (error && error.message === "NOT_CREDINTIALS") {
    router.replace("/auth/login");
    return null;
  }

  return {
    loading,
    session,
    logout
  };
}