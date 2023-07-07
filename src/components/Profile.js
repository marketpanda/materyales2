import { addDoc, collection, getDoc, getDocs, doc, query, where, limit, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore'
import React, {useEffect, useRef, useState} from 'react'
import { db } from './Firebase'
import "firebase/firestore"
import firebase from 'firebase/app'

const Profile = ({userId, setUserId}) => {

  const [userPropagated, setUserPropagated] = useState(false)
  const [userPopulate, setUserPopulate] = useState({})

  //will be pulled from database
  const [editValue, setEditValue] = useState({})

  //refs for inputs
  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const skillsRef = useRef(null);
  const birthdayRef = useRef(null);
  const locationRef = useRef(null);

  const [docId, setDocId] = useState('')
 

  //inputs
  const [disabled, setDisabled] = useState(true)
  const [currentEdit, setCurrentEdit] = useState([
    {'field':'name', 'isEditing': false, 'theValue':''},
    {'field':'username', 'isEditing': false, 'theValue':''}, 
    {'field':'email', 'isEditing': false, 'theValue':''}, 
    {'field':'skills', 'isEditing': false, 'theValue':''}, 
    {'field':'birthday', 'isEditing': false, 'theValue':''}, 
    {'field':'location', 'isEditing': false, 'theValue': ''}
  ])

  //database tunnel
  const userProfileRef = collection(db, "user_profiles")
  

  const toggleEditButton = (field) => {
    const nameField = currentEdit.find((edit) => edit.field === field)
    const newNameField = {...nameField, 'isEditing': true}
    const newCurrentEdit = currentEdit.map((edit) => 
      edit.field === field ? newNameField : edit
    )

    setCurrentEdit(newCurrentEdit)   
     
    
    
    console.log('editting')   
  }

  const toggleCancelButton  = (field) => {
     
    const nameField = currentEdit.find((edit) => edit.field === field)
    const newNameField = {...nameField, 'isEditing': false}
    const newCurrentEdit = currentEdit.map((edit) =>
      edit.field === field ? newNameField : edit
    )
    setCurrentEdit(newCurrentEdit) 
    console.log('cancelled')
    console.log(usernameRef.current)
    
    
     
  }

  //toggle disabling/enabling of input fields
  const toggleInputField = (field) => {
    const findToggle = currentEdit.find((edit) => edit.field === field)
    const result = findToggle.isEditing    
    return result
  }  

 
  
  const submitField = (field) => {
    const whatField =  currentEdit.find((edit) => edit.field === field) 

    const docRef = doc(userProfileRef, docId)
    
    const updateItem = {username: editValue.username}

    const updateItems = {

      // <input style={{width:'200px'}} type='text' value={(editValue.name && editValue.name.first_name)} disabled={!toggleInputField('name')}  
      //             onChange={(e) => setEditValue({...editValue, 'name': {...editValue.name, 'first_name': e.target.value}})} 
      //           /> 

      //'name':{'last_name':'', 'first_name':'', 'middle_name':''},


      name: {
        'name.first_name': editValue.name.first_name,
        'name.middle_name': editValue.name.middle_name,  
        'name.last_name': editValue.name.last_name, 
      }, 
       
      username: {username: editValue.username},
      email : {email: editValue.email},
      skills: {skills: editValue.skills},
      location: {location: editValue.location},
      birthday: {birthday: editValue.birthday}
    }
    try{
  
      updateDoc(docRef, updateItems[field]) 
      console.log('submitting...', editValue)

    } catch (error) {
      console.log('error ', error)
    }
    
     
  }

  // const userCollectionRef = collection(db, 'user_profiles'); 
  // sync the user to detailed collections (other infos such as address)
 

  const switchButtons = (field) => {
    const whatField = currentEdit.find((edit) => edit.field === field)
    const goEdit = whatField.isEditing
     
    
    if (goEdit == true) {
      return (
        <>
          <span><button onClick={() => submitField(field)}>Submit</button></span>
          <span><button onClick={() => toggleCancelButton(field)}>Cancel</button></span>
          
        </>
        
      )

    } else if (goEdit == false) {
      return (
        <>
          <span><button onClick={() => toggleEditButton(field)}>Edit</button></span>
           
        </>
        
      )
        
    }

  }

  

  useEffect(() => {
     
    
     
    const queryUser = query(userProfileRef, where("the_user_id", "==", userId), limit(1))

    const unsubscribe = onSnapshot(queryUser, (snapshot) => {

      const populateUser = async() => {
        const userPopulateRef = await addDoc(userProfileRef, {
          'username':'',
          'name':{'last_name':'', 'first_name':'', 'middle_name':''},
          'the_user_id': userId,
          'location': '',
          'skills': '',
          'birthday':'',
          'email':'',
          timestamp: serverTimestamp() 
        })
      }

       
      const retrieveData = async() => {
        // const queryUser = query(userProfileRef, where("the_user_id", "==", userId), limit(1))
        try {
          const querySnapShot = await getDocs(queryUser)
          querySnapShot.forEach((doc) => {
            
            const getUserId = doc.data() 
            //console.log(doc.id)

           
             
            setDocId(theDoc => (doc.id))
            
            setUserPopulate(getUserId)
            setEditValue(prevState => ({...prevState, ...getUserId}))
            console.log('getUserId: ', getUserId)
            console.log('the document id ', docId)
             
          })

          //console.log('retrieving data')  
          
        } catch (error) {
          console.log("Error", error) 
        }
        
      }
       
      if (snapshot.docs.length > 0) {

        setUserPropagated(true) 
        retrieveData()
        
      } else {

        //enroll the user to a separate collection/table
        //firebase's default collection for users will not be touch
        //but instead we will create a collection for detailed infos of the user         
        populateUser();
         
      }
      
    })
 
    return unsubscribe
  }, [userId])

   
  
  toggleInputField('username') 
 
  return (
    <>
         
        <div className='profile'>
            
            <div className='profile_params'>First Name</div>
            <div className='profile_values'>
                <input style={{width:'200px'}} type='text' value={(editValue.name && editValue.name.first_name)} disabled={!toggleInputField('name')}  
                  onChange={(e) => setEditValue({...editValue, 'name': {...editValue.name, 'first_name': e.target.value}})}
                    
                /> 
                {switchButtons('name')}
                 
              </div>

            <div className='profile_params'>Middle Name</div>
            <div className='profile_values'>
              <input style={{width:'200px'}} type='text' value={(editValue.name && editValue.name.middle_name)} disabled={!toggleInputField('name')}
                onChange={(e) => setEditValue({...editValue, 'name': {...editValue.name, 'middle_name': e.target.value}})}
              />
              
               
            </div>

            <div className='profile_params'>Last Name</div>
            <div className='profile_values'>
              <input style={{width:'200px'}} type='text' value={(editValue.name && editValue.name.last_name)} disabled={!toggleInputField('name')}
                onChange={(e) => setEditValue({...editValue, 'name': {...editValue.name, 'last_name': e.target.value}})}
              />
               
            </div>
              
  
            <div className='profile_params'>Username</div>
            <div className='profile_values'>
            <input style={{width:'200px'}} type='text' ref={usernameRef} 
            value={editValue.username}
             disabled={!toggleInputField('username')} onChange={(e) =>  setEditValue({...editValue, 'username': e.target.value})} />
 
            {switchButtons('username')}
            </div> 

            <div className='profile_params'>Email</div>
            <div className='profile_values'>
              <input style={{width:'200px'}} type='text' ref={emailRef} value={editValue.email} disabled={!toggleInputField('email')}
              onChange={(e) => setEditValue({...editValue, 'email': e.target.value})} />

              {switchButtons('email')}
             
            </div>
            <div className='profile_params'>Skills</div>
            <div className='profile_values'>
              {/* {userPopulate.skills} */}
              <input style={{width:'200px'}} type='text' value={editValue.skills} disabled={!toggleInputField('skills')}
              onChange={(e) => setEditValue({...editValue, 'skills': e.target.value})}
              />
              
              {switchButtons('skills')}
             
            </div>

            
            <div className='profile_params'>Age</div>
            <div className='profile_values'>36 </div>
            
            <div className='profile_params'>Location</div>
            <div className='profile_values'>
               
              <input style={{width:'200px'}}  type='text' value={editValue.location}  disabled={!toggleInputField('location')}
                onChange={(e) => setEditValue({...editValue, 'location':e.target.value})}
              />
              {switchButtons('location')}
            </div>

            <div className='profile_params'>Birthday</div>
            <div className='profile_values'>

              <input style={{width:'200px'}} type='text' value={editValue.birthday} disabled={!toggleInputField('birthday')} onChange={(e) => setEditValue({...editValue, 'birthday': e.target.value})} />
               
              {switchButtons('birthday')}
            </div>
 
 
        </div>
        <div className='badges'>
          <div className='badges-header'>

              <div>Materyales.com</div>
              <div className='badges-bold-red'>PROFESSIONALS AND SKILLED WORKERS</div>
              <div>User Location: Manila</div>
          </div>

          <div className='badges-details'>

              <div className='badges-details-band'><div className="blue_title">MATERYALES IDENTIFICATION CARD</div></div> 
              <div>Last Name</div>
              <div>Dollesin </div>
              <div>First Name</div>
              <div>Jones</div>
              <div>Middle Name</div>
              <div>Regalado</div>
              <div>Contact</div>
              <div>jrdollesin@gmail.com</div>
              
              <div className='badges-details-band'><div className='red_title'>Architect</div></div>
              
          </div>

          <div className='badges-pic'>

              <div>&nbsp;</div>
              
          </div>

          <div className='badges-bottom'>
          &nbsp;
          </div>
 
             
 

        </div> 
        <div className='badges'>
          <div className='badges-header'>

              <div>Materyales.com</div>
              <div className='badges-bold-red'>PROFESSIONALS AND SKILLED WORKERS</div>
              <div>User Location: Manila</div>
          </div>

          <div className='badges-details'>

              <div className='badges-details-band'><div className="blue_title">MATERYALES IDENTIFICATION CARD</div></div> 
              <div>Last Name</div>
              <div>Dollesin </div>
              <div>First Name</div>
              <div>Jones</div>
              <div>Middle Name</div>
              <div>Regalado</div>
              <div>Contact</div>
              <div>jrdollesin@gmail.com</div>
              
              <div className='badges-details-band'><div className='red_title'>Architect</div></div>
              
          </div>

          <div className='badges-pic'>

              <div>&nbsp;</div>
              
          </div>

          <div className='badges-bottom'>
          &nbsp;
          </div>


        </div>  
    </>
  )
}

export default Profile