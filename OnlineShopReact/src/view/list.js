import React from 'react';
import List from '../componet/list';
import { useParams } from 'react-router-dom';
import data from "../data/data";
const pageLength = Math.ceil(data.length/3);
export default function ListView(){
  let {page=1} = useParams();
  return <div>
        <h1>列表视图</h1>
        <List 
            activePage={page}
        />
  </div>
}