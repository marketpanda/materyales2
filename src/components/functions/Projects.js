import React, {useEffect, useState} from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { listAll, ref, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../Firebase'
import { selections } from './Populate'
import RightMenu_1 from '../../RightMenu_1'
import '../.././styles2.css'
import { NavLink } from 'react-router-dom'
import ProjectsMenu from '../ProjectsMenu'

const Projects = () => {

    const [postProjects, setPostProjects] = useState([])
    const getProjects = collection(db, 'projects')
    const [projectImage, setProjectImage] = useState([])

    const imageRef2 = ref(storage, `project_images`)

    useEffect(() => {
      const listProjects = async () => {
        const data = await getDocs(getProjects)
         
        setPostProjects(data.docs.map((project) => (
            { ...project.data(), id: project.id}
        )))
      }
      listProjects()
    
    }, [])

    useEffect(() => {
      listAll(imageRef2).then((response) => (
        response.items.forEach((item) => (
          getDownloadURL(item).then((url) => (
            setProjectImage((prev) => [...prev, url])
          ))
        ))
      ))

    }, [])
    
     


  return (
    <>

<div className='typicalWindow'>
        <div className="sidebar-left">

        <nav id="switch">
            <ProjectsMenu /> 
          </nav> 
 
         
        </div>
        <div className='mainWindow'>
        <div>
        {
            postProjects.map((theProject) => {
                return (
                    <>
                    <div className='card_project'>
                      
                        {
                          theProject.images && ( 
                            <div className='cover_photo'>
                            <img src={theProject.images[0]}  width='100%' />
                            </div>
                         )
                                               
                      }
                        
                    <div>
                       
                      {/* <div>{theProject.id}</div> */}
                    <div className='title'>
                      <NavLink to={'project_details/'+theProject.id}>
                          {theProject.projectName}</NavLink>
                    </div>
                    <div> {theProject.author && ('by', theProject.author.name)}</div>
                    <div className='secondary'>{theProject.projectLocation}</div>
                    <div>{
                      selections.projectTypes[theProject.checkProjectType]
                    }
                    </div>
                    <div>{
                      selections.projectStatus[theProject.projectStatus]
                    }
                    </div>
                     

                  </div> 

                    </div>
                                  
                    </>
                )
            })
        }

    </div>
         
        </div>
        <div className='showCase'>
        <RightMenu_1 />
 
        </div>
        

      </div> 



    </>
  )
}

export default Projects