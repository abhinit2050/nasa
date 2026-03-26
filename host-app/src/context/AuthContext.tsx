import { createContext, useContext, useState } from "react";

//context will have user info through state variable, login function and logout function

type User = {
    username:string,
    role:"user"|"admin"
}

type AuthContextType = {
    user: User | null,
    login:(user:User)=>void,
    logout:()=>void
}

const AuthContext = createContext<AuthContextType|null>(null);

export function AuthProvider({children}:{children:React.ReactNode}){

    const [user, setUser] = useState<User|null>(null);

    const login = (newUser:User)=>{
        setUser(newUser);
    }

    const logout = ()=>{
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}