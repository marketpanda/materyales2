import React, {useState, useCallback, useContext, useEffect} from 'react'
import { addDoc, collection, serverTimestamp, updateDoc, arrayUnion, getDoc, doc} from 'firebase/firestore'
import { db, auth, storage } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

import '../../styles2.css'
import DragAndDropFiles from './DragAndDropFiles'

import { LoginContext } from '../../App'
 
 

const UploadProject = () => {   

    const [projectName, setProjectName] = useState('')
    const [projectLocation, setProjectLocation] = useState('')

    //usecontext
    const [userLog, setUserLog] = useContext(LoginContext)
    
    const [logMessage, setlogMessage] = useState('')

    useEffect(() => {
      console.log(userLog, 'test')

      if (!userLog) {
        setlogMessage('Please log in to upload a project')
        
      } else {
        setlogMessage('')
      }
    
      
    }, [userLog])
    
 
 

    //photos 
    const [photos, setPhotos] = useState([])

    const [checkProjectType, setCheckProjectType] = useState(null)
    const [projectStatus, setProjectStatus] = useState(null)

    const selections  = {
        projectTypes: {
            t_residential: 'New House Construction',
            t_renovation: 'Renovation / Extension',
            t_DIY: 'DIY',
            t_woodworking: 'Woodworking and Cabinetry',
            t_finishing: 'Interior Works',
            t_gardening_and_landscaping: 'Landscaping and Outdoor'
        },
        projectStatus: {
            s_start_soon: 'To Start Soon',
            s_ongoing: 'Ongoing',
            s_planning: 'Planning Stage',
            s_finished: 'Finished Project / For Profiling'    
        }
    }

    const handleOptionType = e => {
        setCheckProjectType(e.target.value)
    }

    const handleOptionStatus = e => {
        setProjectStatus(e.target.value)
    }

    const populateTypes = () => {
        const myObj = selections.projectTypes   
        let typeArr = []
        Object.keys(myObj).forEach((type) => ( 
            typeArr.push(
             
                 <div className='item'>
                     <input 
                        id={type} type='checkbox'
                        name='project_type' 
                        value={type}
                        checked={checkProjectType === type} 
                        onChange={handleOptionType}
                    />
                     <label for={type} >{myObj[type]}</label>
                </div> 
            )
              
        ))    
         
        return typeArr  
    }

    const populateStatus = () => {
        const myObj = selections.projectStatus   
        let typeArr = []
        Object.keys(myObj).forEach((status) => ( 
            typeArr.push(
             
                 <div className='item'>
                     <input 
                        id={status} type='checkbox'
                        name='status' 
                        value={status}
                        checked={projectStatus === status} 
                        onChange={handleOptionStatus}
                    />
                     <label for={status} >{myObj[status]}</label>
                </div> 
            )
              
        ))    
        
        return typeArr

    } 

    const projectCollectionRef = collection(db, 'projects')
    let navigate = useNavigate();

    const submitProjectNow = async () => {
 
        const docRef = await addDoc(projectCollectionRef, {
            projectName, 
            projectLocation, 
            checkProjectType, 
            projectStatus, 
            author: {name:auth.currentUser.displayName, id: auth.currentUser.uid},
            timestamp: serverTimestamp()
        
        })

        if (photos == null) return

        await Promise.all(
            photos.map(thePhoto => {
                const imageRef = ref(storage, `project_images/${thePhoto.name + v4()}`)
                return uploadBytes(imageRef, thePhoto) 
                    .then(() => {
                        console.log(`Photo ${thePhoto.name} uploaded successfully`) 
                    })

                    .then(async() => {
                         
                        const downloadURL = await getDownloadURL(imageRef)
                        await updateDoc(doc(db, 'projects', docRef.id),
                        {images:arrayUnion(downloadURL)}).then(() => {
                            console.log(`${thePhoto}, updated!`)
                        })
                         
                    })
                    .catch(error => {
                        console.error(`Error uploading photo ${thePhoto.name}: ${error}`)
                    })
                 
            }) 
        ) 

        setPhotos([])
        navigate('/')
    }


  return (
    <>
    <div>{logMessage}</div>
     
    {
        
        userLog &&
    
    <div id='form1'>

        
        <div className='inputSubmit'>
            <label>Project Name</label>
            <input type='text' onChange={(e) => {setProjectName(e.target.value)}} value={projectName} />
        </div>
        <div className='inputSubmit'>
            <label>Location</label>
            <input type='text' onChange={(e) => {setProjectLocation(e.target.value)}} value={projectLocation} />
        </div>

        <div>
            <label>Photos</label>
            <DragAndDropFiles
                photos={photos}
                setPhotos={setPhotos}
            />
            
        </div>
 
        <div>
            <label>Project Type</label>
            
            <div className='options'> 
                {populateTypes()}
            </div> 

        </div>

          
        <div>
            <label>Status</label>
            
            <div className='options'>
                {populateStatus()} 
         </div> 

        </div> 
  
        <button type='submit' onClick={submitProjectNow}>Upload Project</button>

      
    </div>

    }
     
     
    </>
  )
}

export default UploadProject