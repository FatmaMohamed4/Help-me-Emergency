import multer from 'multer';
import path from 'path'; // Import the path module
import {v2 as cloudinary} from 'cloudinary';
import photoModel from '../model/Photos Model/photoModel.js';
import photoEmergency from '../model/Photos Model/photo.Emergency.js';
import catchError from '../utilites/catchError.js';

cloudinary.config({ 
  cloud_name: 'djzbdq0km', 
  api_key: '348278345164438', 
  api_secret: 'c3z1MUSnR084R4Rv9abL40TQoAc' 
});



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
  static uploadPhoto = catchError(async (req, res, next) => {
    upload.single('photo')(req, res, async function (err) {
      if (err) {
        console.error(err);
        return next(new Error('Error uploading file'));
      }

      if (!req.file) {
        return next(new Error('No file uploaded',404));
      }

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Get the public URL of the uploaded image from Cloudinary
        const photoUrl = result.secure_url;

        // Store the photo URL and related data in your database (e.g., patientId)
        const { id: patientId } = req.params;
        await photoModel.create({ patientId, photo: photoUrl });

        // Respond with success message
        res.status(200).json({ message: 'Success', photoUrl });
      
    });
  });

  static getPhotos = catchError(async (req, res, next) => {
    const patientId = req.params.id;

    // Find photos associated with the specified patientId
    const photos = await photoModel.find({ patientId });

    if (!photos || photos.length === 0) {
      return next(new AppError('Photos not found', 404));
    }

    // Map through each photo and generate Cloudinary URLs
    const photosWithUrls = await Promise.all(
      photos.map(async (photo) => {
        // Generate Cloudinary URL for the photo
        const cloudinaryUrl = await cloudinary.url(photo.photo, { secure: true });

        // Create a new object with the Cloudinary URL and other photo properties
        return {
          _id: photo._id,
          patientId: photo.patientId,
          cloudinaryUrl: cloudinaryUrl
        };
      })
    );

    // Respond with photos including Cloudinary URLs
    res.status(200).json({ photos: photosWithUrls });
  });
      
    static  lastProfilePhoto= catchError(async(req, res ,next)=> {
      const patientId = req.params.id;
      const lastPhoto = await photoModel.findOne({ patientId }).sort({ createdAt: -1 }).populate('patientId' -patientId);
      res.json({ lastPhoto });
      if(!lastPhoto){
        return next(new AppError('last photo not found',404))
      }
    })
    
    static deleteLastPhoto = catchError(async (req, res, next) => {
      const patientId = req.params.id;
  
      // Find the last photo associated with the specified patientId
      const lastPhoto = await photoModel.findOne({ patientId }).sort({ createdAt: -1 });
  
      if (!lastPhoto) {
        return next(new AppError('Last photo not found', 404));
      }
  
      // Delete the photo from Cloudinary by its public ID
      await cloudinary.uploader.destroy(lastPhoto.photo);
  
      // Delete the photo record from the database
      await photoModel.findByIdAndDelete(lastPhoto._id);
  
      // Respond with success message
      res.status(200).json({ message: 'Last photo deleted successfully' });
    });
  
  
    static updateLastPhoto = catchError(async (req, res, next) => {
          upload.single('photo')(req, res, async function (err) {
            if (err) {
              console.error(err);
              return next(new AppError('Photo upload failed', 400));
            }
      
            const photoPath = req.file.filename;
            const patientId = req.params.id;
      
            // Find the last photo associated with the patientId
            const lastPhoto = await photoModel.findOne({ patientId }).sort({ createdAt: -1 });
      
            if (!lastPhoto) {
              return next(new AppError('Last photo not found', 404));
            }
      
            // Upload the new photo to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
      
            // Update the photo in Cloudinary (replace the old photo)
            lastPhoto.photo = result.public_id; // Update with the new public ID from Cloudinary
            await lastPhoto.save();
      
            // Respond with success message
            res.json({ message: 'Last photo updated successfully' });
          });
        })
      
      //////////////////////////////////////////////////////////////////////////////////////////////////////
 
      //Emergency
      static uploadEmergencyPhotos = catchError(async (req, res, next) => {
        upload.any()(req, res, async function (err) {
          if (err) {
            console.error(err);
            return next(new AppError('Photos upload failed', 400));
          }
    
          if (!req.files || req.files.length === 0) {
            return next(new AppError('No photos uploaded', 400));
          }
    
          // Iterate through each uploaded file and upload to Cloudinary
          const photoUrls = [];
          for (const file of req.files) {
            // Upload file to Cloudinary
            const result = await cloudinary.uploader.upload(file.path);
    
            // Get the public URL of the uploaded image from Cloudinary
            const photoUrl = result.secure_url;
    
            // Save the photo URL to your database (e.g., photoEmergency model)
            const emergencyId = req.params.id;
            await photoEmergency.create({ emergencyId, photo: photoUrl });
    
            // Store the Cloudinary URL for response
            photoUrls.push(photoUrl);
          }
    
          // Respond with success message and photo URLs
          res.status(200).json({ message: 'Success', photoUrls });
        });
      });
     
      static getPhotosEmergency = catchError(async (req, res, next) => {
        const emergencyId = req.params.id;
    
        // Find photos associated with the specified emergencyId
        const photos = await photoEmergency.find({ emergencyId });
    
        if (!photos || photos.length === 0) {
          return next(new AppError('Photos not found', 404));
        }
    
        // Map through each photo and generate Cloudinary URLs
        const photosWithUrls = await Promise.all(
          photos.map(async (photo) => {
            // Generate Cloudinary URL for the photo
            const cloudinaryUrl = await cloudinary.url(photo.photo, { secure: true });
    
            // Create a new object with the Cloudinary URL and other photo properties
            return {
              _id: photo._id,
              emergencyId: photo.emergencyId,
              cloudinaryUrl: cloudinaryUrl
            };
          })
        );
    
        // Respond with photos including Cloudinary URLs
        res.status(200).json({ photos: photosWithUrls });
      });
  
      static deleteEmergencyPhotos = catchError(async (req, res, next) => {
        const emergencyId = req.params.id;
    
        // Find all photos associated with the specified emergencyId
        const photos = await photoEmergency.find({ emergencyId });
    
        // Check if any photos are found
        if (!photos || photos.length === 0) {
          return next(new AppError('Photos not found', 404));
        }
    
        // Extract public IDs of photos to be deleted from Cloudinary
        const publicIds = photos.map(photo => photo.photo);
    
        // Delete photos from Cloudinary
        const deleteResult = await cloudinary.api.delete_resources(publicIds);
    
        // Check if all photos were successfully deleted from Cloudinary
        if (deleteResult.deleted === publicIds.length) {
          // Delete photos from database
          await photoEmergency.deleteMany({ emergencyId });
    
          // Respond with success message
          res.status(200).json({ message: 'Photos deleted successfully' });
        } else {
          return next(new AppError('Failed to delete all photos', 500));
        }
      });
}

export default photoController;
