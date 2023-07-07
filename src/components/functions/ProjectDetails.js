import { Search } from '@material-ui/icons';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RightMenu_1 from '../../RightMenu_1';

//firebase
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../Firebase';


const ProjectDetails = () => {

  const [postProject, setPostProject] = useState([])

  const params = useParams();
  let params_id = params.project_id

  const docRef = doc(db, 'projects', params_id);

  const getProject = async () => {
    try {
      const docSnap = await getDoc(docRef);
      setPostProject(docSnap.data());
    } catch (e) {
      console.log(e)
    }    
  }

  getProject(); 

   
  return (
    <>

      <div className='typicalWindow'>
        
        <div className='sidebar-left'>
        
        </div>
        <div className='mainWindow'>
          {/* Project: 
          {params_id} */}
          {postProject['projectName']}
          @
          {postProject['projectLocation']}
          by:
          {postProject['author'] && postProject['author']['name']}
          <br />

          {
            postProject['images'] && (
              postProject['images'].map(image =>  
                <>
                <img src= {image} width='100%' />
                <br />
                </>
               )
            )

          }
            
          
         
        </div>
        <div className='showCase'><RightMenu_1 /></div>

      </div>
      
    </>
  )
}

export default ProjectDetails