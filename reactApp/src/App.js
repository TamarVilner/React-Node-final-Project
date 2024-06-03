// import Father from './component/less1/Father';
// import BackGround from './component/less1/BackGround';
// import ShowList from './component/less2/ShowList'
// import Shop from './component/less3/Shop';
// import AddForm from './component/less3/addForm';
// import Login from './component/less5/Login';
// import Login from './component/project/project/Login';
// import Users from './component/project/project/Users';
// import ListToDo from './component/project/project/ListToDo ';
// import NavBar from './component/project/project/NavBar';
// import ClassArr from './component/less5/ClassArr';
// import ListClasses from './component/less5/ListClasses';
// import ClassDetails from './component/less5/ClassDetails';
// import Home from './component/less5/Home';
// import NavBar from './component/less5/NavBar';
// import Gym from './component/less6/Gym';
import axios from 'axios';
import Swal from 'sweetalert2/src/sweetalert2.js'
import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import SignIn from './component/finalProject/pages/signIn';
import SignUp from './component/finalProject/pages/signUp';
import HostagesTicker from './component/finalProject/pages/hostagesTicker'
import Products from './component/finalProject/pages/products'
import ShoppingCart from './component/finalProject/pages/shoppingCart'
import AddProduct from './component/finalProject/pages/addProduct';
import ManagerNavBar from './component/finalProject/NavBar/managerNavBar';
import UserNavBar from './component/finalProject/NavBar/userNavBar ';
import UpdateProduct from './component/finalProject/pages/updateProduct';
import Users from './component/finalProject/pages/users';
import CompletionOrder from './component/finalProject/pages/completionOrder'
import Orders from './component/finalProject/pages/orders'
import ViewOrderDetails from './component/finalProject/pages/viewOrderDetails'

function App() {
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo, "App");

  return (
    <div className="App">
      {/* <Father></Father>
      <BackGround></BackGround>
      <BackGround></BackGround>
      <BackGround></BackGround>
      <ShowList></ShowList> */}
      {/* <Shop></Shop>
      <AddForm></AddForm> */}
      {/* <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path="" element={<Home />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path='Login' element={<Login />}></Route>
          <Route path='ClassDetails/:code' element={<ClassDetails />}></Route>
          <Route path='ListClasses' element={<ListClasses />}></Route>
          <Route path="" element={<Home />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path='Login' element={<Login />}></Route>
          <Route path='ClassDetails/:code' element={<ClassDetails />}></Route>
          <Route path='ListClasses' element={<ListClasses />}></Route>
        </Routes>
      </BrowserRouter> */}
      {/* <Gym></Gym> */}
      {/* פרויקט ראשון - רשימת משימות */}
      {/* <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path='' element={<Login/>}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/Users' element={<Users/>}></Route>
          <Route path='/ListToDo' element={<ListToDo/>}></Route>
        </Routes>
      </BrowserRouter> */}
      {/* פרויקט ראשון - רשימת משימות */}





      {/* פרויקט אחרון - חנות ספורט */}
      <BrowserRouter>
        {(userInfo !== null && userInfo.password === '1234' && userInfo.name === 'תמר') ? <ManagerNavBar /> : <UserNavBar />}
        <div style={{ marginTop: '90px' }}> {/* מרווח כדי לפנות מקום ל-Navigation Bar */}
          <Routes>
            <Route path='/' element={<SignIn></SignIn>}></Route>
            <Route path='/SignIn' element={<SignIn></SignIn>}></Route>
            <Route path='/SignUp' element={<SignUp></SignUp>}></Route>
            <Route path='/Products' element={(userInfo === null) ? <SignIn /> : <Products></Products>}></Route>
            <Route path='/ShoppingCart' element={(userInfo === null) ? <SignIn /> : <ShoppingCart></ShoppingCart>}></Route>
            <Route path='/AddProduct' element={(userInfo === null) ? <SignIn /> : <AddProduct></AddProduct>}></Route>
            <Route path="/UpdateProduct/:id" element={(userInfo === null) ? <SignIn /> : <UpdateProduct></UpdateProduct>}></Route>
            <Route path='/Users' element={(userInfo === null) ? <SignIn /> : <Users />}></Route>
            <Route path='/CompletionOrder' element={<CompletionOrder />}></Route>
            <Route path='/ViewOrderDetails' element={<ViewOrderDetails />}></Route>
            <Route path='/Orders' element={(userInfo !== null && userInfo.password === '1234' && userInfo.name === 'תמר')?<Orders />: <SignIn />}/></Routes>
        </div>
        <ToastContainer />
        <HostagesTicker />
      </BrowserRouter>

    </div>
  );
}

export default App;
