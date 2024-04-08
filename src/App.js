
import './App.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';


import {LayOut} from "./Componant/LayOut/LayOut"
import {Home} from "./Componant/Home/Home"
import {Products} from "./Componant/Products/Products"
import {Login} from "./Componant/Login/Login"
import {Categories} from "./Componant/Categories/Categories"
import {SimpleProfile} from "./Componant/SimpleProfile/SimpleProfile"
import {Cart} from "./Componant/Cart/Cart"
import {Brands} from "./Componant/Brands/Brands"
import {ProductDetails} from "./Componant/ProductDetails/ProductDetails"
import {NotFound} from "./Componant/NotFound/NotFound"
import {Register} from "./Componant/Register/Register"
import {UserAddress} from "./Componant/UserAddress/UserAddress"
import  CounterContextProvider  from './Context/counterContext';
import UserContextProvider from './Context/UserContext';
import   { ProtectedRoute } from './Componant/ProtectedRoute/ProtectedRoute';

import CartContextProvider from "./Context/CartContext"
import {reactQueryDevtools} from "react-query/devtools";
import AllOrders from './Componant/AllOrders/AllOrders';
import WishList from './Componant/WishList/WishList';



function App() {

  let routers = createBrowserRouter ([
{path: "/" , element : <LayOut/> , children : [

  {index : true , element : <ProtectedRoute> <Home/> </ProtectedRoute>},
  {path:"products" , element : <ProtectedRoute> <Products/> </ProtectedRoute> },
  {path:"login" , element : <Login/>},
  {path:"categories" , element : <ProtectedRoute> <Categories/> </ProtectedRoute>},
  {path:"register" , element : <Register/>},
  {path:"cart" , element : <ProtectedRoute> <Cart/> </ProtectedRoute>},
  {path:"productDetails/:id" , element : <ProtectedRoute> <ProductDetails/> </ProtectedRoute>},
  {path:"brands" , element : <ProtectedRoute> <Brands/> </ProtectedRoute>},
  {path:"simpleProfile" , element : <ProtectedRoute> <SimpleProfile/> </ProtectedRoute>},
  {path:"userAddress" , element : <ProtectedRoute> <UserAddress/> </ProtectedRoute>},
  {path:"wishList" , element : <ProtectedRoute> <WishList/> </ProtectedRoute>},
  {path:"allorders" , element : <ProtectedRoute> <AllOrders/> </ProtectedRoute>},
  {path:"*" , element : <NotFound/>},

] }


  ])
  return <>
  <CartContextProvider>
  <UserContextProvider>
  <CounterContextProvider>
  <RouterProvider router={routers}></RouterProvider>

  </CounterContextProvider>
  <reactQueryDevtools intialIsOpen="false" positon="bottom-right"/>
  </UserContextProvider>

  </CartContextProvider>
  


  
  
  </>
}

export default App;
