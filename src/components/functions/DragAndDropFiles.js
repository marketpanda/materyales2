import React, {useState, useRef, useCallback} from 'react'
import  { useDropzone } from 'react-dropzone'

const DragAndDropFiles = ({
  photos, setPhotos
}) => {
  
  // const onDropEvent = useCallback(acceptedFiles => {
    
  //   setFiles(acceptedFiles.map(theImage => 
  //       Object.assign(theImage, {
  //         preview: URL.createObjectURL(theImage)
  //       })
      
  //     ))
  //   }, []
  // )

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/*',
    onDrop: useCallback(acceptedFiles => { 
      setPhotos(acceptedFiles.map(theImage => 
          Object.assign(theImage, {
            preview: URL.createObjectURL(theImage)
          }) 
        ))
      }, [] 

    )  
    
  })

  const selected_images = photos.map((theImage) => (
    <div className='thumbnails'>
      <img key={theImage.name} src={theImage.preview} alt={theImage.name} className='thumbnail_single' />
    </div>
  ))
  
  
  return (
   <>
    <div className='dropzone'>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ? 'Drop the image here': 'Drag and drop image here'
        }

      </div>
       
      {selected_images}
    
      
    </div>
 
   </>
  )
} 
export default DragAndDropFiles