import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setState } from '../redux/userSlice';


const Login = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password:''
    },
    validationSchema: Yup.object({
      
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,).required('Required'),
    }),
    onSubmit: async values => {
      // alert(JSON.stringify(values, null, 2));
      console.log(values)
      let res = await axios.post('http://localhost:6677/user/login',values);
    let data = res.data;
    console.log(res)
    console.log(data)
    dispatch(setState(data))
    if(res.status==200 || res.status==201){
        navigate('/')
    }  
    },
  });
  return (
    <div className='main h-[88.3vh] flex mt-17.5'>
    <form onSubmit={formik.handleSubmit} className='login flex flex-col h-[88vh] w-[50vw] p-5 text-gray-600 gap-5 justify-center items-center'>
    <h1 className='text-blue-700 text-4xl font-bold'>Login</h1>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        className='border-2 outline-none rounded-md px-3 py-2 w-[400px]'
        placeholder='Email'
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

  
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        className='border-2 outline-none rounded-md px-3 py-2 w-[400px]'
        placeholder='Password'
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <h1> <Link to={"/forget"} className='text-blue-700'>Forget password?</Link></h1>

<h1>Don't have an account ? <Link to={"/signup"} className='text-blue-700'>Signup</Link></h1>
      <button type="submit" className='bg-blue-700 text-white rounded-md py-2 w-[100px] cursor-pointer'>Submit</button>
    </form>
    <div className='text-white flex  flex-col items-center justify-center w-[50vw] gap-3'>
        <h1 className='text-5xl text-white'>welcome back!</h1>
        <h2 >Login to continue...</h2>
      </div>
    </div>
  );
};

export default Login