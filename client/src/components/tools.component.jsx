//importing tools

import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import ImageTool from '@editorjs/image';
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code'
import API from '../service/api';

 
const uploadImageByURL = async (url) => {
    return {
      success: 1,
      file: {
        url: url,
      },
    };
  };


  const uploadImageByFile = async (file) => {
    try {
      // Upload image and get the URL back
      const imageUrl = await API.getUploadImage(file);
  
      if (!imageUrl) {
        return {
          success: 0,
          message: "Upload failed",
        };
      }
  
      return {
        success: 1,
        file: {
          url: imageUrl,
        },
      };
    } catch (error) {
      console.error("Upload by file failed:", error.message);
      return {
        success: 0,
        message: "Upload failed",
      };
    }
  };
   
  
  



  
    

export const tools = {
    embed: Embed,
    list:{
        class : List,
        inlineToolbar : true
    },
    image: {
        class: ImageTool, // use ImageTool, not Image
        config: {
          uploader: {
            uploadByUrl: uploadImageByURL, 
            uploadByFile: uploadImageByFile,
          }
        }
    },
    header : {
        class : Header,
        config:{
            placeholder : "Type Heading...",
            levels : [2,3],
            defaultLevel : 2
        }
    },
    quote :{
        class : Quote,
        inlineToolbar : true 
    },
    marker : Marker,
    inlinecode : InlineCode,
}

