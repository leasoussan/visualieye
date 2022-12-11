import { Route, Redirect } from 'react-router'
import { CheckUserLogIn } from './CheckUserLogIn';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

export function Home() {

    //  const check_user_id = () => {
    //     const getuser = localStorage.getItem('isLoggin');
    //     if (getuser) {
    //         const getUserId = getuser.split(',')[0]
    //         console.log("getUserId", getUserId);
    //         return getUserId
    //     }
    //     else {
    //         return 0
    //     }

    // };check_user_id()

    // const setLoggedIn = () => {
    //     if (check_user_id() === 0) {
    //         return false
    //     }else{
    //         return true
    //     }
    // }
    // setLoggedIn()

    // {
    //     const getUserId = getuser.split(',')[0]
    //     const state = true
    // }

    return (
        <>
            <CheckUserLogIn />
            {/* <NavBar user_id={check_user_id()} Logged={setLoggedIn()} /> */}



            <Link to='/login' id='go_to_login' />
            <div className='homePageDispaly'>


            </div>
        </>
    )

}

export default Home