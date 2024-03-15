
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path'; // Import the path module
import photoModel from '../model/photoModel.js';
import patientModel from '../model/patientModel.js';

// Set storage engine
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize Multer upload object
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith('image')) { // Fix the syntax issue here
    cb(null, true);
  } else {
    cb(null, false);
  }
}

class photoController {
   

    static async uploadPhoto(req, res) {
        upload.single('photo')(req, res, async function (err) {
          if (err) {
            console.error(err);
            return res.status(400).json({ error: "File upload failed" });
          }
          try {
           const photoPath = req.file.filename;
           const patientId = req.params.id;
            await photoModel.create({ patientId, photo: photoPath });
            res.json({ message: "Success" });
          } catch (error) {
            console.error(error);
            return res.status(400).json({ error: "File upload failed" });
          }
        });
      }

      //run correctly
    // static async getPhotos(req, res) {
    //     try {
    //       const patientId = req.params.id;
    //       // Find all photos associated with the patientId and populate the patient details
    //       const photos = await photoModel.find({ patientId }).populate('patientId' -patientId);
          
    //       res.json({ photos });
    //     } catch (error) {
    //       console.error(error);
    //       return res.status(500).json({ error: "Internal Server Error" });
    //     }
    //   }
      
    static async lastProfilePhoto(req, res) {
        try {
          const patientId = req.params.id;
          const lastPhoto = await photoModel.findOne({ patientId }).sort({ createdAt: -1 }).populate('patientId' -patientId);
          
          res.json({ lastPhoto });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }
    
      static async deleteLastPhoto(req, res) {
        try {
          const patientId = req.params.id;
          const lastPhoto = await photoModel.findOne({ patientId }).sort({ createdAt: -1 });
      
          if (!lastPhoto) {
            return res.status(404).json({ error: "No photo found for deletion" });
          }
      
          // Delete the last photo
          await photoModel.findByIdAndDelete(lastPhoto._id);
      
          res.json({ message: "Last photo deleted successfully" });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
      }
      
      static async updateLastPhoto(req, res) {
        upload.single('photo')(req, res, async function (err) {
          if (err) {
            console.error(err);
            return res.status(400).json({ error: "File upload failed" });
          }
          try {
            const photoPath = req.file.filename;
            const patientId = req.params.id;
      
            // Find the last photo associated with the patientId
            const lastPhoto = await photoModel.findOne({ patientId }).sort({ createdAt: -1 });
      
            if (!lastPhoto) {
              return res.status(404).json({ error: "No photo found for update" });
            }
      
            // Update the last photo with the new photo path
            lastPhoto.photo = photoPath;
            await lastPhoto.save();
            res.json({ message: "Last photo updated successfully" });
          } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
          }
        });
      }
      
}

export default photoController;
