import './Dashboard.css';
import Common from '../Common';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
export default function Login() {

  const { nodeurl } = Common();

  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setshowPassword] = useState(false);

  const inputHandle = (e) => {
    setloginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const loginHandle = async (e) => {
    e.preventDefault();
    console.log(loginData, nodeurl);

    await fetch(nodeurl + 'user/login', {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginData),
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          window.localStorage.setItem("myToken", res.myToken);
        }
        else {
          alert(res.message);
        }
      })
      .catch(err => {
        console.log(err);
      });

  }




  return (
    <>
      <section className="dashboard-bg dashboard-login">
        <div className="container">
          <div className="row ">
            <div className="col-lg-6 mx-auto wrapper dashboard-login-wrapper">
              <h2 className='dashboard-heading-color'>
                Welcome Back 👋
              </h2>
              <h5 className='mb-4'>Please Login </h5>

              <form onSubmit={loginHandle}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="email" name='email' onChange={inputHandle} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className='position-relative'>
                    <input type={showPassword ? "text" : "password"} className="form-control" id="password" name='password' onChange={inputHandle} />
                    <div className="pass-showhide" onClick={() => setshowPassword(!showPassword)}>
                      {
                        showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                      }
                    </div>

                  </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
