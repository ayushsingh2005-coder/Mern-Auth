import { createContext , useState , useEffect} from "react";
import { toast } from "react-toastify";
import axios from 'axios';

export const Appcontext = createContext()

export const AppcontextProvider = (props)=>{

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [isLoggedin , setIsLoggedin] = useState(false);
    const [userData , setUserData] = useState(false);

    const getAuthState = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/isAuth')
            if(data.success){
                setIsLoggedin(true)
                getUserData()
            }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    // getting user data
    const getUserData = async()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/data' , {withCredentials: true,})
            // withCredentials: true, -->>without this the cookie/session is not sent, so your backend can’t identify the user.
            data.success ? setUserData(data.userData) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getAuthState();
    },[])
    

    const value={
        backendUrl,
        isLoggedin,setIsLoggedin,
        userData,setUserData,
        getUserData

    }
    return (

        <Appcontext.Provider value={value}>

            {props.children}

        </Appcontext.Provider>

    )
}