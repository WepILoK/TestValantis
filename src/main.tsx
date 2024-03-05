import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ProductList} from "./pages/ProductList/ProductList.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ProductList/>
  </React.StrictMode>,
)
