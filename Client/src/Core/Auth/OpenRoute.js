import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const OpenRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            if (token === null) {
                return;
            } else {
                navigate("/posts");
            }
        } catch (error) {
            console.error("Error in OpenRoute:", error);
        }
    }, [token, navigate]);

    return children;
};

export default OpenRoute;
