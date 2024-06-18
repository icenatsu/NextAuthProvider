import { authOptions } from "@utils/authOptions";
import { getServerSession } from "next-auth";

export const getAuthSession = () => {
    return getServerSession(authOptions)
}

export const getRequiredAuthSession = async () => {
    const session = await getAuthSession();
    

    return session 
}