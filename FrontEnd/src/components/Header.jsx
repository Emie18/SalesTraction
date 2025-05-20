import { getStartUpDetails } from "../scripts/getData";
import { getStudentDetails } from "../scripts/getData";
import { useEffect, useState } from "react";
function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const session = JSON.parse(localStorage.getItem('session'));
            if (!session) return;

            

            if (session.type === 'student') {
                const data = await getStudentDetails();
                setUser(data);
            } else if (session.type === 'startup') {
                const data = await getStartUpDetails();
                setUser(data);
            }
        };

        fetchUser();
    }, []);
    return (
        <div className="header">
            <div className="img">
                {user &&
                <img src={user.image ? user.image : '/no_image.jpg'}></img>
                }
                
            </div>
        </div>
    )
}

export default Header